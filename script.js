var request = require('request');
var mysql = require('mysql');

function sendNotification(tokens, message) {
	request({
		url: 'https://fcm.googleapis.com/fcm/send',
		method: 'POST',
		headers: {
			'Authorization': 'key=AIzaSyDOzzJt9w6w3yWb5geyv6L8Atn3RwtkT1g',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			'registration_ids': tokens,
			'data': message
		}),
	}, function(error, response, body) {
		if (error) {
			console.log(error);
		}else{
			console.log(response.statusCode, body);
		}
	});
}

var connection = mysql.createConnection({
  	host     : 'localhost',
  	user     : 'root',
  	password : 't9645t',
  	database : 'FCM'
});

connection.connect();

var tokens = [];
var message = '';

connection.query('SELECT token FROM users', function (err, rows, fields) {
	if (err) throw err;

	if (rows.length > 0) {
		for (var i=0; i< rows.length; i++) {
			tokens[i] = rows[i].token
		}
	}

	message = {
		'message': 'TEST TEST'
	}

	console.log(message);
	console.log(tokens);

	sendNotification(tokens, message);
});

connection.end();
