const command = require('../command.js');

var startTournamentCommand = command(
{
	name: "startTournament"
},
function(message, args) {
	// do stuff
});

// all commands go in array
module.exports = [ startTournamentCommand ];