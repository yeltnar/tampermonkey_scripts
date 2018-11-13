// ==UserScript==
// @name         copy google text recommendation
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  copy google text recommendation
// @author       You
// @match        https://www.google.com/search?q=*
// @grant        GM_setClipboard
// @grant        window.close
// ==/UserScript==

let key ="";

let keyAction = (e)=>{
    key += e.key;
    if( key==="EnterEnter" ){
        let txt = document.querySelectorAll("a.spell")[0].innerText;
        GM_setClipboard( txt );
        window.close();
    }
    console.log("key pressed");
    console.log(key);
    console.log(e.key);
};

(function() {
    'use strict';

    try{
        let text = document.querySelectorAll("a.spell")[0].innerText;
        window.addEventListener("keyup",keyAction);
    }catch(e){}

    console.log("kk");

})();

