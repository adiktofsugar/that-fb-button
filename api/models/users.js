module.exports = function (db) {

	db.define('users', {
		facebook_id: {type: "text"}	
	});

};