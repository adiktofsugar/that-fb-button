module.exports = {
	'build-nginx': ['clean:nginx', 'nunjucks-alt:nginx'],
	'build-pages': 'copy:pages',
	'build-css': 'sass:all',
	'build-js': ['concat:main', 
		'concat:pages','nunjucks-alt:pages','concat:templates',
		'make-require-config'],
	'build-assets': ['copy:assets'],

	'build-consumer': ['ejs:consumer', 'concat:consumer', 'clean:consumer'],
	
	'default': ['clean:media', 'build-pages', 'build-css', 'build-js', 'build-assets', 'build-consumer'],
	'dev': ['default', 'watch']
};