const command = require('../command.js');
const db = require('../util/db.js');

var getPointsCommand = command(
{
	name: "getpoints"
},
function(message, args) {
	db.getPoints(message.author.id, message.guild.id, (points) => {
        var minus = points < 0 ? "-" : "";
        for(var v in points){
            console.log(v,points[v]);
        }
        message.channel.send(`Hey ${message.author}, you currently have ${minus}$${Math.abs(points)}!`);
    });
});

// all commands go in array
module.exports = [ getPointsCommand ];