module.exports = function (db) {

	var configs = db.define('configs', {
		user_id: {type: "number"},
		name: {type: "text"},
		config: {type: "text"}
	});
};