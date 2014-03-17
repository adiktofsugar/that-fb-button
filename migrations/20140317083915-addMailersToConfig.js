var dbm = require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
	db.addColumn('config', 'mailers', {
		type: "string"
	}, callback);
};

exports.down = function(db, callback) {
	db.removeColumn('config', 'mailers', callback);
};
