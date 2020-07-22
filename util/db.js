var sql = require('sqlite3');
var config = require('config.json');
var db = new sql.Database(config.dbFilePath);

const points = {
	tableName: 'individual_scores',
	playerId: 'id',
	guildId: 'guildid',
	points: 'points'
};

db.run(`CREATE TABLE IF NOT EXISTS ${points.tableName} (${points.playerId} TEXT PRIMARY KEY, ${points.guildId} TEXT NOT NULL, ${points.points} INTEGER DEFAULT 0)`);

var statements = {
	addPoints: db.Prepare(`INSERT OR IGNORE INTO ${points.tableName} (${points.playerId}, ${points.guildId}, ${points.points}) VALUES ($id, $guild, 0);\
UPDATE ${points.tableName} SET ${points.points} = ${points.points} + $points WHERE ${points.playerId} = $id AND ${points.guildId} = $guild`),
	
	getPoints: db.Prepare(""), //TODO: fill in statement
	
	getLeaderboard: db.Prepare(`SELECT ${points.playerId}, ${points.points} FROM ${points.tableName} WHERE ${points.guildId} = ? ORDER BY ${points.points} DESC`)
};

var addPointsToPlayer = function(playerId, guildId, points) {
	statements.addPoints.run({ $id: playerId, $guild: guildId, $points: points});
};

var getPointsForPlayer = function(playerId, guildId, callback) {
	//TODO: run statement and sent point total to callback
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