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
	
	commands.dispatch(message);
});


client.login(config.token);