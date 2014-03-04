module.exports = function (grunt) {
	require('load-grunt-config')(grunt);

	grunt.registerTask('build-nginx', ['clean:nginx', 'ejs:nginx']);

	grunt.registerTask('build-pages', 'copy:pages');
	grunt.registerTask('build-css', 'sass:all');
	grunt.registerTask('build-js', ['concat:vendor']);
	grunt.registerTask('default', ['clean:media', 'build-pages', 'build-css', 'build-js']);

	grunt.registerTask('dev', ['default', 'watch']);
};