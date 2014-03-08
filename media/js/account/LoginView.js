define('account/LoginView',
['jquery', 'marionette'],
function ($, Marionette) {

	return Marionette.ItemView.extend({
		template: 'account/popup',
		
		events: {
			"click .js-trigger-login": "fbLoginHandler"
		},

		modelEvents: {
			"logout": "render",
			"login": "render"
		},

		fbLoginHandler: function (event) {
			this.model.login();
		},


		onRender: function () {

			if (this.model.get("isLoggedIn")) {
				this.hide();
			} else {
				this.show();
			}
		},

		show: function () {
			this.$el.show();
			
			// first hide everything.
			var $modal = $('#hide-modal');
			if (!$modal.length) {
				$modal = $('<div id="hide-modal">')
				.appendTo(document.body).hide();
			}
			$modal.css({
				position: "fixed",
				height: "100%",
				width: "100%",
				top: 0,
				left: 0,
				background: "black"
			});
			$modal.show();

			this.modal = $modal;

			this.$el.appendTo(document.body);
			
			// position correctly
			var adjustHeight = $.proxy(function () {
				var height = this.$el.height();
				var width = this.$el.width();

				var $w = $(window);
				var wHeight = $w.height();
				var wWidth = $w.width();

				this.$el.css({
					top: wHeight / 2 - height / 2,
					left: wWidth / 2 - width / 2
				});

			}, this);

			$(window).on("resize.loginview", adjustHeight);
			adjustHeight();

		},

		// replacement for close that's not as final
		hide: function () {
			this.$el.hide();
			$(window).off(".loginview");
			this.modal.remove();
		}
	});

});