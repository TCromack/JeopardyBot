var sql = require('sqlite3');
var config = require('../config.json');
var db = new sql.Database(config.dbFilePath);

const points = {
	tableName: 'individual_scores',
	playerId: 'id',
	guildId: 'guildid',
	points: 'points'
};

const statements = {};
	
db.run(`CREATE TABLE IF NOT EXISTS ${points.tableName} (${points.playerId} TEXT NOT NULL, ${points.guildId} TEXT NOT NULL, ${points.points} INTEGER DEFAULT 0,\
	CONSTRAINT player_guild_key PRIMARY KEY(${points.playerId},${points.guildId}))`, (err) =>{
	if(err){
		console.log(`DB Error ${err} creating table failed!`);
		return;
	}
	statements.createUser = db.prepare(`INSERT OR IGNORE INTO ${points.tableName} (${points.playerId}, ${points.guildId}, ${points.points}) VALUES ($id, $guild, 0)`);
	statements.addPoints = db.prepare(`UPDATE ${points.tableName} SET ${points.points} = ${points.points} + $points WHERE ${points.playerId} = $id AND ${points.guildId} = $guild`);
	statements.getPoints = db.prepare(`SELECT ${points.points} FROM ${points.tableName} WHERE ${points.playerId} = ? AND ${points.guildId} = ?`);
	statements.getLeaderboard = db.prepare(`SELECT ${points.playerId}, ${points.points} FROM ${points.tableName} WHERE ${points.guildId} = ? ORDER BY ${points.points} DESC`);
});

var addPointsToPlayer = function(playerId, guildId, points) {
	var binding = { $id: playerId, $guild: guildId, $points: points};
	statements.createUser.run({ $id: playerId, $guild: guildId},(err) =>{
		if(err){
			console.log(`DB Error ${err} creating entry for user '${playerId}' and guild '${guildId}'`);
			return;
		}
		statements.addPoints.run(binding);
	});
	
};

var getPointsForPlayer = function(playerId, guildId, callback) {
	statements.getPoints.get([playerId, guildId], (err, row) => {
		if (!err) {
			callback(row ? row.points : 0);
		} else {
			console.log(`DB Error ${err} accessing points for player '${playerId}' and guild '${guildId}'`);
		}
	});
};

var getLeaderboardForGuild = function(guildId, callback) {
	statements.getLeaderboard.all(guildId, (err, rows) => {
		if (!err) {
			callback(rows);
		} else {
			console.log(`DB Error ${err} accessing leaderboard for guild '${guildId}'`);
		}
	});
};

module.exports = {
	addPoints: addPointsToPlayer,
	getPoints: getPointsForPlayer,
	getLeaderboard: getLeaderboardForGuild,
};