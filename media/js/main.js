require(['marionette', 'nunjucks'], function (Marionette, nunjucks) {

	Marionette.TemplateCache.prototype.loadTemplate = function (templateId) {
		return templateId;
	};
	Marionette.TemplateCache.prototype.compileTemplate = function (rawTemplate) {
		return function (data) {
			return nunjucks.render(rawTemplate, data);
		};
	};

});

require(['jquery'], function ($) {
	window.fbReady = $.Deferred();

	window.fbAsyncInit = function() {
		FB.init({
			appId: "220485991481468",
			status: true
		});
		window.fbReady.resolve();
	};

	(function(d, s, id){
	 var js, fjs = d.getElementsByTagName(s)[0];
	 if (d.getElementById(id)) {return;}
	 js = d.createElement(s); js.id = id;
	 js.src = "//connect.facebook.net/en_US/all.js";
	 fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));

});