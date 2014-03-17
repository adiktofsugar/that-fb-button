var dbm = require('db-migrate');
var async = require("async");
var type = dbm.dataType;

exports.up = function(db, callback) {
	async.series([
		db.renameColumn.bind(db,'config', 'config', 'html'),
		db.addColumn.bind(db,'config', 'js', {
			type: "text"
		})
	], callback);
};

exports.down = function(db, callback) {
	async.series([
		db.renameColumn.bind(db,'config', 'html', 'config'),
		db.dropColumn.bind(db,'config', 'js')
	], callback);
};
