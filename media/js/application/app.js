define('index/app',
['marionette',
'index/ApplicationCollection','index/ApplicationListView'],
function (Marionette,
	ApplicationCollection, ApplicationListView) {


	var app = new Marionette.Application();

	app.addRegions({
		main: '#main-content'
	});

	app.addInitializer(function ( options ) {
		app.applicationCollection = new ApplicationCollection();
	});

	app.addInitializer(function () {
		app.applicationList = new ApplicationListView({
			collection: app.applicationCollection
		});
	});

	app.addInitializer(function () {
		app.main.show( app.applicationList );
		app.applicationCollection.fetch();
	});

	return app;

});