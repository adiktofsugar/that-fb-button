define('application/ApplicationItemView',
['marionette'],
function (Marionette) {
	return Marionette.ItemView.extend({
		tagName: 'span',
		template: 'application/application-item',

		triggers: {
			"click button": "application:selected"
		}
	});
});