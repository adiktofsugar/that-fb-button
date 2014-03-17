// Figure out what the real site is and add it to the request object
var wrapUser = function (realFunc) {
	return function (req, res, next) {
		// Shuld have a consumer_id in the params
		var consumerId = req.params.consumer_id;
		console.log("Searching for consumer with id, " + consumerId);
		req.db.models.user.find({
			facebook_id: consumerId
		}, function (err, users) {
			if (err) throw err;
			if (!users.length) {
				throw new Error("User not found with id " + consumerId);
			}
			req.user = users[0];
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
	show: wrapCors(wrapUser(function (req, res) {
		var name = req.params.name; // passed via query args

		if (!name) {
			throw "Name not defined";
		}

		req.db.models.config.find({
			user_id: req.user.id,
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
	}))
};