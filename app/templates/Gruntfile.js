/*global module:false*/
var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT});
var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    bower: {
      install: {
        options: {
          targetDir: 'bower_components'
        }
      }
    },

    connect: {
      options: {
        port:9000
        
      },
      server: {
        options: {
          port:9000,
          // change this to '0.0.0.0' to access the server from outside
          hostname: 'localhost'
        }
      },
      livereload: {
        options: {
          base: 'dist',
          directory: 'dist',
          middleware: function (connect) {
            return [
              lrSnippet,
              mountFolder(connect, 'dist')
            ];
          }
        }
      }
    },


    stylus: {
      compile: {
        files: {
          'main.css': 'main.styl'
        }
      }
    },

    copy: {
      main: {
        files: [{
          expand: true,
          src: [
            'bower_components/bootstrap/dist/js/bootstrap.min.js',
            'bower_components/jquery/dist/jquery.min.js',
            'lib/*'
          ],
          dest: 'dist/lib',
          flatten: true
        }, {
          expand: true,
          src: [
            'app.js',
            'main.css',
            'index.html'
          ],
          dest: 'dist',
          flatten: false
        }]
      }
    },
    
    'gh-pages':{
      options: {
        base: 'dist'
      },
      src: ['**']
    },

    clean: {
      dist: ['dist']
    },

    //Open default browser at the app
    open: {
      server: {
        path: 'http://localhost:<%= connect.options.port %>'
      }
    },
    //setup watch tasks
    watch: {
      options: {
        nospan: true,
        livereload: LIVERELOAD_PORT
      },
      css: {
        files: '**/*.styl',
        tasks: ['stylus']
      },
      source: {
        files: ['app.js', 'index.html'],
        tasks: ['build']
      },
      livereload:{
        options: {
          livereload:LIVERELOAD_PORT 
        },
        files:[
          'dist/**/*'
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-gh-pages');

  grunt.registerTask('build', ['stylus', 'copy']);
  grunt.registerTask('default', ['watch']);

  grunt.registerTask('default', [
        'serve'
    ]);

  grunt.registerTask('serve', function (target) {
    grunt.task.run([
      
      'clean:dist',
      'build',
      'connect:livereload',
      'open',
      'watch'
    ]);
  });


  grunt.registerTask("deploy", [
    'build',
    'gh-pages'
  ]); 

};