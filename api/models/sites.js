module.exports = function (db) {

	db.define('sites', {
		host: {type: "text"},
		facebook_app_id: {type:"text"}
	});
};