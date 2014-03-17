define('config/ConfigModel',
['backbone',
'application/data'],
function (Backbone,
	appData) {

	var M = Backbone.Model.extend({
		initialize: function () {
			var apps = appData.applicationCollection;

			this.on("change", this.updateApplication, this);
			this.listenTo(apps, "sync change", this.updateApplication, this);
			this.updateApplication();

			if (this.has("facebook_app_id") && !apps.initialFetch) {
				apps.fetch();
				apps.initialFetch = true;
			}
		},
		updateApplication: function () {
			var fbAppId = this.get("facebook_app_id");
			if (fbAppId) {
				var app = appData.applicationCollection.get(fbAppId);

				var initialSet = !this.application;
				this.application = app;

				if (initialSet) {
					this.trigger("application:set");
				}
			}
		}
	});
	return M;

});
