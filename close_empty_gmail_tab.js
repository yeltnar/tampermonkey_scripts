// ==UserScript==
// @name         Close empty gmail tab
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  try to take over the world!
// @author       You
// @match        https://mail.google.com/mail/*
// @match        https://www.google.com/url*
// @match        https://www.google.com/*
// @grant        window.close
// ==/UserScript==

(function() {
    'use strict';
    console.log("close empty gmail");
    setTimeout(()=>{
        const body = document.querySelector("body");
        if( body===null || body.innerHTML==="" ){
            window.close()
        }
    },5*1000);
})();
