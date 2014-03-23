
define('application/ApplicationCollection',
['underscore', 'backbone',
'application/ApplicationModel',
'facebook-sync'],
function (_, Backbone, ApplicationModel,
	fbSync) {

	return Backbone.Collection.extend({
		url: '/me/applications/developer',
		model: ApplicationModel,

		parse: function (data) {
			return data.data;
		},

		sync: fbSync
	});

});