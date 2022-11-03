// ==UserScript==
// @name        no stackoverflow trending prompt
// @namespace   andbrant
// @match       https://stackoverflow.com/*
// @match       https://serverfault.com/*
// @match       https://*.stackexchange.com/*
// @match       https://superuser.com/*
// @match       https://askubuntu.com/*
// @grant       none
// @version     0.1
// @author      -
// @require     https://github.com/yeltnar/tampermonkey_scripts/raw/master/timeoutPromise.notauser.js
// @require     https://github.com/yeltnar/tampermonkey_scripts/raw/master/textEleSearch.notauser.js
// @require     https://github.com/yeltnar/tampermonkey_scripts/raw/master/getCousinEle.notauser.js
// @nv run-at      document-idle
// @description 3/30/2021, 1:04:55 PM
// ==/UserScript==

(async()=>{
  
  let trending_sort;
  let loop_count=0;
  
  while(trending_sort===undefined && loop_count<10){
    trending_sort = await textEleSearch("Introducing: Trending sort");
    await timeoutPromise(100);
    console.log("loop");
    loop_count++;
  }
 
  console.log(trending_sort);
  
  let cousin = await getCousinEle({tester:"Dismiss",ele:trending_sort})
  
  console.log(cousin);
  cousin.click();
  
})();
