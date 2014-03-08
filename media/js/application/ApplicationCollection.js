define('index/ApplicationCollection',
['underscore', 'backbone',
'index/ApplicationModel'],
function (_, Backbone, ApplicationModel) {

	return Backbone.Collection.extend({
		url: '/me/applications/developer',
		model: ApplicationModel,

		parse: function (data) {
			return data.data;
		},

		sync: function (method, model, options) {
			var self = this;
			
			var success = options.success || function () {};
			var error = options.error || function () {};

			this.trigger("request");

			try {
				FB.api(_.result(this, "url"), function (response) {
					success(response);
					self.trigger("sync");
				});
			} catch (e) {
				this.trigger("error");
				error(e);
			}
		}
	});

});