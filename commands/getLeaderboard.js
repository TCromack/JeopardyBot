const command = require('../command.js');
const db = require('../util/db.js');
const { MessageEmbed } = require('discord.js');

var getLeaderboardCommand = command(
{
	name: "getleaderboard"
},
function(message, args) {
	db.getLeaderboard(message.guild.id, (rows) => {
        message.channel.send(`Here is the current Leaderboard!`);
        
        message.guild.members.fetch().then((guildmembers) => {
            
            let embed = new MessageEmbed();
            let str = "";
            embed.setTitle("Server Leaderboard");
            var i = 0;
            for(var i = 0; i < rows.length; i++) {
                let row = rows[i];
                console.log(row);
                var points = row.points;
                var minus = points < 0 ? "-" : "";
            
                //message.channel.send(new MessageEmbed().setTitle("Server Leaderboard").setDescription(`Hey ${guildmembers.get(row.id).user} ${row.points}`))   
                str += `${i + 1}. ${guildmembers.get(row.id).user} ${minus}$${Math.abs(row.points)} \n`;
            }
            
            embed.setDescription(str);
            message.channel.send(embed);
        }); 
        
    });
});

// all commands go in array
module.exports = [ getLeaderboardCommand ];