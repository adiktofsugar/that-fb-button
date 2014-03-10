define('index/app',
['marionette','account/app',
'button/data','button/ButtonListView'],
function (Marionette, account,
	buttonData, ButtonListView) {

	var app = new Marionette.Application();

	app.addRegions({
		main: "#main-content"
	});

	// models
	app.addInitializer(account.r(function () {

		buttonData.buttonCollection.fetch();

	}));

	// views
	app.addInitializer(account.r(function () {

		app.buttonListView = new ButtonListView({
			collection: buttonData.buttonCollection
		});

	}));

	app.addInitializer(account.r(function () {

		app.main.show(app.buttonListView);

	}));

	return app;

});