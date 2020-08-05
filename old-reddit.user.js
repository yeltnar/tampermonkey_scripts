// ==UserScript==
// @name        always old reddit
// @namespace   Violentmonkey Scripts
// @match       https://www.reddit.com/*
// @match       https://www.reddit.com*
// @grant       none
// @version     1.0
// @author      Andrew Brantley
// @run-at      document-start
// ==/UserScript==

(()=>{
  
  console.log('before change')
  window.location.href = window.location.href.split("https://www.").join("https://old.");
  console.log('after change')
  
})();
