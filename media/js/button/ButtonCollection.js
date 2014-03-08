define('button/ButtonCollection',
['backbone', 'button/ButtonModel'],
function (Backbone, ButtonModel) {

	return Backbone.Collection.extend({
		url: '/api/buttons',
		model: ButtonModel
	});

});