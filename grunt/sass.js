module.exports = function () {
	var path = require("path");

	var renameToCss = function (dest, srcPath) {
		srcPath = srcPath.replace(/scss/g, "css");
		return path.join(dest, srcPath);
	};


	return {
		all: {
			options: {
				loadPath: ['media/scss/vendor/foundation']
			},
			expand: true,
			src: ['media/scss/**/*.scss', '!media/scss/vendor/**'],
			dest: 'target/',
			ext: '.css',
			rename: renameToCss
		}
	};

};