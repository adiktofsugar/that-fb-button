
var getButton = function (id, req) {};
var deleteButton = function (id, req) {};


var isAuthed = function (req, cb) {
	
	req.getUser(function (user) {
		if (!user) {
			var e = new Exception();
			e.message = "No user found in request.";
			throw e;
		}

				
		cb(user);
	});
};

var getConfig = function (req, user, cb) {
	var id = req.params.id;

	req.db.models.configs.find({
		id: id,
		user_id: user.id
	}, function (err, configs) {
		if (err) throw err;
		var config = configs[0];

		if (!config) {
			throw "No config with id " + id + " and user id " + user.id;
		}

		console.log("found config ", config);
		cb(config);
	});
};


module.exports = {
	index: function (req, res) {
		isAuthed(req, function (user) {
			req.db.models.configs.find({
				user_id: user.id
			}, function(err, results) {
				if (err) {
					throw err;
				}
				res.json(results);
				return;
			});
		});
	},

	create: function (req, res) {
		var body = req.body;

		isAuthed(req, function (user) {
			req.db.models.configs.create([
			{
				user_id: user.id,
				name: body.name
			}
			], function(err, results) {
				if (err) {
					throw err;
				}
				var result = results[0];
				res.json(result);
				return;
			});
		});
	},

	update: function (req, res) {
		var body = req.body;
		var attributes = {
			name: body.name
		};

		isAuthed(req, function (user) {
			getConfig(req, user, function (config) {
				console.log("has object", config);
				config.save( attributes , function (err, config) {
					if (err) throw err;
					res.json(config);
				});
			});
		});
	},
	show: function (req, res) {
		
		isAuthed(req, function (user) {
			getConfig(req, user, function (config) {
				res.json(config);
			});
		});
	},
	delete: function (req, res) {
		isAuthed(req, function (user) {
			getConfig(req, user, function (config) {
				config.remove(function (err) {
					if (err) throw err;
					res.json({});
				});
			});
		});
	},
};