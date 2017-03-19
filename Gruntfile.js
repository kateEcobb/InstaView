module.exports = function(grunt) {
  
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    uglify: {
      production: {
        src: './build/production.js',
        dest: './build/production.js'
      }
    },

    webpack: {
      app: {
        entry: "./app/js/app.jsx",
        output: {
          path: __dirname + '/build',
          filename: 'production.js'
        },
        module: {
          loaders: [
            { test: /\.jsx$/, loader: 'babel-loader', include: './app/js/', exclude: './node_modules/'}
          ]
        }
      }
    },

    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1
      },
      target: {
        files: {
          './build/main.min.css': ['./app/styles/main.css']
        }
      }
    },

    copy: {
      index: {
        files: [
          {expand: true, flatten: true, src: './app/index.html', dest: './build/'}
        ]
      },
      images: {
        files: [
          {expand: true, flatten: true, src: './app/assets/*.jpg', dest: './build/images'}, 
          {expand: true, flatten: true, src: './app/assets/*.png', dest: './build/images'}
        ]
      }
    },

    clean: {
      js: ['./build/*.js'],
      css: ['./build/*.css'],
      index: ['./build/*.html'],
      images: ['./build/images/']
    },

    jshint: {
      files: [
        'app/**/*.js',
        'app/**/*.jsx',
        'server/**/*.js'
      ],
      options: {
        force: 'true',
      }
    },

    watch: {
      server: {
        files: ['server/**/*.js'],
        tasks: ['test'],
      },
      client: {
        files: ['app/**/*.js', 'app/**/*.jsx'],
        tasks: ['test', 'webpack:app'],
      },
      css: {
        files: ['app/styles/main.css'],
        tasks: ['cssmin']
      },
      index: {
        files: ['app/index.html'],
        tasks: ['copy'],
      },
      images: { 
        files: ['app/assets/*.png', 'app/assets/*.jpg'], 
        tasks: ['copy'],
      },
      options: {
        debounceDelay: 1000,
      }
    },

    nodemon: {
      dev: {
        script: 'server/server.js',
        options: {
          ignore: ['node_modules'],
          watch: ['server'],
          delay: 1000
          }
        },
      }
  
  });

  // Load in Grunt dependencies
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-jsxhint');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-webpack');
  grunt.loadNpmTasks('grunt-services');

  // Grunt Tasks ////////////////////////////////////////
  grunt.registerTask('server-dev', function(target) {

    var nodemon = grunt.util.spawn({
      cmd: 'grunt',
      grunt: true,
      args: 'nodemon',
    });

    nodemon.stdout.pipe(process.stdout);
    nodemon.stderr.pipe(process.stderr);
    
    grunt.task.run(['startMongo']);
    grunt.task.run(['watch']);
  });

  grunt.registerTask('test', [
    'jshint',
  ]);

  grunt.registerTask('build', function(n) {
    grunt.task.run(['webpack']);
    grunt.task.run(['cssmin']);
    grunt.task.run(['copy']);
  });


};
