define('index/app',
['marionette','account/app',
'config/data','config/ConfigListView'],
function (Marionette, account,
	configData, ConfigListView) {

	var app = new Marionette.Application();

	app.addRegions({
		main: "#main-content"
	});

	// models
	app.addInitializer(account.r(function () {

		configData.configCollection.fetch();

	}));

	// views
	app.addInitializer(account.r(function () {

		app.configListView = new ConfigListView({
			collection: configData.configCollection
		});

	}));

	app.addInitializer(account.r(function () {

		app.main.show(app.configListView);

	}));

	return app;

});