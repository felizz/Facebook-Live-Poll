'use strict';

require('file?name=scripts/vendors.js!./vendors.js');

require("../styles/style.less");

window.application = require('./core/application');

// alert(1);

let $editors = $('.sn.editable.editor');
if($editors.length){
    $.each($editors, (index, containerDOM) => {
        application.register('moduleEditor' + index, require('./modules/editable-editor'), {
            containerDOM: containerDOM
        });
    })
}


$(function () {
    application.start();
});