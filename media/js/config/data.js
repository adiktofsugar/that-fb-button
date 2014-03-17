define('config/data',
['config/ConfigCollection'],
function (ConfigCollection) {

	var configCollection = new ConfigCollection();

	return {
		configCollection: configCollection
	};

});
