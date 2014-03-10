define('svg/app',
['jquery', 'marionette'],
function ($, Marionette) {


	var app = new Marionette.Application();

	app.addInitializer(function () {


		var $svgObject = $('#graphic');
		var $description = $('#graphic-description');

		$svgObject.on("load", function () {


			var svg = $svgObject[0].contentDocument;
			svg.getElementById("svg_1").onmouseover = function (event) {
				event.target.setAttribute("fill", "purple");
			};
			svg.getElementById("svg_1").onmouseout = function (event) {
				event.target.setAttribute("fill", "yellow");
			};


		});

	});

	return app;

});