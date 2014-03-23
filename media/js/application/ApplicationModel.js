define('application/ApplicationModel',
['backbone', 'facebook-sync'],
function (Backbone, fbSync) {

	var M = Backbone.Model.extend({
		url: function () {
			return '/apps/' + this.id;
		},
		toJSON: function () {
			var json = M.__super__.toJSON.apply(this, arguments);
			json.dashboardUrl = 'http://developers.facebook.com/apps/' + this.id;
			return json;
		},
		sync: fbSync
	});

	return M;

});