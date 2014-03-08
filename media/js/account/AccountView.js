define('account/AccountView',
['marionette'],
function (Marionette) {


	return Marionette.ItemView.extend({
		template: 'account/logout',
		events: {
			'click .js-trigger-logout': 'fbLogoutHandler'
		},
		modelEvents: {
			"logout": "render",
			"login": "render",
			"change:profile": "render"
		},

		fbLogoutHandler: function () {
			this.model.logout();
		}
	});

});