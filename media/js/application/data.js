define('application/data',
['application/ApplicationCollection'],
function (ApplicationCollection) {

	var applicationCollection = new ApplicationCollection();
	return {
		applicationCollection: applicationCollection
	};

});