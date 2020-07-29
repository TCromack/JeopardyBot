const command = require('../command.js');
const jp = require('../util/jeopardy.js');

var startTournamentCommand = command(
{
	name: "starttournament"
},
function(message, args) {
	// do stuff
	jp.clues(1, (tourney) => {
		console.log(tourney);
	});
});

// all commands go in array
module.exports = [ startTournamentCommand ];