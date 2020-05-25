const discord = require("discord.js");

const client = new discord.Client();

const config = require("./config.json");

client.on("message", message => {
	console.log(message.author + ':');
	console.log(message.content);
	
});


client.login(config.token);