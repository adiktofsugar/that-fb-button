define('application/ApplicationItemView',
['marionette'],
function (Marionette) {
	return Marionette.ItemView.extend({
		template: 'application/application-item'
	});
});