define(['i18n!svex/commands/bulk.export/impl/nls/lang'
], function (lang) {
  'use strict';

  return {
    //This adds the command in the upper toolbar
    otherToolbar   : [
      {
        signature: 'svex-bulk-export',
        name     : lang.toolbarButtonTitle
      }
    ],
    //This will add the command in the context menu of nodes
    inlineActionbar: [
      {
        signature: 'svex-bulk-export',
        name     : lang.toolbarButtonTitle
      }
    ]
  };

});
