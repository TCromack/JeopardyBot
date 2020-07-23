const stringSimilarity = require('string-similarity')
//id test question 130395 to test HTML tags category id 17957
module.exports = function(correctAnswer, toTest) {
	// check if answer is correct (using string alike-ness)
	// return true if correct, false if not
	const answerAsQuestionRegex = /^\s*(what|who|where|where|when)\s*(is|are)\s*/i;
	correctAnswer = correctAnswer.replace(/[^\w\s]/g, '').toLowerCase();
	let answerText = toTest
	.replace(/[^\w\s]/i, '')
	.replace(/<[^>]*?>/)
	.replace(answerAsQuestionRegex, '')
	.toLowerCase();

	var result = stringSimilarity.compareTwoStrings(correctAnswer, answerText);
	//console.log("%s, %s, %d/n" , correctAnswer, answerText, result);
	return result > .85;
}