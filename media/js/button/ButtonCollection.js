define('button/ButtonCollection',
['backbone', 'button/data', 'button/ButtonModel'],
function (Backbone, buttonData, ButtonModel) {

	return Backbone.Collection.extend({
		url: '/api/buttons',
		model: ButtonModel
	});

});