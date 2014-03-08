define('index/ApplicationItemView',
['marionette'],
function (Marionette) {
	return Marionette.ItemView.extend({
		template: 'index/application-item'
	});
});