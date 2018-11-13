// ==UserScript==
// @name         Always Amazon Smile
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Always Amazon Smile
// @author       Andrew Brantley
// @match        https://www.amazon.com/
// @match        https://www.amazon.com
// @match        https://www.amazon.com/*
// @grant        none
// @run-at document-start
// ==/UserScript==

(function() {
    window.location.href = window.location.href.split("www.amazon.").join("smile.amazon.");
    
})();