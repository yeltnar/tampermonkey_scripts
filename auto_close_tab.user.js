// ==UserScript==
// @name         auto close tab
// @namespace    http://tampermonkey.net/
// @version      0.1.2
// @description  try to take over the world!
// @author       You
// @match        https://duckduckgo.com/*
// @match        https://google.com/*
// @match        https://www.google.com/*
// @exclude      https://www.google.com/maps*
// @grant        window.close
// ==/UserScript==

(()=>{
	const load = document.createElement("div");
//	load.innerHTML = "test";
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
    load_bar.style.width = "0%";
    load_bar.style.height = "100%";
	load_bar.style.backgroundColor="pink";
	load_bar.style.position="relitive";
	load_bar.style.left="0px";
	load_bar.style.top="0px";

    const interval = setInterval(()=>{
        const now = new Date();

        const time_diff = now-start;

        const new_width = time_diff/load_time*100;
        load_bar.style.width = `${new_width}%`;
        if(new_width>=100){
            clearInterval(interval);
            closeTab();
        }
    },100)

    load_bar.onclick = ()=>{
        clearInterval(interval);
        console.log("stopped auto close");
        load.parentElement.removeChild(load);
    };

    function closeTab(){
        window.close();
    }

    load.appendChild(load_bar);

	document.querySelector("body").appendChild(load);

	console.log(document.querySelector("[findme=drew]"));
})()
