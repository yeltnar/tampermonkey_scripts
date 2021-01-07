// ==UserScript==
// @name        search redirect
// @namespace   Violentmonkey Scripts
// @match       https://www.startpage.com/do/dsearch
// @grant       none
// @version     0.1
// @author      -
// @description 1/7/2021, 9:52:00 AM
// @run-at document-start
// ==/UserScript==


(()=>{
  
  const query = new URLSearchParams(window.location.search).get("query") || undefined;
  console.log(`query is ${query}`);
  
  if( /fi sms ?/.test(query) ){
      window.location.href = `https://accounts.google.com/AccountChooser/signinchooser?continue=https%3A%2F%2Fmessages.google.com%2Fweb%2Fu%2F0%2FpostSignIn&flowName=GlifWebSignIn&flowEntry=AccountChooser`;
  }
  
})();
