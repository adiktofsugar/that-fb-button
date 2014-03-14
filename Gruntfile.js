module.exports = function (grunt) {

	var path = require('path');

	grunt.helpers = {};
	grunt.helpers.extractModule = function (srcPath, basePath) {
		var regex = new RegExp(basePath + '(.+?)/.+');
		var match = srcPath.match(regex);

		if (!match) {
			console.log("srcpath", srcPath, "didnt match", "regex", regex, "basePath", basePath);
			return false;
		}

		var moduleName = match[1];
		return moduleName;
	};
	grunt.helpers.renameByModule = function (templateString, basePath) {
		return function (dest, srcPath) {
			var moduleName = grunt.helpers.extractModule(srcPath, basePath);
			
			if (!moduleName) {
				return 'nothing';
			}
			return path.join(dest, grunt.template.process(templateString, {
				data: {
					moduleName: moduleName
				}
			}));
		};
	};

	// This will construct the function that defines
	grunt.registerTask('make-require-config', function () {
		var src = 'media/js/require-config.json';
		var dest = 'target/media/js/main.js'; // To add to or create


		var requireConfig = grunt.file.readJSON("media/js/require-config.json");
		var pages = grunt.file.expand('media/js/!(vendor)/**/*.js');

		console.log("pages", pages);
		pages.forEach(function (srcPath) {
			var moduleName = grunt.helpers.extractModule(srcPath, 'media/js/');
			var whereItIs = moduleName;
			var whatItsCalled = srcPath
				.replace('media/js', '')
				.replace(/\.js$/, '')
				.replace(/^\//, '');

			console.log("whatItsCalled", whatItsCalled, "whereItIs", whereItIs);

			requireConfig.paths[ whatItsCalled ] = whereItIs;
		});

		console.log("require config");
		console.log(requireConfig, null, 4);


		var currentContent = "";
		if (grunt.file.exists(dest)) {
			currentContent = grunt.file.read(dest, {
				encoding: 'utf-8'
			});
		}
		var requireConfigFunction = 'require.config(' + 
				JSON.stringify(requireConfig, null, 4) +
				');';
		currentContent = currentContent + requireConfigFunction;

		grunt.file.write(dest, currentContent);
		grunt.log.ok("Wrote " + dest);

	});


	require('load-grunt-config')(grunt);

};