// Exposes getAllModules method (based on csui.getAllComponentModules) which
// returns all public modules from this component.  Components depending on
// this one can use it to exclude dependant modules from their bundles.

var fs = require('fs'),
    path = require('path');

var
// Path to the csui sources
    csuiPath = path.join(__dirname, '../lib/src/csui'),
// The csui component exposes th index loading method
    csuiComponent = require(path.join(csuiPath, '/component')),
// Describe local bundles
    bundlePrefix = 'svex',
    bundleNames = ['svex-all'],
    bundlePath = path.join(__dirname, 'bundles');

module.exports = {
  getAllModules: function () {
    return csuiComponent.getAllComponentModules(bundleNames, bundlePath, bundlePrefix);
  }
};
