define('config/ConfigCollection',
['backbone', 'config/data', 'config/ConfigModel'],
function (Backbone, buttonData, ConfigModel) {

	return Backbone.Collection.extend({
		url: '/api/configs',
		model: ConfigModel
	});

});
