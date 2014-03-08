define('account/app', [
	'marionette',
	'account/LoginView','account/AccountView', 'account/AccountModel'], 
function (Marionette,
	LoginView, AccountView, AccountModel) {

	var app = new Marionette.Application();

	var ready = $.Deferred();

	app.addInitializer(function () {
		app.accountModel = new AccountModel();
		
		app.listenTo(app.accountModel, "login", function () {
			ready.resolve();
		});
	});
	app.addInitializer(function () {
		app.loginView = new LoginView({
			model: app.accountModel
		});
		app.accountView = new AccountView({
			el: '#account-view',
			model: app.accountModel
		});
	});

	app.addInitializer(function () {
		app.loginView.render();
	});

	app.addInitializer(function () {
		app.started = true;
	});

	// This way I can just do app.ready(function () {})
	app.ready = function (cb) {
		app.start();
		ready.done(cb);
	};
	
	// This is a wrapper for functions, so you can do addInitializer(app.r(function () {}))
	// This way i can call app.start (or view.render, or what have you), and nothing ACTUALLY happens until
	// the person is logged in.
	// Also, 
	var r = function ( fn ) {
		return function () {
			app.ready( fn );
		};
	};
	app.r = r; 


	return app;
});