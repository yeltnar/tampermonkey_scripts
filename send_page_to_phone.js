// ==UserScript==
// @name         send page to phone
// @namespace    http://tampermonkey.net/
// @version      0.2.3
// @description  send page to phone
// @author       You
// @match        http://*/*
// @match        https://*/*
// @match        chrome-extension://*/*
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==

let last_key="";

(()=>{
    'use strict';
    window.addEventListener("keyup",keyAction);
    console.log("added send to join key listener");
    function keyAction(e){
        last_key += e.key;
        if( /jjjjj/.test(last_key) ){
            sendThisPageToPhone()
        }
    }

    function sendThisPageToPhone(){
        let url = window.location.href;
        url = encodeURIComponent(url);
        sendToPhone(url);

    }

    function sendToPhone(url){
        let apikey = GM_getValue('join_apikey');
        if(apikey===undefined||apikey===null){
            apikey = prompt("enter join api key");
            GM_setValue('join_apikey', apikey);
        }

        const deviceId = "group.android";
        const title = "Push from browser";

        let req_url = `https://joinjoaomgcd.appspot.com/_ah/api/messaging/v1/sendPush?url=${url}&title=${title}&deviceId=${deviceId}&apikey=${apikey}`;
        console.log({req_url});
        fetch(req_url);
        last_key="";
        console.log("called send to join");
    }

    window.sendToPhone = sendToPhone;
    window.sendThisPageToPhone = sendThisPageToPhone;

})();

