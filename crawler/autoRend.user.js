var pushBtn = document.getElementById('form-submit-button');
var clickEvt = document.createEvent('HTMLEvents');
clickEvt.initEvent('click',true,true);
pushBtn.dispatchEvent(clickEvt);