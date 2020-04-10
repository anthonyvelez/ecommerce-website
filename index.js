const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const AuthRouter = require('./routes/admin/auth');

const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
	cookieSession({
		keys : [
			'dssvjnvlasjkdnsdkjnc'
		]
	})
);
app.use(AuthRouter);

app.listen(3000, () => {
	console.log('listening');
});
