var Button;
(function () {


	
	Button = {};

	_.extend(Button, View);
	_.extend(Button, Events);


	_.extend(Button, {
		events: {
			"click": "buttonClicked"
		},

		initialize: function (options) {
			this.configLoaded = new Deferred();
			this.configReady = this.configLoaded.done;
			this.loadConfig();
		},
		
		loadConfig: function () {
			// This would load the html from wherever
			// and directly place it in this.el
			// so they should be able to have anything in there.
			// scripts included, though i'm not totally sure if that's true

			var self = this;
			var url = 'http://' + SERVER_HOST + '/api/consumer/button';
			ajax.send({
				url: url,
				data: {
					consumer_id: CONSUMER_ID,
					name: this.name
				},
				method: 'get',
				success: function (configJson) {
					var config;
					try {
						config = JSON.parse(configJson);
					} catch (e) {
						throw new Error("Button " + self.name + "could not parse config data");
					}
					self.config = config;
					self.configLoaded.resolve();
				},
				error: function (x, statusText, statusCode) {
					console.log("Error fetching " + url +", status " + statusText);
				}
			});
		},

		render: function(){	
			var self = this;
			this.configReady(function () {
				var config = self.config;
				Facebook.setApp(config.facebook_app_id);
				

				self.el.innerHTML = '<style>' + config.css + '</style>' + config.html;
				if (config.js) {
					setTimeout(function () {
						eval(config.js);
					}, 0);
				}
				self.delegateEvents();
				self.triggerMethod("render");
			});
			return this;
		},

		// When a button is clicked, it needs to do quite a few things
		// in a certain order.
		buttonClicked: function (event) {
			var self = this;

			event.preventDefault();

			// first, login
			self.fbLogin(function (err) {
				if (err) {
					self.trigger("error", err);
					self.trigger("error:login", err);
				} else {

					// then, post to their wall
					self.fbPost(function (err) {
						if (err) {
							self.trigger("error", err);
							self.trigger("error:post", err);
						} else {
							alert("successful post");
						}
					});

					// Also, this is where I would take their email
					// for my email list or what have you
					var config = self.config;
					var mailers = (config.mailers || "").split(",");
					var sendToMailchimp = _.contains(mailers, "mailchimp");

					Facebook.getProfile(function (profile) {
						if (sendToMailchimp) {
							MailChimp.registerUser(profile);
						}
					});
				}
			});
		},

		fbLogin: function (cb) {
			var self = this;
			cb = cb || function () {};

			var authResponse = Facebook.getAuthResponse();
			var permissions = Facebook.getPermissions();

			var finish = function(err, authResponse) {
				if (!err) {
					self.triggerMethod("fb:login", authResponse);
				}
				cb(err, authResponse);
			};

			if (authResponse && Facebook.hasPermissions(permissions)) {
				finish(null, authResponse);
			
			} else {
				FB.login(function (response) {
					if (response.status == "connected") {
						finish(null, response.authResponse);
					} else {
						if (response.error) {
							finish(Facebook.wrapError(response.error));
						} else {
							finish(new Error("Not Connected"));
						}
					}
				}, {scope: permissions.join(",")});
			}
		},

		fbPost: function (cb) {
			var self = this;
			cb = cb || function () {};


			this.configReady(function () {
				var config = self.config;
				var fbPostMessage = config.facebook_post_message;

				if (fbPostMessage) {
					FB.api('/me/feed', 'post', {
						message: fbPostMessage
					}, function (response) {
						if (response.error) {
							cb(Facebook.wrapError(response.error), response);
						} else {
							self.triggerMethod("fb:post", response);
							cb(null, response);
						}
					});
				} else {
					cb(null);
				}
			});
		}
	});


})();