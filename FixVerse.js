// ==UserScript==
// @name         Fix Verse
// @namespace    http://tampermonkey.net/
// @version      0.1.6
// @description  reload verse if it is not populated
// @author       You
// @match        https://mail.notes.na.collabserv.com/*
// @grant        none
// ==/UserScript==

(()=>{

    let div=document.createElement("div");
    div.innerText = "😀";
    
    if( document.querySelector("body").children.length === 0 ){
        fixUrl();
    }

    if( document.querySelector(".ics-scbanner") ){
        document.querySelector(".ics-scbanner").appendChild(div);
    }

   let bodyHtml = document.querySelector("body").innerHTML;
   if(bodyHtml===" "||bodyHtml===""){
      fixUrl();
   }

})/*()*/;

(()=>{
	const og_title = document.title;

	setInterval(()=>{
		document.title = `${og_title} ${new Date().toLocaleString('en-US',{timeStyle:'short'})}`
	}, 1000);

})();

function fixUrl(){
    window.location.href="https://mail.notes.na.collabserv.com/verse?";
}
