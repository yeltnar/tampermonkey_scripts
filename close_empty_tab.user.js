// ==UserScript==
// @name         Close empty tab
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Close empty tab
// @author       github.com/yeltnar
// @match        https://mail.google.com/mail/*
// @match        https://www.google.com/url*
// @match        https://www.google.com/*
// @match        https://slack-redir.net/*
// @grant        window.close
// ==/UserScript==

(function() {
    'use strict';
    console.log("close empty gmail");
    setTimeout(()=>{
        const body = document.querySelector("body");
        if( body===null ){
            window.close()
        }
    },5*1000);
})();
