define('application/ApplicationListView',
['marionette',
'application/ApplicationItemView', 'application/ApplicationEmptyView'],
function (Marionette,
	ApplicationItemView, ApplicationEmptyView) {
	return Marionette.CollectionView.extend({
		itemView: ApplicationItemView,
		emptyView: ApplicationEmptyView
	});
});