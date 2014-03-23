define('facebook-sync', 
['underscore'],
function (_) {

	return function (method, model, options) {
		var self = this;
		
		var success = options.success || function () {};
		var error = options.error || function () {};

		this.trigger("request");

		try {
			FB.api(_.result(this, "url"), function (response) {
				if (response && response.error) {
					error(response.error);
					self.trigger("error", response.error);
				} else {
					success(response);
					self.trigger("sync");
				}
			});
		} catch (e) {
			error(e);
			this.trigger("error", e);
		}
	};
});