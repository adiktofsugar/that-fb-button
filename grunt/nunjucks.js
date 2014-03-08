module.exports = function (grunt) {

	var path = require('path');

	var nunjucks = require('nunjucks');
	var pagesLoader = new nunjucks.FileSystemLoader();
	var pagesEnv = new nunjucks.Environment(pagesLoader);

	return {
		pages: {
			options: {
				env: pagesEnv,
				name: function (srcPath) {
					console.log("Naming nunjucks template with path ", srcPath);
					var moduleName = grunt.helpers.extractModule(srcPath, 'media/js/');
					var realName = srcPath.substring( srcPath.indexOf(moduleName) );

					return realName
						.replace('templates/', '')
						.replace(/\.html$/, '')
						.replace(/^\//, '');
				}
			},
			expand: true,
			src: 'media/js/!(vendor)/templates/**/*.html',
			dest: 'target/templates/',
			rename: grunt.helpers.renameByModule('<%= moduleName %>.js', 'media/js/')
		}
	};

};