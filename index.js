const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const usersRepo = require('./repositories/users');

const app = express();

//globally applying bodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
	cookieSession({
		keys : [
			'dssvjnvlasjkdnsdkjnc'
		]
	})
);

app.get('/signup', (req, res) => {
	res.send(
		`
        <div>
        Your id is: ${req.session.userId} 
            <form method="POST">
                <input name="email" type="text" placeholder="email">
                <input name="password" type="text" placeholder="password">
                <input name="passwordConfirmation" type="text" placeholder="password-confirmation">
                <button>Sign Up</button>
            </form>
        </div>
        `
	);
});

app.post('/signup', async (req, res) => {
	const { email, password, passwordConfirmation } = req.body;

	const existingUser = await usersRepo.getOneBy({ email });

	if (existingUser) {
		return res.send('Email in use');
	}

	if (password !== passwordConfirmation) {
		return res.send('Passwords must match');
	}

	const user = await usersRepo.create({ email, password });

	//Added by cookie-session
	req.session.userId = user.id;

	res.send('Account Created!');
});

app.get('/signout', (req, res) => {
	req.session = null;
	res.send('You are now signed out!');
});

app.get('/signin', (req, res) => {
	res.send(`
    <div>
        <form method="POST">
            <input name="email" type="text" placeholder="email">
            <input name="password" type="text" placeholder="password">
            <button>Sign In</button>
        </form>
    </div>
    `);
});

app.post('/signin', async (req, res) => {
	//Destuctured elements match "name" within input elements
	const { email, password } = req.body;

	const user = await usersRepo.getOneBy({ email });

	if (!user) {
		return res.send('Email not found');
	}

	const validPassword = await usersRepo.comparePasswords(
		user.password,
		password
	);

	if (!validPassword) {
		return res.send('Password is incorrect');
	}

	req.session.userId = user.id;

	res.send('You are signed in!');
});

app.listen(3000, () => {
	console.log('listening');
});
