// ==UserScript==
// @name         copy emoji text
// @namespace    http://tampermonkey.net/
// @version      0.5
// @description  try to take over the world!
// @author       You
// @match        https://emojipedia.org/search/?q=*
// @match        https://emojipedia.org/search?q=*
// @grant        GM_setClipboard
// @grant        window.close
// ==/UserScript==

(async function() {
    'use strict';

    // let arr  = document.querySelector(".search-results").querySelectorAll(".emoji");
    let _arr = [...document.querySelector(".EmojisList_emojis-list-wrapper__A8gKQ").querySelectorAll("span")];
    let arr = _arr.map((cur)=>{
        const name = cur.innerText;
        const parent_txt = cur.parentElement.innerText;
        const to_return = parent_txt.split(name).join("");
        return {
          emoji:to_return.replaceAll(/[\x00-\x7F]/g, ''), 
          name
        };
    });

    let parentEleList = [];

    console.log("arr.length is "+arr.length);
    for( let i=0; i<arr.length; i++){

        let wrapper_ele = document.createElement('span');
        wrapper_ele.addEventListener("click",(e)=>{
            GM_setClipboard(arr[i].emoji);
            window.close();
            e.stopPropagation();
        });
        wrapper_ele.id=getNumberId(i+1)

        let number_ele = document.createElement('span');
        number_ele.innerText = i+1;
        wrapper_ele.appendChild(number_ele);

        wrapper_ele.appendChild(document.createElement('br'));

        let emoji_ele = document.createElement('span');
        // let emoji_ele = document.createTextNode(arr[i].emoji);
        emoji_ele.innerText = arr[i].emoji;
        emoji_ele.style.fontSize = "5rem";
        wrapper_ele.appendChild(emoji_ele);

        wrapper_ele.appendChild(document.createElement('br'));

        let test_ele = document.createElement('span');
        test_ele.innerText = arr[i].name;
        wrapper_ele.appendChild(test_ele);

        parentEleList.push(wrapper_ele);
    }

   // debugger;
    (()=>{
        let body = document.querySelector("body");
        body.style.width = "100%";
        body.innerHTML = "";
        body.style.display = "flex";
        body.style.flexWrap = "wrap";
        for(let i=0; i<parentEleList.length; i++){
            parentEleList[i].style.fontSize = "2rem";
            parentEleList[i].style.width = "25rem";
            // parentEleList[i].style.height = "7rem";
            parentEleList[i].style.margin = "1rem";
            parentEleList[i].style.backgroundColor = "rgba(133,133,133,.3)";
            // parentEleList[i].style.fontSize = "5rem";
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






