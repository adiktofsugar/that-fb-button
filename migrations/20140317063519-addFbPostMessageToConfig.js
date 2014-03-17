var dbm = require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
	db.addColumn('config', 'facebook_post_message', {
		type: "string"
	}, callback);
};

exports.down = function(db, callback) {
	db.removeColumn('config', 'facebook_post_message', callback);
};
