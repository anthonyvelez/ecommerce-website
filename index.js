const express = require('express');
const bodyParser = require('body-parser');

const app = express();

//globally applying bodyParser
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	res.send(
		`
        <div>
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

app.post('/', (req, res) => {
	console.log(req.body);
	res.send('Account Created!');
});

app.listen(3000, () => {
	console.log('listening');
});