module.exports = function (grunt) {


	return {
		nginx: {
			options: {
				name: /(.*?)\.conf\.njs$/,
				data: {
					base_dir: process.cwd() + '/'
				}
			},
			src: 'nginx/nginx.conf.njs',
			dest: 'nginx/nginx.conf'
		},
		pages: {
			options: {
				precompile: true,
				baseDir: 'media/js',
				name: /(.*?)templates\/(.*?)\.html$/
			},
			expand: true,
			src: 'media/js/!(vendor)/templates/**/*.html',
			dest: 'target/templates/',
			rename: grunt.helpers.renameByModule('<%= moduleName %>.js', 'media/js/')
		}
	};

};