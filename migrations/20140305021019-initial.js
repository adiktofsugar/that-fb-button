var dbm = require('db-migrate');
var async = require('async');
var type = dbm.dataType;

exports.up = function(db, callback) {

	async.series([
		db.createTable.bind(db, 'user', {
			id: {
				type: 'int',
				primaryKey: true,
				autoIncrement: true
			},
			facebook_id: {
				type: 'string'
			}
		}),
		db.createTable.bind(db, 'config', {
			id: {
				type: 'int',
				primaryKey: true,
				autoIncrement: true
			},
			user_id: {
				type: 'int'
			}
		})
	], callback);
};

exports.down = function(db, callback) {

	async.series([
		db.dropTable.bind(db, 'user'),
		db.dropTable.bind(db, 'config')
	], callback);
};
