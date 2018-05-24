// ==UserScript==
// @name         otouzi click
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.otouzi.com/product/info/id/*
// @grant        none
// ==/UserScript==

(function() {
  'use strict';
  var block1 = document.querySelector('.info-top-mon.clearfix');
  var trimBlock = block1.textContent.replace(/[ | ]*\n/g,'').replace(/ /g,'');
  console.log(trimBlock);
  var rateReg = /(.*?)%/.exec(trimBlock);
  var minDateReg = /(\d+)个月/.exec(trimBlock);
  var availableReg = /(\d+(\.\d+)?)元/.exec(trimBlock.replace(/,/g,''));
  var isFix = trimBlock.includes('固定');
  let [rate,minDate,available] = [0,0,0];
  if(rateReg.length){
    rate = Number(rateReg[1]);
    available = Number(availableReg[1].replace(',',''));
  }
  if(minDateReg){
    minDate = Number(minDateReg[1]);
  }else{
    minDate = Number(/(\d+)天/.exec(trimBlock)[1])/30;
  }

  var myMoney = Number(document.getElementById('my-money').textContent);

  var block2 = document.querySelector('.info-top-reminder.clearfix').textContent;
  var method = block2.indexOf('等本等息')!=-1?true:false;

  var block3 = document.querySelector('.info-top-item.clearfix').textContent.replace(/[ | ]*\n/g,'').replace(/ /g,'');
  var durationReg = /期限(\d+)个月/.exec(block3);
  var duration = 0;
  if(durationReg&&!isFix){
    duration = Number(durationReg[1]);
  }else{
    duration = minDate;
  }
  console.log({rate, minDate, available, myMoney,method,duration});
  if(myMoney>=available&&method&&minDate>3&&duration==12&&available>=40000){
    fireClick();
  }
})();

function fireClick(){
  var pushBtn = document.getElementById('form-submit-button');
  var clickEvt = document.createEvent('HTMLEvents');
  clickEvt.initEvent('click',true,true);
  pushBtn.dispatchEvent(clickEvt);
}
