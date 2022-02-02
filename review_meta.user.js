// ==UserScript==
// @name       reviewmeta.com
// @namespace   andbrant
// @match       https://reviewmeta.com/amazon/B07PV8ZN1X
// @match       https://reviewmeta.com/amazon/.*
// @dontmatch       https://.*\.amazon.com/*
// @match       https://www.amazon.com/*
// @grant       none
// @version     0.1
// @author      -
// @require     https://github.com/yeltnar/tampermonkey_scripts/raw/master/timeoutPromise.notauser.js
// @require     https://github.com/yeltnar/tampermonkey_scripts/raw/master/textEleSearch.notauser.js
// @grant        GM_registerMenuCommand
// @description 2/1/2022, 10:55:05 PM
// ==/UserScript==


(()=>{
  'use strict';
  
  console.log("reviewmeta drew");
  
  const moveToReviewMeta=()=>{
    let product = /\/(([A-Z]|[0-9]){10})/.exec(window.location.href)[1];
    console.log(product);
    window.location.href=`https://reviewmeta.com/amazon/${product}`;
  }
  
  console.log("reviewmeta drew 1.1");
  
  if(/https:\/\/reviewmeta.com\/amazon\/.*/.test(window.location.href)){
    (async function(){

      let button_result;
      const start_time=new Date();

      // I know this, I assumed you would need multiple loads to get the button to show up, but I guess not
      const interval_id = setTimeout(async()=>{
        const button_text = "I understand and agree";
        const e = await textEleSearch(button_text);
        console.log({"button result is":e});

        if(e!=undefined){
          e.click();
          clearInterval(interval_id);
          console.log(`I closed the annoying popup`);
        }

        const time_delta=new Date()-start_time;
        if(time_delta>500){
          clearInterval(interval_id);
        }

      },0);

    })();
  }
    
  console.log("reviewmeta drew 2");
  
  GM_registerMenuCommand("moveToReviewMeta", moveToReviewMeta);
})();
