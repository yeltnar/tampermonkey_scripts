// ==UserScript==
// @name        move to youtube transcript
// @namespace   andbrant
// @match       https://www.youtube.com/watch
// @match       https://www.youtube.com/watch?v=9xn0OHEZZ8Q
// @run-at document-end // document-start // document-idle
// @grant        GM_registerMenuCommand
// @version     0.1
// @author      -
// @dont-require     https://github.com/yeltnar/tampermonkey_scripts/raw/master/timeoutPromise.notauser.js
// @dont-require     https://github.com/yeltnar/tampermonkey_scripts/raw/master/textEleSearch.notauser.js
// @description 7/3/2024, 9:32:35 AM
// ==/UserScript==

(()=>{
  GM_registerMenuCommand("Move to YouTube Transcript",moveToYoutubeTranscript);
})();

function moveToYoutubeTranscript(){
  const video_id = new URLSearchParams(window.location.search).get("v");
  const new_url = `https://youtubetranscript.com/?v=${video_id}`;
  movePage(new_url)
};

async function movePage(new_url){
  window.location.href=new_url;
}

