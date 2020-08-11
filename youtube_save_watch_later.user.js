// ==UserScript==
// @name        youtube_save_watch_later
// @namespace   Violentmonkey Scripts
// @match       https://www.youtube.com/watch
// @grant       none
// @version     0.1.4
// @author      -
// @run-at      document-idle
// @description 3/23/2020, 3:18:31 PM
// @require https://raw.githubusercontent.com/yeltnar/tampermonkey_scripts/master/q_term.notauser.js
// @require https://raw.githubusercontent.com/yeltnar/tampermonkey_scripts/master/toast.notauser.js
// @require https://raw.githubusercontent.com/yeltnar/tampermonkey_scripts/master/timeoutPromise.notauser.js
// ==/UserScript==

;(async ()=>{
  console.log("adding youtube_save_watch_later");
  
  const save_watch_later = getQValue("save_watch_later");
  const youtube_save_watch_later = getQValue("youtube_save_watch_later");
  
  addKeyEvent(["KeyW"]);

  console.log({save_watch_later,youtube_save_watch_later});
  
  if( save_watch_later!=="true" && youtube_save_watch_later!=="true" ){
      return;
  }else{
    await saveWatchLater();
  }    
})();

function addKeyEvent(key_arr){
  key_arr.forEach((cur)=>{
    console.log(`add keybind for save watchlater ${cur}`)
    window.addEventListener("keydown", async(e)=>{
      if( cur===e.code && e.altKey  ){
        await saveWatchLater();
      }
    });  
  });
}

const saveWatchLater = (()=>{
  
  const pageLoadedDelayPromise = timeoutPromise(2000);
  
  async function saveWatchLater(){  
    toast("Saving to Watchlater", 5000);

    console.log("starting youtube_save_watch_later");
    
    await pageLoadedDelayPromise;

    const watch_later_button = document.querySelector("ytd-button-renderer.ytd-menu-renderer:nth-child(4) > a:nth-child(1) > yt-icon-button:nth-child(1) > button:nth-child(1)");
    watch_later_button.click();

    await timeoutPromise(1000);

    const save_watch_later_check = document.querySelector('[aria-label="Watch later Private"]').parentElement.parentElement.parentElement.parentElement.querySelector("#checkboxContainer");
    if( !save_watch_later_check.querySelector("#checkbox").classList.contains("checked") ){
      save_watch_later_check.click();
    }

    await timeoutPromise(1000);

    document.querySelector("yt-icon.ytd-add-to-playlist-renderer").click()
  } 
  
  return saveWatchLater;  
})();



