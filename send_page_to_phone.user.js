// ==UserScript==
// @name         send page to phone
// @namespace    http://tampermonkey.net/
// @version      0.2.18
// @description  send page to phone
// @author       You
// @match        http://*/*
// @match        https://*/*
// @match        chrome-extension://*/*
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_registerMenuCommand
// @require      https://raw.githubusercontent.com/yeltnar/tampermonkey_scripts/master/toast.notauser.js
// @require      https://raw.githubusercontent.com/yeltnar/tampermonkey_scripts/master/XMLHttpRequestPromise.notauser.js
// @require      https://raw.githubusercontent.com/yeltnar/tampermonkey_scripts/master/expressFirebase.notauser.js
// ==/UserScript==

let last_key="";
const {sendToPhone} = expressFirebase;
delete expressFirebase;

(()=>{
    'use strict';
  
    window.addEventListener("unload",()=>{sentToPhone(`unloaded ${window.location.href}`)});
  
    console.log("send page to phone added")
  
    window.addEventListener("keyup",keyAction);
    console.log("added send to join key listener");
    async function keyAction(e){
        last_key += e.key;
        if( e.key==="j" && e.altKey === true ){
            await sendThisPageToPhone();
            last_key="";
        }else if( e.code==="KeyJ" && e.altKey === true ){
            await sendThisPageToPhone();
            last_key="";
        }
    }

    async function sendThisPageToPhone(){
        let url = window.location.href;
        url = fixForYoutube(url);
        url = encodeURIComponent(url);
        await sendToPhone(url)
        toast("Sent to phone", 1500, { backgroundColor: "pink" });
    }
  
    GM_registerMenuCommand("Send to Phone", sendThisPageToPhone);

    window.sendToPhone = sendToPhone;
    window.sendThisPageToPhone = sendThisPageToPhone;
  

})();

function fixForYoutube(url){
  
  if( /youtube\.com\/watch/.test(url) ){
    document.querySelector("video").pause();
    const cur_video_time = parseInt(document.querySelector("video").currentTime);
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

