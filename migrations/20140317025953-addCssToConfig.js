var dbm = require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
	db.addColumn('config', 'css', {
		type: "text"
	}, callback);
};

exports.down = function(db, callback) {
	db.removeColumn('config', 'css', callback);
};
