// ==UserScript==
// @name        always old reddit
// @namespace   Violentmonkey Scripts
// @match       https://www.reddit.com/*
// @match       https://www.reddit.com*
// @grant       none
// @version     1.2
// @author      Andrew Brantley
// @run-at      document-start
// @grant       window.close
// ==/UserScript==

(()=>{
  
  console.log('before change')
  window.location.href = window.location.href.split("https://www.").join("https://old.");
  // setTimeout(()=>{
  //   window.close();
  // },3000);
  console.log('after change')
  
})();
