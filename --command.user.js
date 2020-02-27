// ==UserScript==
// @name         --command
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://duckduckgo.com/*
// @match        https://google.com/*
// @grant        window.close
// @run-at document-start
// ==/UserScript==

(function() {
    'use strict';

    let q = getQValue();

    if( /^--emoji/.test(q) ){

        q=q.split("--emoji+").join("");
        console.log(q);

        window.open(`https://emojipedia.org/search/?q=${q}`);

        window.close();

        debugger;

        // Your code here...
    }
})();

function getQValue(){

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

        if(cur.key === "q"){
            acc = cur.value
        }
        return acc;
    }, undefined);

    return q;
}
