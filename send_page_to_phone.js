// ==UserScript==
// @name         send page to phone
// @namespace    http://tampermonkey.net/
// @version      0.2.1
// @description  send page to phone
// @author       You
// @match        http://*/*
// @match        https://*/*
// @match        chrome-extension://*/*
// @grant        none
// ==/UserScript==

let last_key="";

(()=>{
    'use strict';
    window.addEventListener("keyup",keyAction);
    console.log("added send to join key listener");
    function keyAction(e){
        last_key += e.key;
        if( /jjjjj/.test(last_key) ){
           let url = window.location.href;
           url = encodeURIComponent(url);
           let req_url = `https://joinjoaomgcd.appspot.com/_ah/api/messaging/v1/sendPush?url=${url}&deviceId=60a30f961e6546798ba899bc6033c33f&apikey=4e5267df11734f0085829a771456ace9`;
           fetch(req_url);
           last_key="";
           console.log("called send to join");
        }
    }
})();
