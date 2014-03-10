var dbm = require('db-migrate');
var async = require('async');
var type = dbm.dataType;

exports.up = function(db, callback) {

	async.series([
		db.createTable.bind(db, 'sites', {
			id: {
				type: 'int',
				primaryKey: true,
				autoIncrement: true
			},
			user_id: {
				type: 'int'
			},
			host: {
				type: 'string'
			}
		})
	], callback);
};

exports.down = function(db, callback) {

	async.series([
		db.dropTable.bind(db, 'sites')
	], callback);
};
