csui.define('svex/commands/bulk.export/impl/nls/lang',{
  "root": true,
  // Do not load English locale bundle provided by the root bundle
  "en-us": false,
  "en": false
});

csui.define('svex/commands/bulk.export/impl/nls/root/lang',{

  toolbarButtonTitle: 'Bulk Export',
  dialogTitle       : 'Bulk Export',
  message           : 'Bulk Exporting {0}!, This is just a sample for Anji'

});


csui.define('svex/commands/bulk.export/bulk.export.command',['require', 'csui/lib/underscore', 'csui/lib/jquery',
        'csui/models/command', 'csui/utils/commandhelper',
        'i18n!svex/commands/bulk.export/impl/nls/lang'
], function (require, _, $, CommandModel, CommandHelper, lang) {
  'use strict';

  // Dependencies needed only for the command execution
  var ModalAlert;

  var BulkExportCommand = CommandModel.extend({

    defaults: {
      signature: 'svex-bulk-export',
      name     : lang.toolbarButtonTitle,
      scope    : 'single'
    },

    /*enabled: function (status) {
      // Check that a single node, which can be modified, was selected
      //var node = CommandHelper.getJustOneNode(status);
      //return !!node;
      return true;
    },*/

    execute: function (status, options) {
      var self     = this,
          deferred = $.Deferred();
      // Require additional modules needed for the command execution first
      // when they are needed here; not right away in the module callback
      csui.require(['csui/dialogs/modal.alert/modal.alert'
      ], function () {
        ModalAlert = arguments[0];

        // Show a message Bulk Export and relay the result state to the caller
        var node    = CommandHelper.getJustOneNode(status),
            message = _.str.sformat(lang.message, node.get('name'));
        ModalAlert
        .showInformation(message, lang.dialogTitle)
        .always(function () {
          // Do not pass anything in case of success to prevent any
          // automatic success handling by the caller.
          deferred.resolve();
        });
      }, function (error) {
        // Pass the module loading error to be handled by the caller
        deferred.reject(error);
      });
      return deferred.promise();
    }

  });

  return BulkExportCommand;

});

csui.define('svex/commands/bulk.export/bulk.export.nodestable.toolitems',['i18n!svex/commands/bulk.export/impl/nls/lang'
], function (lang) {
  'use strict';

  return {
    otherToolbar   : [
      {
        signature: 'svex-bulk-export',
        name     : lang.toolbarButtonTitle
      }
    ],
    inlineActionbar: [
      {
        signature: 'svex-bulk-export',
        name     : lang.toolbarButtonTitle
      }
    ]
  };

});

// Placeholder for the build target file; the name must be the same,
// include public modules from this component

csui.define('bundles/svex-all',[
  'svex/commands/bulk.export/bulk.export.command',
  'svex/commands/bulk.export/bulk.export.nodestable.toolitems'
], {});

csui.require([
  'require',
  'css'
], function (require, css) {
  // Load the bundle-specific stylesheet
  css.styleLoad(require, 'svex/bundles/svex-all');
});

