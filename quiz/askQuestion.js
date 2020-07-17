const config = require("../config.json");
const commands = require("../command.js");

const ANSWERED_REASON = "correct";

var activeQuestions = {};

var validateAnswerFilter = function(message){
	return !message.author.bot;
};

var answerAttempted = function(question, callback) {
	return function(message) {
		var response = message.content;
		var collector = activeQuestions[message.channel.guild.id][message.channel.id];
		if (config.answerWithCommand) {
			if (response.startsWith(config.prefix)) {
				response = response.slice(config.prefix.length);
				var cmd = response.split(/ +/).shift();
				if (commands.commands[cmd]) {
					commands.dispatch(message);
				} else {
					if (callback(message, response, question)) {
						collector.stop(ANSWERED_REASON);
						activeQuestions[message.channel.guild.id][message.channel.id] = null;
					}
				}
			}
		} else {
			if (callback(message, response, question)) {
				collector.stop(ANSWERED_REASON);
				activeQuestions[message.channel.guild.id][message.channel.id] = null;
			}
		}
	};
};

var dispose = function() {}

var timeout = function(channel, question, callback) {
	return function(collected, reason) {
		if (reason !== ANSWERED_REASON) {
			var guildQuestions = activeQuestions[channel.guild.id];
			guildQuestions[channel.id] = null;
			callback(channel, question);
		}
	};
};

function ask(channel, question, onAnswer, onTimeout) {
	if(!question.question){
		return false;
	}
	console.log(question);
	channel.send(question.question);
	
	var guildQuestions = activeQuestions[channel.guild.id];
	if (!guildQuestions) {
		guildQuestions = activeQuestions[channel.guild.id] = {};
	}
	
	var channelQuestion = guildQuestions[channel.id];
	if (channelQuestion) {
		channelQuestion.stop();
	}
	
	var collector = channel.createMessageCollector(validateAnswerFilter, {time:config.questionDuration * 1000});
	collector.on("collect", answerAttempted(question, onAnswer));
	collector.on("dispose", dispose);
	collector.on("end", timeout(channel, question, onTimeout));
	guildQuestions[channel.id] = collector;

	return true;
}

module.exports = ask;