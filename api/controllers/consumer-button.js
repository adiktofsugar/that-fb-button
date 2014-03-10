// Figure out what the real site is and add it to the request object
var wrapSite = function (realFunc) {
	return function (req, res, next) {

		var host = req.header("Origin");

		req.db.models.sites.find({
			host: host
		}, function (err, results) {
			if (err) throw err;
			if (!results.length) {
				throw "Can't find site based on host " + host;
			}
			realFunc(req, res, next);
		});
	};
};


var wrapCors = function (realFunc) {
	return function (req, res, next) {
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "X-Requested-With");

		realFunc(req, res, next);
	};
};


module.exports = {
	show: wrapSite(wrapCors(function (req, res) {
		var site = req.site;
		var name = req.params.name; // passed via query args

		if (!name) {
			throw "Name not defined";
		}

		site.getUser(function (err, user){
			if (err) throw err;

			req.db.models.configs.find({
				user_id: user.id,
				name: name
			}, function (err, results) {
				if (err) {
					throw err;
				}
				if (!results.length) {
					throw "No results - looked for " + name;
				}
				res.json( results[0] );
			});
		});
	}))
};