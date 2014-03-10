var dbm = require('db-migrate');
var type = dbm.dataType;
var async = require("async");

exports.up = function(db, callback) {
	async.series([
		db.createTable.bind(db, 'configs_sites', {
			config_id: {
				type: 'int'
			},
			site_id: {
				type: 'int'
			}
		})
	], callback);
};

exports.down = function(db, callback) {
	async.series([
		db.dropTable.bind(db, 'configs_sites')
	], callback);
};
