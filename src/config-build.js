// Module paths and the default configuration for the build-time
// Keep this file in sync with config-build.json.

require.config({

  paths: {
    // Disable crawling of dependencies
    csui: 'empty:',
    // Locate source modules in this component
    'svex': '.',
    // Locate requirejs plugins used in this component
    hbs: '../lib/src/csui/lib/hbs',
    css: '../lib/src/csui/lib/css',
    'csui-ext': '../lib/src/csui/utils/load-extensions/load-extensions',
    i18n: '../lib/src/csui/lib/i18n',
    json: '../lib/src/csui/lib/json',
    less: '../lib/src/csui/lib/less',
    txt: '../lib/src/csui/lib/text',
    // Locate modules, which are used not only in the browser,
    // but also during the build; we need to map them explicitly,
    // because we disabled the entire "csui" path above
    'csui/lib/css-builder': '../lib/src/csui/lib/css-builder',
    'csui/lib/handlebars': '../lib/src/csui/lib/handlebars',
    'csui/lib/i18nprecompile': '../lib/src/csui/lib/i18nprecompile',
    'csui/lib/normalize': '../lib/src/csui/lib/normalize',
    'csui/lib/underscore': '../lib/src/csui/lib/underscore'
  },

  hbs: {
    disableI18n: true,
    disableHelpers: true,
    templateExtension: 'hbs'
  }

});
