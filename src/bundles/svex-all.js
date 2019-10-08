// Placeholder for the build target file; the name must be the same,
// include public modules from this component

define([
  'svex/commands/bulk.export/bulk.export.command',
  'svex/commands/bulk.export/bulk.export.nodestable.toolitems'
], {});

require([
  'require',
  'css'
], function (require, css) {
  // Load the bundle-specific stylesheet
  css.styleLoad(require, 'svex/bundles/svex-all');
});
