define('config/ChangeAppView',
['marionette',
'application/data','application/ApplicationListView'],
function (Marionette,
	applicationData, ApplicationListView,
	siteData) {


	return Marionette.ItemView.extend({
		template: 'config/change-app',
		ui: {
			appList: '.js-application-list'
		},

		applicationListEvents: {
			"itemview:application:selected": "onApplicationSelect",
			"itemview:before:render": "onApplicationRender"
		},

		onRender: function () {
			applicationData.applicationCollection.fetch();
			
			this.applicationListView = new ApplicationListView({
				collection: applicationData.applicationCollection
			});
			// bind these events
			Marionette.bindEntityEvents(this, this.applicationListView, this.applicationListEvents);


			this.applicationListView.$el
				.appendTo( this.ui.appList.html('') );
			this.applicationListView.render();
		},
		onClose: function () {
			this.applicationListView.close();
		},

		onApplicationRender: function (applicationView) {
			if (applicationView.model.id == this.model.get("facebook_app_id")) {
				applicationView.model.set("selected", true);
			} else {
				applicationView.model.set("selected", false);
			}
		},
		onApplicationSelect: function (applicationView) {
			var self = this;
			var appModel = applicationView.model;

			this.model.save({
				facebook_app_id: appModel.id
			},{
				success: function () {
					self.trigger("application:changed");
				}
			});
		}
	});


});
