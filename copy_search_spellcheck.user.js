// ==UserScript==
// @name         search engine spell checker
// @namespace    http://tampermonkey.net/
// @version      1.3
// @description  copy search engine text recommendation
// @author       You
// @match        https://www.google.com/search*
// @match        https://www.startpage.com/*search*
// @match        https://www.startpage.com/sp/search
// @grant        GM_setClipboard
// @grant        GM_registerMenuCommand
// @grant        window.close
// ==/UserScript==

let key_event_list = [];

function keyAction(e){
  
    console.log("key pressed");
    console.log(e.key);
  
    key_event_list.unshift(e); // add to head
    
    console.log("key pressed after unshift");
  
    const match = matchDesiredKeys(key_event_list);
  
    if( match ){
        copySuggestion();
    }else if( e.code==="KeyS" && e.altKey === true ){
        copySuggestion();
    }
  
    console.log("key pressed after if/else");
    console.log(`match is ${match}`);
    console.log(`key_list is ${JSON.stringify(key_event_list)}`);
};

function matchDesiredKeys( key_event_list ){
  
  const recent_key_event = key_event_list[0];
  const last_key_event = key_event_list[1];
  
  let to_return = false;
  
  if( recent_key_event===undefined || last_key_event===undefined ){
     to_return = false;
  }else if( recent_key_event.key==="k" && last_key_event.key==="k" ){
     to_return = true;
  }else{
    key_event_list = [];
  }
  
  return to_return;
}

(function() {
    'use strict';

    try{
        // let text = document.querySelectorAll("a.spell")[0].innerText;
        window.addEventListener("keyup",keyAction);
    }catch(e){}

    console.log("search engine spell checker event added");
  
  
    GM_registerMenuCommand("copySuggestion",copySuggestion);

})();

function copySuggestion(){
  if( window.location.href.includes('google') ){
      let ele = recursiveBodyFind("Did you mean:");
      let txt;  
      if(ele===undefined||ele===-1||ele==="-1"){
        txt = new URLSearchParams(window.location.search).get("q");        
      }else{
        txt = ele.parentElement.querySelector("a").innerText;
      }
      console.log({txt});
      GM_setClipboard( txt );
      window.close();
  }
  if( window.location.href.includes('startpage') ){
      let ele = recursiveBodyFind("Did you mean:");
      let txt;
      if(ele===undefined||ele===-1||ele==="-1"){
        txt = document.querySelector('.dt-qi__word').innerText;
      }else{
        txt = ele.parentElement.querySelector("button").innerText;  
      }
      console.log({txt});
      GM_setClipboard( txt );
      window.close();
  }
}

function recursiveBodyFind(text, element) {

    element = element || document.body;
	let matched_children;

    if( element.children.length===0 ){
        return element;
    }else{
        matched_children = [...element.children].reduce((acc, cur) => {
            if (cur.innerText.includes(text)) {
                acc.push(cur)
            }
            return acc;
        }, []);
    }

    if (matched_children.length === 0) {
        console.log(`element is...`);
        console.log(element);
        return -1;
    } else if (matched_children.length !== 1) {
        console.warn(`matched_children.length is ${matched_children.length}`);
    }

    if (matched_children[0] === element) {
        debugger
    }

    return recursiveBodyFind(text, matched_children[0]);
}


