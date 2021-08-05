// ==UserScript==
// @name        Simple Amazon URL
// @namespace   andbrant
// @match       https://www.amazon.com/*
// @grant       GM_registerMenuCommand
// @version     0.2
// @author      -
// @dont-require     https://github.com/yeltnar/tampermonkey_scripts/raw/master/timeoutPromise.notauser.js
// @dont-require     https://github.com/yeltnar/tampermonkey_scripts/raw/master/textEleSearch.notauser.js
// ==/UserScript==

// TODO need no autoload or smart autoload

function simpleAmazonURL(){  
  let product = /\/(([A-Z]|[0-9]){10})/.exec(window.location.href)[1];
  window.location.href = `https://amazon.com/dp/${product}`;
}

(()=>{
  GM_registerMenuCommand("Simple Amazon URL", simpleAmazonURL);
})();
