# svex Module

This is a CS UI Extension project.

## Pre-requisites

The following tools have to be installed, before you start:

* NodeJS 4 or newer
* Python 2 (the most recent 2.x)
* Git
* Grunt command line tool:


    npm install -g grunt-cli


## Contents

The directory structure of this project:

    ./               # Package settings
      lib/           # CS UI dependencies
      out-debug/     # This project's debug build output
      out-release/   # This project's release build output
      src/           # Module sources
        bundles/     # Module bundle definitions
      test/          # Test configuration
        debug/       # Output of the source module tests
          coverage/  # Test coverage reports
          results/   # Test result reports
        release/     # Output of the release bundle tests
          results/   # Test result reports

Selected files from this project:

    src/
      bundles/
        # Main module for the compile package
        svex-all.js
      # Controls the build and other source maintenance tasks
      Gruntfile.js
      # Configures the RequireJS module compiler (r.js)
      config-build.js
      # Declares CS UI extension exposed by this module
      svex-extensions.json
      # Lists public modules exposed by this project, so that
      # other projects, which depend on it, can exclude them
      component.js
    test/
      # Controls the test execution task
      Gruntfile.js
      # Configures the tests in the browser
      test-common.js
      # Supplies the browser configuration part for source tests
      test-debug.js
      # Supplies the browser configuration part for release tests
      test-release.js
      # Configures the Karma test runner
      karma.common.js
      # Supplies the runner configuration part for source tests
      karma.debug.js
      # Supplies the runner configuration part for release tests
      karma.release.js
    # Sets up static code checks for source stylesheets
    .csslintrc
    # Sets up sanity checks for built stylesheet bundles
    .eslintrc-output
    # Sets up static code checks for JavaScript sources
    .jshintrc
    # Sets up sanity checks for built JavaScript bundles
    .eslintrc
    # Sets up static code checks for HTML sample pages
    .jshintrc-html
    # Declares aliases to run build tasks from src/ and test/ directories
    Gruntfile.js
    # Configures the RequireJS support in WebStorm
    config-editor.js
    # Maintains build tool dependencies
    package.json
    # Describes this sample
    README.md
    # Development web server
    server.js

## Build

Inspect `Gruntfile.js` and discover available tasks. Running the default task
will check the sources, compile the output files and run unit tests:


    grunt


## Add Content

You can add a new widget with a sample model, factory and view, which you can
start with and modify according to your goal, by the `widget` sub-generator:


    yo csui-extension:widget


Inspect the generated widget in `src/widgets/<widget directory>` and rebuild
the updated project:


    grunt


## Develop

Start the web server to be able to see the code running in the web browser.
You can also use other web server with the web root pointed to the project
root, or open the project directory in your IDE and have the IDE open a HTML
page in the browser.


    npm start


Open a testing HTML page, for example:
http://localhost:7777/src/widgets/<widget directory>/test/index.html.
Edit your sources and refresh the browser page to check the results.

You also can copy samples from the SDK into this project and follow the
respective documentation.
