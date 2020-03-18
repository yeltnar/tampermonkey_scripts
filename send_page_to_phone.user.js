// ==UserScript==
// @name         send page to phone
// @namespace    http://tampermonkey.net/
// @version      0.2.5
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
  
    console.log("send page to phone added")
  
    window.addEventListener("keyup",keyAction);
    console.log("added send to join key listener");
    function keyAction(e){
        last_key += e.key;
        if( /jjjjj/.test(last_key) ){
            sendThisPageToPhone();
        }else if( e.key==="j" && e.altKey === true ){
            sendThisPageToPhone();
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
        const title = document.title;

        let req_url = `https://joinjoaomgcd.appspot.com/_ah/api/messaging/v1/sendPush?url=${url}&title=${title}&deviceId=${deviceId}&apikey=${apikey}`;
        console.log({req_url});
        fetch(req_url);
        last_key="";
        console.log("called send to join");
        notifyMe("called send to join");
    }

    window.sendToPhone = sendToPhone;
    window.sendThisPageToPhone = sendThisPageToPhone;

})();

function notifyMe(msg) {
    // Let's check if the browser supports notifications
    if (!("Notification" in window)) {
        alert("This browser does not support system notifications");
    }

    // Let's check whether notification permissions have already been granted
    else if (Notification.permission === "granted") {
        // If it's okay let's create a notification
        var notification = new Notification(msg);
    }

    // Otherwise, we need to ask the user for permission
    else if (Notification.permission !== 'denied') {
        Notification.requestPermission(function (permission) {
            // If the user accepts, let's create a notification
            if (permission === "granted") {
                var notification = new Notification("Hi there!");
            }
        });
    }

    // Finally, if the user has denied notifications and you
    // want to be respectful there is no need to bother them any more.
}
