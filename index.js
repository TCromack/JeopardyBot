const discord = require("discord.js");
const commands = require('./command.js');

const client = new discord.Client();

// Load commands
commands.loadCommands('commands');

const config = require("./config.json");
var prefix = config.prefix;

client.on("message", message => {
	if (!message.content.startsWith(prefix) || message.author.bot) {
		return;
	}
	
	var args = message.content.slice(prefix.length).split(/ +/);
	var commandName = args.shift().toLowerCase();
	
	try {
		var command = commands.commands[commandName];
		if (command) {
			command(message, args);
		} else {
			console.log(`No command with name '${commandName}'`);
		}
	} catch (error) {
		console.error(error);
	}
});


client.login(config.token);