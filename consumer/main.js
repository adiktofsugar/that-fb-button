(function() {

	var OK_ATTRIBUTE = "data-fb-button";
	var BAD_ATTRIBUTE = "data-fb-button-used";

	function processElement(element) {
		var val = attributes.attr(element, OK_ATTRIBUTE);
		attributes.attr(element, OK_ATTRIBUTE, null);
		attributes.attr(element, BAD_ATTRIBUTE, val);
	}

	function findElements (cb) {

		setInterval(function () {
			var elements = [];
			try {
				// hardcoded for now
				elements = Sizzle( '['+OK_ATTRIBUTE+']' );
			} catch (e) {
				// Assume it's cause the page hasn't loaded
			}
			
			_.each(elements, function (element) {
				processElement(element);
				cb(elements);
			});
		}, 250);

	}


	function addButtons() {
		findElements(function (element) {
			var name = attributes.attr(element, BAD_ATTRIBUTE);
			Button.create(element, name)
			.render();
		});
	}



	//addFb();
	addButtons();


})();