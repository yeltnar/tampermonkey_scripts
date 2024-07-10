// ==UserScript==
// @name        move from youtube  
// @namespace   andbrant
// @match       https://www.youtube.com/watch*
// @grant       GM_registerMenuCommand
// @grant       GM_openInTab
// @version     0.3
// @author      -
// @dont-require     https://github.com/yeltnar/tampermonkey_scripts/raw/master/timeoutPromise.notauser.js
// @dont-require     https://github.com/yeltnar/tampermonkey_scripts/raw/master/textEleSearch.notauser.js
// @description 5/29/2024, 9:27:27 AM
// ==/UserScript==

(()=>{
  'use strict';

  console.log("reviewmeta drew");

  function moveToYoutubeTranscript(){
    const video_id = new URLSearchParams(window.location.search).get("v");
    const new_url = `https://youtubetranscript.com/?v=${video_id}`;
    movePage(new_url)
  };

  GM_registerMenuCommand("moveToYoutubeTranscript", moveToYoutubeTranscript);
  GM_registerMenuCommand("Move to YouTube Transcript",moveToYoutubeTranscript);
})();

async function movePage(new_url){

//   if(url_loaded!==""){
//     GM_notification({title:'loading page twice', text:`old: ${url_loaded}, new: ${new_url}`});
//     throw new Error('second move; turn back on closeOldUrl');
//   }

//   if( !/^http/.test(new_url) ){
//     new_url = `https://${new_url}`;
//   }

//   url_loaded=new_url;

  // window.location.href = new_url;
  if(GM_info.platform.os==="android"){ // don't have containers or auto open in new containers on mobile
    window.location.href=new_url;
  }else if(GM_info.platform.os==="notgm"){ // work around for simple web page
    window.location.href=new_url;
  }else{
    // GM_openInTab(new_url,{insert:true});

    // const pg_obj = createPageLoadedListener(new_url);

    // new_url = pg_obj.new_url;

    const x = GM_openInTab(new_url,{active:true,insert:true});
    await timeoutPromise(2000);
    closeOldUrl(new_url);
  }
}

