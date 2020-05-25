const https = require('https');

var jservice = 'https://jservice.io/api/';

var makeRequest = function(endpoint, options, callback) {
	var call = new Promise((resolve, reject) => {
		https.get(jservice + endpoint, (response) => {
			var data = [];
			
			response.on('data', chunk => {
				data.push(chunk);
			});
			
			response.on('end', () => {
				var body = Buffer.concat(data);
				
				resolve(body.toString());
			});
			
			response.on('error', (error) => {
				reject(error)
			});
		})
	});
	
	call.then(callback);
}


var randomQuestion = function(callback) {
	return makeRequest('random', {}, callback);
}


module.exports = {
	random: randomQuestion
};