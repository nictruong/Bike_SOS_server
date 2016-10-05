var request = require('request');
var mysql = require('mysql');

function sendNotification(tokens, data) {
	request({
		url: 'https://fcm.googleapis.com/fcm/send',
		method: 'POST',
		headers: {
			'Authorization': 'key=AIzaSyDOzzJt9w6w3yWb5geyv6L8Atn3RwtkT1g',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			'registration_ids': tokens,
			'data': data
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
var data = '';

connection.query('SELECT token FROM users', function (err, rows, fields) {
	if (err) throw err;

	if (rows.length > 0) {
		for (var i=0; i< rows.length; i++) {
			tokens[i] = rows[i].token
		}
	}

	data = {
		'message': 'User123 needs help with a broken chain!',
		'gpsCoordLong': '123',
		'gpsCoordLat': '456'
	}

	console.log(data);
	console.log(tokens);

	sendNotification(tokens, data);
});

connection.end();
