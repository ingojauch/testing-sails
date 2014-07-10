module.exports = function(grunt) {


	var templateFilesToInject = [
		'templates/**/*.html'
	];

	grunt.initConfig({

	    mochaTest: {
	    	test: {

	    		options: {
		        	reporter: 'spec'
		        },
		        src: ['test/**/*.spec.js']
		      }
	    },
	    mocha_istanbul: {
	    	coverage: {
		    	src: 'test', // the folder, not the files
		    options: {
		      coverageFolder: 'coverage',
		      mask: '**/*.spec.js',
		      root: 'api/'
		    }
		  }
		},
		jshint: {
			all: [
		        'Gruntfile.js'
		    ]
		},


		// 
		// this cant be correct, there must be a better way instead of duplicating the conf
		// 
	    clean: {
	    	dev: ['.tmp/public/**'],
			build: ['www']
	    },
	    jst: {
	    	dev: {
				files: {
					// e.g.
					// 'relative/path/from/gruntfile/to/compiled/template/destination'  : ['relative/path/to/sourcefiles/**/*.html']
					'.tmp/public/jst.js': require('../pipeline').templateFilesToInject
				}
			}
	    },
	    less: {
	    	dev: {
	    		files: [{
					expand: true,
					cwd: 'assets/styles/',
					src: ['importer.less'],
					dest: '.tmp/public/styles/',
					ext: '.css'
				}]
			}
	    },
	    copy: {
	    	dev: {
			files: [{
				expand: true,
				cwd: './assets',
				src: ['**/*.!(coffee|less)'],
				dest: '.tmp/public'
			}]
			},
			build: {
				files: [{
					expand: true,
					cwd: '.tmp/public',
					src: ['**/*'],
					dest: 'www'
				}]
			}
	    },
	    coffee: {
	    	dev: {
				options: {
					bare: true,
					sourceMap: true,
					sourceRoot: './'
				},
				files: [{
					expand: true,
					cwd: 'assets/js/',
					src: ['**/*.coffee'],
					dest: '.tmp/public/js/',
					ext: '.js'
				}, {
					expand: true,
					cwd: 'assets/js/',
					src: ['**/*.coffee'],
					dest: '.tmp/public/js/',
					ext: '.js'
				}]
			}
	    },
	    'sails-linker': {
	    	devJs: {
				options: {
					startTag: '<!--SCRIPTS-->',
					endTag: '<!--SCRIPTS END-->',
					fileTmpl: '<script src="%s"></script>',
					appRoot: '.tmp/public'
				},
				files: {
					'.tmp/public/**/*.html': require('../pipeline').jsFilesToInject,
					'views/**/*.html': require('../pipeline').jsFilesToInject,
					'views/**/*.ejs': require('../pipeline').jsFilesToInject
				}
			},
			devStyles: {
				options: {
					startTag: '<!--STYLES-->',
					endTag: '<!--STYLES END-->',
					fileTmpl: '<link rel="stylesheet" href="%s">',
					appRoot: '.tmp/public'
				},

				files: {
					'.tmp/public/**/*.html': require('../pipeline').cssFilesToInject,
					'views/**/*.html': require('../pipeline').cssFilesToInject,
					'views/**/*.ejs': require('../pipeline').cssFilesToInject
				}
			},
			devTpl: {
				options: {
					startTag: '<!--TEMPLATES-->',
					endTag: '<!--TEMPLATES END-->',
					fileTmpl: '<script type="text/javascript" src="%s"></script>',
					appRoot: '.tmp/public'
				},
				files: {
					'.tmp/public/index.html': ['.tmp/public/jst.js'],
					'views/**/*.html': ['.tmp/public/jst.js'],
					'views/**/*.ejs': ['.tmp/public/jst.js']
				}
			},
			devJsJade: {
				options: {
					startTag: '// SCRIPTS',
					endTag: '// SCRIPTS END',
					fileTmpl: 'script(src="%s")',
					appRoot: '.tmp/public'
				},
				files: {
					'views/**/*.jade': require('../pipeline').jsFilesToInject
				}
			},
			devStylesJade: {
				options: {
					startTag: '// STYLES',
					endTag: '// STYLES END',
					fileTmpl: 'link(rel="stylesheet", href="%s")',
					appRoot: '.tmp/public'
				},

				files: {
					'views/**/*.jade': require('../pipeline').cssFilesToInject
				}
			},
			devTplJade: {
				options: {
					startTag: '// TEMPLATES',
					endTag: '// TEMPLATES END',
					fileTmpl: 'script(type="text/javascript", src="%s")',
					appRoot: '.tmp/public'
				},
				files: {
					'views/**/*.jade': ['.tmp/public/jst.js']
				}
			}
	    }

	});

	grunt.loadNpmTasks('grunt-mocha-istanbul');
	grunt.loadNpmTasks('grunt-mocha-test');
	grunt.loadNpmTasks('grunt-contrib-jshint');
};
