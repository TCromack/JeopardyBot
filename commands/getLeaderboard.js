const command = require('../command.js');
const db = require('../util/db.js');

var getLeaderboardCommand = command(
{
	name: "getleaderboard"
},
function(message, args) {
	db.getLeaderboard(message.guild.id, (rows) => {
        message.channel.send(`Here is the current Leaderboard!`);
        
        message.guild.members.fetch().then((guildmembers) => {
            for(row of rows) {
                console.log(row);
                var points = row.points;
                message.channel.send(`Hey ${guildmembers.get(row.id).user} ${row.points}`)    
            }
        }); 
    });
});

// all commands go in array
module.exports = [ getLeaderboardCommand ];