define('account/AccountModel',
['jquery', 'backbone'],
function ($, Backbone) {
	return Backbone.Model.extend({


		defaults: {
			"loginStatus": "loading",
			"isLoggedIn": false
		},

		initialize: function () {
			var self = this;
			window.fbReady.done(function () {
				FB.Event.subscribe('auth.statusChange', function (response) {
					self.handleLoginResponse(response);
				});
			});

			this.on("login", function () {
				this.set("isLoggedIn", true);

				var authResponse = this.get("authResponse");
				if (authResponse && authResponse.userID) {
					var fbId = authResponse.userID;
					$.cookie("fb_id", fbId, {path: '/'});
				}

			});
			this.on("logout", function () {
				this.set("isLoggedIn", false);

				$.removeCookie("fb_id");
			});

			this.checkLoggedIn();
		},

		checkLoggedIn: function (cb) {
			var self = this;

			window.fbReady.done(function () {
				FB.getLoginStatus(function (response) {
					self.handleLoginResponse(response);
				});
			});
		},

		handleLoginResponse: function (response) {
			var yes = (response.status == "connected");
			this.set("loginStatus", response.status);
			this.set("authResponse", response.authResponse);

			if (yes) {
				this.trigger("login", response);

				var self = this;
				FB.api('/me', function (response) {
					self.set("profile", response);
				});
			} else {
				this.trigger("logout", response);
			}
		},

		login: function () {
			var self = this;

			// have to believe that fb is ready
			FB.login(null, {scope: 'manage_pages'});
		},

		logout: function () {
			var self = this;
			FB.logout();
		},

		sync: function (method, model, options) {
			throw "There's no reason to be syncing this model";
		}
	});
});