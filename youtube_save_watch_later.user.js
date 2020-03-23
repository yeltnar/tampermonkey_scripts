// ==UserScript==
// @name        youtube_save_watch_later
// @namespace   Violentmonkey Scripts
// @match       https://www.youtube.com/watch
// @grant       none
// @version     0.1.0
// @author      -
// @run-at      document-idle
// @description 3/23/2020, 3:18:31 PM
// 
// ==/UserScript==

;(async ()=>{
  
  const save_watch_later = getQValue("save_watch_later");
  
  await timeoutPromise(2000);

  if( save_watch_later!=="true" ){
      return;
  }

  const watch_later_button = document.querySelector("ytd-button-renderer.ytd-menu-renderer:nth-child(4) > a:nth-child(1) > yt-icon-button:nth-child(1) > button:nth-child(1)");
  watch_later_button.click();
  
  await timeoutPromise(1000);

  const save_watch_later_check = document.querySelector('[aria-label="Watch later Private"]').parentElement.parentElement.parentElement.parentElement.querySelector("#checkboxContainer");
  if( !save_watch_later_check.querySelector("#checkbox").classList.contains("checked") ){
    save_watch_later_check.click();
  }

  await timeoutPromise(1000);

  document.querySelector("yt-icon.ytd-add-to-playlist-renderer").click()
    
})();

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

function timeoutPromise(ms){
  
  return new Promise((resolve, reject)=>{
    setTimeout(resolve,ms);
  });
  
}
