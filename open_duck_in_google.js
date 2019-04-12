// ==UserScript==
// @name         open duck in google gg
// @namespace    http://tampermonkey.net/
// @version      0.1.4
// @description  open duck duck go search in google
// @author       You
// @match        https://duckduckgo.com/?q=*
// @grant        window.close
// @run-at document-start
// ==/UserScript==

let key ="";

const special_key = "g";
const number_of_prefrences = 2;
let long_special_key;

(()=>{
    const arr = [];
    for(let i=0; i<number_of_prefrences; i++){
        arr.push(special_key);
    }
    long_special_key = arr.join("");
})();

let keyAction = (e)=>{
    key += e.key;
    if( key===long_special_key ){
        pullAndMoveToGoogle();
    }else if( key===special_key ){

    }else{
        key =""
    }
    console.log("key pressed");
    console.log(key);
    console.log(e.key);
};

function pullAndMoveToGoogle(){
    let q = getQValue();
    moveToGoogle( q );
}

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

function moveToGoogle( q ){
    let google_link = "https://google.com/search?q="+q;
    open(google_link);
    window.close();
}

function testAutoMoveToGoogle(){

    const regex_arr = [/^google%3A/, /^g%3A/];

    function testSingleAutoMoveToGoogle( regex ){
        if( regex.test(q) ){
            q = q.split(regex).join("");
            moveToGoogle(q);
        }
    }
    
    regex_arr.forEach((cur)=>{
        testSingleAutoMoveToGoogle( cur )
    });
}

(function() {
    'use strict';

    testAutoMoveToGoogle();

    try{
        // let text = document.querySelectorAll("a.spell")[0].innerText;
        window.addEventListener("keyup",keyAction);
    }catch(e){
        console.error('error');
        console.error(e);
    }

    console.log("kk");

})();

