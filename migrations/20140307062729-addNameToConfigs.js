var dbm = require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
	db.addColumn('configs', 'name', {
		type: 'string'
	
	}, callback);
};

exports.down = function(db, callback) {
	db.removeColumn('configs', 'name', callback);
};
