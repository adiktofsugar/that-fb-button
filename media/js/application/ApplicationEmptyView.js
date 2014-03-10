define('application/ApplicationEmptyView',
['marionette'],
function (Marionette) {
	return Marionette.ItemView.extend({
		template: 'application/application-empty'
	});
});