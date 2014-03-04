module.exports = function (grunt) {


	return {
		nginx: {
			options: {
				base_dir: process.cwd() + '/'
			},
			src: 'nginx/nginx.conf.ejs',
			dest: 'nginx/nginx.conf'
		}
	};

};