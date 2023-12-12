// ==UserScript==
// @name        Move From YouTube 
// @namespace   andbrant
// @match       https://www.youtube.com/watch
// @grant       none
// @version     0.1
// @author      Yeltnar
// @grant        GM_registerMenuCommand
// @description 12/12/2023, 4:34:32 PM
// ==/UserScript==


(()=>{

  function move(){
    let x = window.location.href.split('https://www.youtube.com/watch')[1];
    x = `https://youtubetranscript.com/${x}`;
    console.log(x);
    window.location.href = x;
  }

  GM_registerMenuCommand("move to youtube transcript", move);

})()
