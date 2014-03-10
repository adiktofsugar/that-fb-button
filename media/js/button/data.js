define('button/data',
['button/ButtonCollection'],
function (ButtonCollection) {

	var buttonCollection = new ButtonCollection();

	return {
		buttonCollection: buttonCollection
	};

});