var path = require('path');

module.exports = function (grunt) {

	grunt.initConfig({
		ejs: {
			nginx: {
				options: {
					base_dir: path.join(process.cwd(), '../')
				},
				src: 'nginx.conf.ejs',
				dest: 'nginx.conf'
			}
		},
		nginx: {
			options: {
				config: 'nginx.conf',
				useSudo: true
			}
		}
	});

	grunt.registerTask('build-conf', ['ejs:nginx']);
	grunt.registerTask('restart-nginx', ['nginx:stop', 'nginx:start']);
	grunt.registerTask('default', ['build-conf', 'restart-nginx']);

	require('load-grunt-tasks')(grunt);
};