module.exports = function (db) {

	db.define('user', {
		facebook_id: {type: "text"}	
	});

};