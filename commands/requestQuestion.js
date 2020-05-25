const command = require('../command.js');
const jp = require('../jeopardy.js');

var validateAnswerFilter = function(question){
	return function(message){
		message.question = question;
		return !message.author.bot;
	};
	
};

var correctAnswer = function(message){
	var points = message.question.value;
	message.reply(`You earned points`);
	
}

var wrongAnswer = function(message){
	var points = message.question.value;
	message.reply(`You lost points`);
	
}

var endQuestion = function(message){
	var answer = message.question.answer;
	message.channel.send(`The correct answer is answer`);
	
}

var requestQuestion = command(
{
	name: "rq"
},

function(message, args) {
	//Collect user answer and validate Answer
	jp.random((question) => {
		
		console.log(question);
		message.channel.send(question.question);
		var collector = message.channel.createMessageCollector(validateAnswerFilter(question), {time:5000});
		collector.on("collect", correctAnswer);
		collector.on("dispose", wrongAnswer);
		collector.on("end", endQuestion );
	});
});

// all commands go in array
module.exports = [ requestQuestion ];