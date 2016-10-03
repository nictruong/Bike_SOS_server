var express = require('express');
var app = express();

var mysql = require('mysql');

var bodyParser = require('body-parser');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.post('/', function (req, res) {

	var token = req.body.Token;

	if (token) {
		var connection = mysql.createConnection({
		  	host     : 'localhost',
		  	user     : 'root',
		  	password : 't9645t',
		  	database : 'FCM'
		});

		connection.connect();

		connection.query('INSERT INTO users (Token) values (?) ON DUPLICATE KEY UPDATE Token = ?', [token, token], function (err, result) {
			if (err) res.status(400).end();

			console.log('Inserted token ' + token);
		});

		connection.end();
	}

	res.status(200).end();
});

app.listen(3000, function () {
  	console.log('Example app listening on port 3000!');
});