module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),

    submodule: {
      options: {}
    },

    concat: {
      dist: {
        src: [
          'lib/*.js',
          'js/game.js',
          'build/js/resources.js',
          'js/**/*.js',
        ],
        dest: 'build/js/app.js'
      }
    },

    copy: {
      dist: {
        files: [{
          src: 'index.css',
          dest: 'build/index.css'
        }, {
          src: 'data/**/*',
          dest: 'build/',
          expand: true
        }]
      },

      vendor: {
        files: [{
          expand: true,
          src: [
            'melonJS/build/melonJS.js',
            'melonJS/plugins/debugPanel.js'
          ],
          dest: ['lib/']
        }]
      }
    },

    clean: {
      app: ['build/js/app.js'],
      dist: ['build/', 'bin/']
    },

    processhtml: {
      dist: {
        options: {
          process: true,
          data: {
            title: '<%= pkg.author %>'
          }
        },
        files: {
          'build/index.html': ['index.html']
        }
      }
    },

    replace: {
      dist: {
        options: {
          usePrefix: true,
          force: true,
          patterns: [{
            match: /this\._super\(\s*([\w\.]+)\s*,\s*["'](\w+)["']\s*(,\s*)?/g,
            replacement : '$1.prototype.$2.apply(this$3'
          }]
        },
        files: [{
          src: [ 'build/js/app.js' ],
          dest: 'build/js/app.js'
        }]
      }
    },

    uglify: {
      options: {
        report: 'min',
        preserveComments: 'some'
      },
      dist: {
        files: {
          'build/js/app.min.js': [
            'build/js/app.js'
          ]
        }
      }
    },

    resources: {
      dist: {
        options: {
          dest: 'build/js/resources.js',
          varname: 'game.resources'
        },
        files: [{
          src: ['data/img/**/*.png'],
          type: 'image'
        }, {
          src: ['data/tmx/**/*.tmx'],
          type: 'tmx'
        }]
      }
    },

    watch: {
      resources: {
        files: ['data/**/*'],
        tasks: ['resources'],
        options: {
          spawn: false
        }
      }
    },

    connect: {
      keepalive: {
        options: {
          port: 8080,
          keepalive: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-replace');
  grunt.loadNpmTasks('grunt-processhtml');
  grunt.loadNpmTasks('grunt-submodule');

  grunt.registerTask('melonJS', [ 'submodule', 'copy:vendor' ]);
  grunt.registerTask('serve', [ 'melonJS', 'connect:keepalive' ]);

  grunt.registerTask('default', [
    'melonJs',
    'resources',
    'concat',
    'replace',
    'uglify',
    'copy:dist',
    'processhtml',
    'clean:app'
  ]);
};
