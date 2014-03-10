module.exports = function (grunt) {


	return {
		nginx: {
			options: {
				base_dir: process.cwd() + '/'
			},
			src: 'nginx/nginx.conf.ejs',
			dest: 'nginx/nginx.conf'
		},
		consumer: {
			options: {
				SERVER_HOST: 'dev.buttontriggers.guru'
			},
			expand: true,
			src: 'consumer/*.ejs',
			dest: 'target/',
			ext: '.js'
		}
	};

};