// ==UserScript==
// @name         open duck in google
// @namespace    http://tampermonkey.net/
// @version      0.1.1
// @description  open duck duck go search in google
// @author       You
// @match        https://duckduckgo.com/?q=*
// @grant        window.close
// ==/UserScript==

let key ="";

let keyAction = (e)=>{
    key += e.key;
    if( key==="gg" ){
        let txt = document.querySelectorAll("#search_form_input")[0].innerText;

        const href = window.location.href;
        const split_str = "?q=";
        const q = split_str+href.split(split_str)[1]
        open("https://google.com/search"+q);

        window.close();
    }else if( key==="g" ){

    }else{
        key =""
    }
    console.log("key pressed");
    console.log(key);
    console.log(e.key);
};

(function() {
    'use strict';

    try{
        // let text = document.querySelectorAll("a.spell")[0].innerText;
        window.addEventListener("keyup",keyAction);
    }catch(e){
        console.error('error');
        console.error(e);
    }

    console.log("kk");

})();

