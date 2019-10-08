'use strict';

// Builds debug and release package files for the product
module.exports = function (grunt) {
  var environment = process.env,
      time = environment.GRUNT_TIME === 'true',
      notify = environment.GRUNT_NOTIFY === 'true';

  // Report the duration of the tasks run
  if (time) {
    require('time-grunt')(grunt);
  }

  var
  // RequireJS modules of the components, which we depend on
      csuiComponent = require('../lib/src/csui/component'),
  // RequireJS modules packed into the product bundles
      requirejsModules = [
        {
          name: 'bundles/svex-all',
          // Only plugin aliases are needed; modules referenced
          // by component prefixes are excluded by pointing their
          // prefix to "empty:" in the build configuration
          exclude: csuiComponent.getAllRequireJsPlugins()
        }
      ];

  // Declare tasks for the build from sources
  grunt.initConfig({
    // Set up desktop grunt result notifications
    notify_hooks: {
      options: {
        enabled: notify,
        max_jshint_notifications: 5,
        title: 'svex/src',
        success: true,
        duration: 3
      }
    },

    // Extract bundles index to csui-index.js and csui-index.json files
    requirejsBundleIndex: {
      all: {
        src: [
          'bundles/svex-all.js'
        ],
        dest: 'bundles/svex-index',
        options: {
          prefix: 'svex'
        }
      }
    },

    // Check if bundle indexes refer to distinct collection of modules
    requirejsBundleCheck: {
      all: {
        options: {
          prefix: 'svex',
          dependencies: requirejsModules,
          config: 'config-build.js'
        }
      }
    },

    // Check if we depend only on public modules
    requirejsDependencyCheck: {
      all: {
        options: {
          prefix: 'svex',
          bundles: requirejsModules,
          dependencies: csuiComponent.getAllModules(),
          config: 'config-build.js',
          // TODO: Remove this, as soon as we clarify the public interface
          // for inline forms
          allowIndexedPrivateModules: true
        }
      }
    },

    // Copy, uglify and combine RequireJS modules to file bundles
    requirejs: {
      debug: {
        options: {
          mainConfigFile: 'config-build.js',
          namespace: 'csui',
          separateCSS: true,
          appDir: '.',
          baseUrl: '.',
          siteRoot: '.',

          dir: '../out-debug',
          optimizeCss: 'none',
          optimize: 'none',

          modules: requirejsModules
        }
      },

      release: {
        options: {
          mainConfigFile: 'config-build.js',
          namespace: 'csui',
          separateCSS: true,
          appDir: '.',
          baseUrl: '.',
          siteRoot: '.',

          dir: '../out-release',
          optimize: 'uglify2',
          uglify2: {
            output: {
              // Workaround for IE, which fails parsing JavaScript with Unicode.  The
              // select2 component uses keys with diacritics and IIS does not send
              // the UTF-8 charset in the Content-Type header for the *.js files.
              ascii_only: true,
              quote_keys: true
            }
          },
          generateSourceMaps: true,
          preserveLicenseComments: false,

          modules: requirejsModules
        }
      }
    },

    // Remove files and directories from the output which are not distributed
    requirejsCleanOutput: {
      release: {
        src: '../out-release'
      },
      debug: {
        src: '../out-debug'
      }
    },

    // Perform static code correctness checks
    jshint: {
      js: {
        src: ['./**/*.js', '../test/*.js'],
        options: {
          jshintrc: '../.jshintrc',
          reporter: require('jshint-stylish')
        }
      },
      html: {
        src: ['**/test/*.html'],
        options: {
          jshintrc: '../.jshintrc-html',
          reporter: require('jshint-stylish'),
          extract: 'auto'
        }
      }
    },

    // Perform a format check on the concatenated and minified
    // JavaScript files
    eslint: {
      debug: [
        '../out-debug/bundles/*.js'
      ],
      release: [
        '../out-release/bundles/*.js'
      ]
    },

    // Check correct format of the CSS source files
    csslint: {
      source: {
        options: {
          csslintrc: '../.csslintrc'
        },
        src: ['**/*.css']
      },
      debug: {
        options: {
          csslintrc: '../.csslintrc-output'
        },
        src: ['../out-debug/**/*.css']
      },
      release: {
        options: {
          csslintrc: '../.csslintrc-output'
        },
        src: ['../out-release/**/*.css']
      }
    },

    // Check correct format of the JSON source files
    jsonlint: {
      source: [
        '**/*.json'
      ],
      debug: [
        '../out-debug/*.json'
      ],
      release: [
        '../out-release/*.json'
      ]
    },

    // Perform static code correctness checks but do not fail;
    // this is used in test runner, which may use ddescribe and
    // iit methods, which should not be allowed in normal build
    override: {
      jshint: {
        options: {
          force: true
        }
      }
    },

    // Remove files and directories from the output which are not distributed
    clean: {
      generated: [
        'bundles/*-index.*'
      ]
    },

    // Replaces the build number in the test extension-describing file,
    // if provided by the process environment, otherwise leave the number
    // in the source file
    replace: {
      options: {
        force: true,
        patterns: process.env.BUILD ? [
          {
            match: /"version": "[.0-9]+"/g,
            replacement: '"version": "' + process.env.BUILD + '"'
          }
        ] : []
      },
      debug: {
        files: [
          {
            src: ['svex-extensions.json'],
            dest: '../out-debug/svex-extensions.json'
          }
        ]
      },
      release: {
        files: [
          {
            src: ['svex-extensions.json'],
            dest: '../out-release/svex-extensions.json'
          }
        ]
      }
    },

    // Copies the stylesheets and related files to a single directory,
    // so that it can be used as a template for a custom styling
    copy: {
      module: {
        files: [
          {
            cwd: "../srcmodules/svex",
            src: "**",
            dest: "../out-module/svex",
            expand: true
          },
          {
            cwd: "../out-release",
            src: "**",
            dest: "../out-module/svex/support",
            expand: true
          }
        ]
      }
    },

    // Generate bundles of concatenated i18n modules in the default language
    // (English, locale'root') prepared for localization to other languages
    languagepack: {
      all: {
        options: {
          prefix: 'svex',
          config: 'config-build.js',
          bundlesInfo: requirejsModules,
          bundleIndexes: {
            'bundles/svex-index': ['bundles/svex-all']
          },
          outputDir: '../out-languagepack_en'
        }
      }
    },

    // Generate RTL versions of stylesheet bundles
    rtlcss: {
      debug: {
        expand: true,
        cwd: '../out-debug/bundles',
        src: './*.css',
        dest: '../out-debug/bundles/',
        rename: function (dest, src) {
          return dest + src.replace('.css', '-rtl.css');
        }
      },

      release: {
        expand: true,
        cwd: '../out-release/bundles',
        src: './*.css',
        dest: '../out-release/bundles/',
        rename: function (dest, src) {
          return dest + src.replace('.css', '-rtl.css');
        }
      }
    },
  });

  // Load grunt plugins used in this Gruntfile
  grunt.loadTasks('../node_modules/grunt-contrib-clean/tasks');
  grunt.loadTasks('../node_modules/grunt-contrib-copy/tasks');
  grunt.loadTasks('../node_modules/grunt-contrib-csslint/tasks');
  grunt.loadTasks('../node_modules/grunt-contrib-jshint/tasks');
  grunt.loadTasks('../node_modules/grunt-contrib-requirejs/tasks');
  grunt.loadTasks('../node_modules/grunt-eslint/tasks');
  grunt.loadTasks('../node_modules/grunt-jsonlint/tasks');
  grunt.loadTasks('../node_modules/grunt-notify/tasks');
  grunt.loadTasks('../node_modules/grunt-override-config/tasks');
  grunt.loadTasks('../node_modules/grunt-replace/tasks');
  grunt.loadTasks('../node_modules/grunt-rtlcss/tasks');
  grunt.loadTasks('../lib/src/csui/grunt-tasks');

  // Define the order of tasks to build debug and release targets; make sure
  // that static code checks are performed too
  grunt.registerTask('check', [
    'jshint', 'jsonlint:source', 'csslint:source'
  ]);
  grunt.registerTask('debug', [
    'requirejsBundleIndex', 'requirejsBundleCheck',
    'requirejsDependencyCheck', 'requirejs:debug', 'clean:generated',
    'requirejsCleanOutput:debug', 'languagepack', 'replace:debug',
    'rtlcss:debug', 'eslint:debug', 'jsonlint:debug', 'csslint:debug'
  ]);
  grunt.registerTask('release', [
    'requirejsBundleIndex', 'requirejs:release', 'clean:generated',
    'requirejsCleanOutput:release', 'replace:release', 'rtlcss:release',
    'eslint:release', 'jsonlint:release', 'csslint:release', 'copy'
  ]);

  // Allow running just "grunt" in this directory to performa static checks
  // and build both debug and release targets
  grunt.registerTask('default', ['check', 'debug', 'release']);

  // Register desktop notification hooks
  grunt.task.run('notify_hooks');
};
