define('button/ChangeAppView',
['marionette',
'application/data','application/ApplicationListView'],
function (Marionette,
	applicationData, ApplicationListView) {


	return Marionette.ItemView.extend({
		template: 'button/change-app',
		ui: {
			appList: '.js-application-list'
		},

		onRender: function () {
			applicationData.applicationCollection.fetch();
			
			this.applicationListView = new ApplicationListView({
				collection: applicationData.applicationCollection
			});
			this.applicationListView.$el
				.appendTo( this.ui.appList.html('') );
			this.applicationListView.render();
		}
	});


});