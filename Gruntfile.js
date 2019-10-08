'use strict';

// Exposes the build, test and documentation tasks for the production
module.exports = function (grunt) {
  var environment = process.env,
      time = environment.GRUNT_TIME === 'true',
      notify = environment.GRUNT_NOTIFY === 'true';

  // Report the duration of the tasks run
  if (time) {
    require('time-grunt')(grunt);
  }

  // Declare tasks for the package production stages
  grunt.initConfig({
    // Set up desktop grunt result notifications
    notify_hooks: {
      options: {
        enabled: notify,
        max_jshint_notifications: 5,
        title: 'csui',
        success: true,
        duration: 3
      }
    },

    // Delegate component build to their directories, delegate test
    // execution and documentation production to their directories
    subgrunt: {
      check: {
        'src': 'check'
      },
      compile:  ['src'],
      debug: {
        'src': 'debug'
      },
      release: {
        'src': 'release'
      },
      specs: {
        'test': 'specs'
      },
      test: ['test'],
      options: {
        npmInstall: false
      }
    }


  });

  // Load grunt plugins used in this Gruntfile
  grunt.loadNpmTasks('grunt-subgrunt');
  grunt.loadNpmTasks('grunt-notify');

  // Perform static code correctness check
  grunt.registerTask('check', ['subgrunt:check']);

  // Build debug packages
  grunt.registerTask('compile_debug', [
    'subgrunt:check', 'subgrunt:debug'
  ]);
  // Build release packages
  grunt.registerTask('compile_release', [
    'subgrunt:check', 'subgrunt:release'
  ]);
  // Build both debug and release packages
  grunt.registerTask('compile', ['subgrunt:compile']);

  // Execute tests: ixmk test
  grunt.registerTask('test', ['subgrunt:test']);

  // Allow running just "grunt" in this directory to perform static code
  // checks, build both debug and release packages and run tests
  grunt.registerTask('default', [
    'subgrunt:compile', 'subgrunt:specs'
  ]);

  // Register desktop notification hooks
  grunt.task.run('notify_hooks');
};
