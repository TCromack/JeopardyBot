const command = require('../command.js');
const jp = require('../jeopardy.js');

var startTournamentCommand = command(
{
	name: "starttournament"
},
function(message, args) {
	// do stuff
	jp.random((question) => {
		console.log(question);
	});
});

// all commands go in array
module.exports = [ startTournamentCommand ];