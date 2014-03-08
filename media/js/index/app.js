define('index/app',
['marionette','account/app',
'button/ButtonCollection','button/ButtonListView'],
function (Marionette, account,
	ButtonCollection, ButtonListView) {

	var app = new Marionette.Application();

	app.addRegions({
		main: "#main-content"
	});

	// models
	app.addInitializer(account.r(function () {

		app.buttonCollection = new ButtonCollection();
		app.buttonCollection.fetch();

	}));

	// views
	app.addInitializer(account.r(function () {

		app.buttonListView = new ButtonListView({
			collection: app.buttonCollection
		});

	}));

	app.addInitializer(account.r(function () {

		app.main.show(app.buttonListView);

	}));

	return app;

});