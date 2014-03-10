var dbm = require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
	db.addColumn('sites', 'facebook_app_id', {
		type: 'text'
	}, callback);
};

exports.down = function(db, callback) {
	db.removeColumn('sites', 'facebook_app_id', callback);
};
