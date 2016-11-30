'use strict';

require('file?name=scripts/vendors.js!./vendors.js');

require("../styles/style.less");

window.application = require('./core/application');

// alert(1);

let $editors = $('.sn.editor');
if($editors.length){
    $.each($editors, (index, containerDOM) => {
        application.register('moduleEditor' + index, require('./modules/editor'), {
            containerDOM: containerDOM
        });
    })
}

if($('#segment_instructions').length){
    application.register('moduleInstructions', require('./modules/instructions'));
}

if($('body.page-landing').length){
    application.register('pageLanding', require('./pages/landing'));
}

$(function () {
    application.start();
});