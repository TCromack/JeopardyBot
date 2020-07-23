const fs = require('fs');

const config = require("./config.json");
var prefix = config.prefix;

var commandDefaults = {
	commandName: "invalidCommand",
	description: "",
	debugOnly: false
}

var makeCommand = function(options, func) {	
	if (options.hasOwnProperty("name")) {
		options.commandName = options.name;
	}
	
	for (const def in commandDefaults) {
		if (options.hasOwnProperty(def)) {
			func[def] = options[def];
		} else {
			func[def] = commandDefaults[def];
		}
	}
	
	return func;
};

makeCommand.loadCommands = function(dir) {
	
	var commandTable = {};
	
	var files = fs.readdirSync(`./${dir}`).filter(file => file.endsWith('.js'));
	for (var file of files) {
		var command = require(`./${dir}/${file}`);
		
		if (Array.isArray(command)) {
			for (var c of command) {
				commandTable[c.commandName.toLowerCase()] = c;
			}
		} else {
			commandTable[command.commandName.toLowerCase()] = command;
		}
	}
	
	makeCommand.commands = commandTable;
}

makeCommand.dispatch = function(message) {
	var args = message.content.slice(prefix.length).split(/ +/);
	var commandName = args.shift().toLowerCase();
	
	try {
		var command = makeCommand.commands[commandName];
		if (command) {
			command(message, args);
		} else {
			console.log(`No command with name '${commandName}'`);
		}
	} catch (error) {
		console.error(error);
	}
}

module.exports = makeCommand;