// ==UserScript==
// @name         Close empty gmail tab
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://mail.google.com/mail/*
// @grant        window.close
// ==/UserScript==

(function() {
    'use strict';
    console.log("close empty gmail");
    setTimeout(()=>{
        if(document.querySelector("body").innerHTML===""){
            window.close()
        }
    },5*1000);
})();
