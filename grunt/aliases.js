module.exports = {
	'build-nginx': ['clean:nginx', 'ejs:nginx'],
	'build-pages': 'copy:pages',
	'build-css': 'sass:all',
	'build-js': ['concat:main', 
		'concat:pages','nunjucks:pages','concat:templates',
		'make-require-config'],
	
	'default': ['clean:media', 'build-pages', 'build-css', 'build-js'],
	'dev': ['default', 'watch']
};