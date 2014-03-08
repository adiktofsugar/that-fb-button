define('index/ApplicationEmptyView',
['marionette'],
function (Marionette) {
	return Marionette.ItemView.extend({
		template: 'index/application-empty'
	});
});