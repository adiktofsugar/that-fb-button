var fs = require("fs");
var orm = require('orm');


module.exports = function (env) {

	var configDir = __dirname + "/../database.json";
	var databaseConfigStr = fs.readFileSync(configDir, {encoding: 'utf-8'});
	var databaseConfig = JSON.parse(databaseConfigStr);

	databaseConfig.debug = (env == "dev");

	console.log("Connecting to...", databaseConfig[env]);
	var db = orm.connect(databaseConfig[env], function (err) {
		if (err) {
			throw err;
		}
		console.log("Connected to database!");
	});

	return db;

};