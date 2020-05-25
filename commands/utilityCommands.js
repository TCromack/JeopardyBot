const command = require('../command.js');

var helpCommand = command(
{
	name: "help",
}, 
function(message, args) {
	var helpText = 'Available commands:';
	for (var c in command.commands) {
		helpText += '\n**' + c + '**: ' + command.commands[c].description;
	}
	message.channel.send(helpText);
});


var reloadCommand = command(
{
	name: "reload",
	debugOnly: true,
},
function(message, args) {
	message.channel.send('Reloading commands...');
	command.loadCommands('commands');
});

module.exports = [ helpCommand, reloadCommand ];