// ==UserScript==
// @name        Limit query params
// @namespace   andbrant
// @match       https://www.redfin.com/*/home/*
// @match       https://www.zillow.com/homedetails/*
// @dont-match       https://portal.onehome.com/en-US/property/*
// @grant       none
// @version     1.1
// @author      github.com/yeltnar
// @run-at      document-start
// @dont-require     https://github.com/yeltnar/tampermonkey_scripts/raw/master/timeoutPromise.notauser.js
// @dont-require     https://github.com/yeltnar/tampermonkey_scripts/raw/master/textEleSearch.notauser.js
// @description 3/21/2022, 2:41:52 PM
// ==/UserScript==

(()=>{

  if( window.location.href !== window.location.origin+window.location.pathname ){
    window.location.href = window.location.origin+window.location.pathname;
  }

})();
