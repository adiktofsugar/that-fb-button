module.exports = function (db) {

	// These things can only use on application, so this makes sense
	var configs = db.define('config', {
		user_id: {type: "number"},
		facebook_app_id: {type: "number"},
		
		name: {type: "text"},
		facebook_post_message: {type: "text"},
		
		html: {type: "text"},
		css: {type: "text"},
		js: {type: "text"}
		
	});
};