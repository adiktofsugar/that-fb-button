(function() {

	var vent = new EventAggregator();


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
				cb(element);
			});
		}, 250);

	}


	function addButtons() {
		findElements(function (element) {
			var name = attributes.attr(element, BAD_ATTRIBUTE);
			var button = Button.create(element, name);
			
			// All the events go to button:<button event>
			// with button as the first argument
			vent.forwardEvents(button, "button");

			button.render();
		});
	}

	

	vent.forwardEvents(Facebook.vent, "fb");
	Facebook.add();

	addButtons();

	vent.on("button:error fb:error", function (entity, error) {
		console.error(error.message, error, entity);
	});

	window.buttonTriggers = {
		on: vent.on,
		off: vent.off,

		fbGetProfile: _.bind(Facebook.getProfile, Facebook)
	};


})();