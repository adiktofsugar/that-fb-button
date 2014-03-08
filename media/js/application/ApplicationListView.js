define('index/ApplicationListView',
['marionette',
'index/ApplicationItemView', 'index/ApplicationEmptyView'],
function (Marionette,
	ApplicationItemView, ApplicationEmptyView) {
	return Marionette.CollectionView.extend({
		itemView: ApplicationItemView,
		emptyView: ApplicationEmptyView
	});
});