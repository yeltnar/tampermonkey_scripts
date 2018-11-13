// ==UserScript==
// @name         copy emoji text
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://emojipedia.org/search/?q=*
// @grant        GM_setClipboard
// @grant        window.close
// ==/UserScript==

(function() {
    'use strict';

    let arr = document.querySelector(".search-results").querySelectorAll(".emoji");
    let parentEleList = [];

    console.log("arr.length is "+arr.length);
    for( let i=0; i<arr.length; i++){
        let ele = arr[i];
        ele.addEventListener("click",(e)=>{
            GM_setClipboard(e.srcElement.innerText);
            window.close();
            e.stopPropagation();
        });
        let parentEle = ele.parentElement;
        let grandparentEle = parentEle.parentElement;
        ele.classList.add("drew");

        let newEleText = parentEle.innerText.split(ele.innerText).join("");

        let newEle = document.createElement("a");
        newEle.classList.add("drew");
        newEle.innerText = newEleText;

        let number = document.createElement("span");
        ele.id = getNumberId( i+1 );
        number.innerText = i+1;

        parentEle.innerHTML = "";
        parentEle.appendChild(number);
        parentEle.appendChild(ele);
        parentEle.appendChild(newEle);

        parentEle.style.textDecoration = "none";
        newEle.setAttribute("href", parentEle.getAttribute("href") );
        parentEle.removeAttribute("href");
        parentEleList.push(parentEle);
    }

//    debugger;
    (()=>{
        let body = document.querySelector("body");
        body.style.width = "100%";
        body.innerHTML = "";
        body.style.display = "flex";
        body.style.flexWrap = "wrap";
        for(let i=0; i<parentEleList.length; i++){
            parentEleList[i].style.fontSize = "2rem";
            parentEleList[i].style.width = "25rem";
            parentEleList[i].style.height = "7rem";
            parentEleList[i].style.margin = "1rem";
            parentEleList[i].style.backgroundColor = "rgba(133,133,133,.3)";
            parentEleList[i].querySelector(".emoji").style.fontSize = "5rem";
            body.appendChild(parentEleList[i]);
        }
    })();

    window.addEventListener("emojiMessage", receiveEmojiMessage, false);

    function receiveEmojiMessage(event)
    {
        alert("got the message");
    }
})();


function getNumberId( num ){
    return "number"+num;
}

let number = "";

let keyAction = (e)=>{
    if( e.key>=0 ){
       number += e.key;
        console.log("number is "+number);
    }
    if( e.key==="Enter" ){
        console.log( "getNumberId(number) is "+getNumberId(number) );
        document.getElementById( getNumberId(number) ).click();
    }
};

window.addEventListener("keyup",keyAction);





