module.exports = function (grunt) {
	grunt.registerTask('test', ['mochaTest']);
	grunt.registerTask('coverage', ['mocha_istanbul:coverage']);
	grunt.registerTask('jshint', ['jshint']);
};
