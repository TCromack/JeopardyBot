const fs = require('fs');

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
				commandTable[c.commandName] = c;
			}
		} else {
			commandTable[command.commandName] = command;
		}
	}
	
	makeCommand.commands = commandTable;
}

module.exports = makeCommand;