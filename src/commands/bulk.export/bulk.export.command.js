define(['require', 'csui/lib/underscore', 'csui/lib/jquery',
        'csui/models/command', 'csui/utils/commandhelper',
        'i18n!svex/commands/bulk.export/impl/nls/lang'
], function (require, _, $, CommandModel, CommandHelper, lang) {
  'use strict';

  /**
   * Created by WebStorm.
   * User: Kishore Kumar
   * Date: 08-Oct-2019
   * Time: 10:01 PM
   */

  // Dependencies needed only for the command execution
  var ModalAlert;

  var BulkExportCommand = CommandModel.extend({

    defaults: {
      signature: 'svex-bulk-export',
      name     : lang.toolbarButtonTitle,
      scope    : 'single'
    },

    enabled: function (status) {
      // Check that a single node, which can be modified, was selected
      //Change this if you want to sow only for documents
      var node = CommandHelper.getJustOneNode(status);
      //If needs to be shown only for documents then
      return node && node.get('type') === 144;
      //return !!node;
    },

    execute: function (status, options) {
      var self     = this,
          deferred = $.Deferred();
      // Require additional modules needed for the command execution first
      // when they are needed here; not right away in the module callback
      require(['csui/dialogs/modal.alert/modal.alert'
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
