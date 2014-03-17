define('application/ApplicationListView',
['marionette',
'application/ApplicationItemView', 'application/ApplicationEmptyView'],
function (Marionette,
	ApplicationItemView, ApplicationEmptyView) {
	return Marionette.CompositeView.extend({
		template: 'application/application-list',

		itemView: ApplicationItemView,
		emptyView: ApplicationEmptyView
	});
});