var dbm = require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
	db.addColumn('configs', 'config', {
		type: 'text'
	
	}, callback);
};

exports.down = function(db, callback) {
	db.removeColumn('configs', 'config', callback);
};
