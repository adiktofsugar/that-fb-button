var cookie = require("cookie");



// add "session" to the request
module.exports.session = function (req, res, next) {
	req.session = {};

	// add the cookie
	req.session.cookie = cookie.parse( req.headers.cookie || "" );

	next(req, res);
};

module.exports.user = function (req, res, next) {
	var cookie = req.session.cookie;
	if (cookie.fb_id) {
		req.userFbId = cookie.fb_id;
	} else {
		req.userFbId = undefined;
	}

	req.getUser = function ( cb ) {

		if (req.userFbId) {

			req.db.models.users.find({facebook_id: req.userFbId}, function (err, results) {
				if (err) throw err;

				var user = results[0];
				if (!user) {
					req.db.models.users.create({facebook_id: req.userFbId}, function (err, results) {
						if (err) throw err;

						user = results[0];
						cb(user);
					});
				} else {
					cb(user);
				}

			});
		} else {
			cb(false);
		}
	};


	next(req, res);
};

	// add logging of requests to the request
module.exports.logging = function (req, res, next) {
	console.log("Path: " + req.path());

	next(req, res);
};
