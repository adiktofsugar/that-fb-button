var fs = require("fs");
var path = require("path");

module.exports = function (db) {

	var baseDir = "./models";

	fs.readdir(baseDir, function (err, filepaths) {

		if (err) {
			throw err;
		}

		filepaths.forEach(function (filepath) {

			filepath = "./" + path.join(baseDir, filepath);

			console.log("loading model file", filepath);

			require( filepath )(db);
		});

		// and now the assciations
		db.models.sites.hasOne('user', db.models.users);
		db.models.configs.hasOne('user', db.models.users);

		db.models.configs.hasMany('sites', db.models.sites);

	});

};