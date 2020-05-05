// ==UserScript==
// @name         send page to phone
// @namespace    http://tampermonkey.net/
// @version      0.2.13
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
        if( e.key==="j" && e.altKey === true ){
            sendThisPageToPhone();
        }else if( e.code==="KeyJ" && e.altKey === true ){
            sendThisPageToPhone();
        }
    }

    function sendThisPageToPhone(){
        let url = window.location.href;
        url = fixForYoutube(url);
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
    
    showToast(3000);
    return

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

function showToast(time){
  
	const load = document.createElement("div");
	load.setAttribute("findme", "drew");
	load.style.position="absolute";
	load.style.left="0px";
	load.style.top="0px";
	load.style.width="100%";
	load.style.zIndex=Number.MAX_SAFE_INTEGER;
  load.style.height="10px";

  const start = new Date();

  const load_time = 5*60*1000; // 5 min
  const load_bar = document.createElement("div");
  load_bar.style.width = "100%";
  load_bar.style.backgroundColor="green";
  load_bar.style.position="fixed";
  load_bar.style.left="0px";
  load_bar.style.top="0px";
  
  load_bar.innerHTML = "Sent to phone";
  load_bar.style.color="white";
  load_bar.style.textAlign="center";
  load_bar.style.fontSize="2rem";
  

  load.appendChild(load_bar);

	document.querySelector("body").appendChild(load);

	console.log(document.querySelector("[findme=drew]"));

	setTimeout(()=>{
		document.querySelector("body").removeChild(load);
	},time);
}

function fixForYoutube(url){
  
  if( /youtube\.com\/watch/.test(url) ){
    document.querySelector("video").pause();
    const cur_video_time = parseInt(document.querySelector("video").getCurrentTime());
    to_return = replaceQValue("t", cur_video_time+"s");
  }else{
    to_return = url;
  }
  
  return to_return;
  
}

function getQValue(q_term="q"){

    let search = window.location.search;

    search = search.split("?")[1];

    let search_arr = search.split("&");

    let q = search_arr.reduce((acc, cur)=>{

        if( acc!==undefined ){
            return acc;
        }

        const tmp = cur.split("=");
        cur = {
            key:tmp[0],
            value:tmp[1]
        }

        if(cur.key === q_term){
            acc = cur.value
        }
        return acc;
    }, undefined);

    return q;
}

function replaceQValue(q_term="q", replace_value=""){
  
    let search = window.location.search;

    const top_search_arr = search.split("?");
  
    console.log({top_search_arr})
  
    let url_start = top_search_arr[0];
    let search_result = top_search_arr[1];

    let search_arr = search_result.split("&");

    let query_obj = search_arr.reduce((acc,cur,i,arr)=>{

        const tmp = cur.split("=");
        // const to_return = {
        //     key:tmp[0],
        //     value:tmp[1]
        // }
        acc[tmp[0]] = tmp[1];
        return acc
      
    }, {});
  
    query_obj[q_term] = replace_value;
  
    console.log({query_obj});
  
    query_obj[q_term] = replace_value;

    const new_search = Object.keys(query_obj).reduce((acc,cur,i,arr)=>{

        // let {key,value} = cur;
        const key = cur;
        const value = query_obj[key];

        const ending_char = i+1 === arr.length ? "" : "&";

        return acc+`${key}=${value}${ending_char}`;


    },"?");
  
    const new_url = window.location.href.split(window.location.search)[0] + new_search;
    console.log({new_url});

    return new_url;
}

