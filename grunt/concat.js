module.exports = function (grunt) {
	return {
		main: {
			src: [
				'media/js/vendor/require.js',
				'media/js/vendor/json2.js',

				'media/js/vendor/jquery-2.1.0.min.js',
				'media/js/vendor/jquery.cookie.js',
				
				'media/js/vendor/modernizr.js',

				'media/js/vendor/underscore-min.js',
				'media/js/vendor/backbone-min.js',

				'media/js/vendor/Backbone.ModelBinder.js',

				'media/js/vendor/backbone.babysitter.js',
				'media/js/vendor/backbone.wreqr.js',
				'media/js/vendor/backbone.marionette.js',

				'media/js/vendor/nunjucks-slim.js',

				'media/js/vendor/foundation.js',

				'media/js/main.js'],
			dest: 'target/media/js/main.js'
		},
		pages: {
			expand: true,
			src: 'media/js/!(vendor)/**/*.js',
			dest: 'target/media/js/',
			rename: grunt.helpers.renameByModule('<%= moduleName %>.js', 'media/js/')
		},

		templates: {
			src: 'target/templates/*.js',
			dest: 'target/media/js/templates.js'
		}
	};
};