define(['i18n!svex/commands/bulk.export/impl/nls/lang'
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
