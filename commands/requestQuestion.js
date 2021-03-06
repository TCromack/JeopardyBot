const command = require('../command.js');
const jp = require('../util/jeopardy.js');
const ask = require('../quiz/askQuestion.js');
const answer = require('../quiz/answer.js');
const db = require('../util/db.js');

var response = function(message, response, question) {
	if (answer(question.answer, response)) {
		message.channel.send(`Correct, ${message.author}.  You earned ${question.value} points.`);
		db.addPoints(message.author.id, message.guild.id, question.value);
		return true;
	} else {
		message.channel.send(`Incorrect, ${message.author}.  You lose ${question.value} points.`);
		db.addPoints(message.author.id, message.guild.id, -question.value);
		return false;
	}
}

var timeout = function(channel, question) {
	channel.send(`The correct answer is ${question.answer}.`);
}

var requestQuestion = command(
{
	name: "rq"
},

function(message, args) {
	//Collect user answer and validate Answer
	console.log(ask);
	jp.random(function cb(question) {
		if(!ask(message.channel, question, response, timeout)){
			jp.random(cb);
		}
		
	});
});

// all commands go in array
module.exports = [ requestQuestion ];