var Button;
(function () {


	
	Button = {};

	_.extend(Button, View);
	_.extend(Button, Events);


	_.extend(Button, {
		initialize: function () {
			this.htmlLoaded = new Deferred();
			this.loadHtml();
		},
		
		loadHtml: function () {
			// This would load the html from wherever
			// and directly place it in this.el
			// so they should be able to have anything in there.
			// scripts included, though i'm not totally sure if that's true

			var self = this;
			var urlName = encodeURIComponent(this.name);
			ajax.get('http://' + SERVER_HOST + '/api/consumer/button?name=' + urlName, function (html) {
				self.htmlLoaded.resolve(html);
			});
		},

		render: function(){

			this.htmlLoaded.done(function ( html ) {

				this.el.innerHTML = html;
				this.delegateEvents();

				this.triggerMethod("render");

			}, this);
			return this;
		}
	});


})();