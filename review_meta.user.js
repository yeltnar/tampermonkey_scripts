// ==UserScript==
// @name        New script - reviewmeta.com
// @namespace   andbrant
// @match       https://reviewmeta.com/amazon/B07PV8ZN1X
// @dontmatch       https://.*\.amazon.com/*
// @match       https://www.amazon.com/*
// @grant       none
// @version     1.0
// @author      -
// @dont-require     https://github.com/yeltnar/tampermonkey_scripts/raw/master/timeoutPromise.notauser.js
// @dont-require     https://github.com/yeltnar/tampermonkey_scripts/raw/master/textEleSearch.notauser.js
// @grant        GM_registerMenuCommand
// @description 2/1/2022, 10:55:05 PM
// ==/UserScript==


(()=>{
  'use strict';
  
  const moveToReviewMeta=()=>{
    let product = /\/(([A-Z]|[0-9]){10})/.exec(window.location.href)[1];
    console.log(product);
    window.location.href=`https://reviewmeta.com/amazon/${product}`;
  }
  
  
  GM_registerMenuCommand("moveToReviewMeta", moveToReviewMeta);
})();
