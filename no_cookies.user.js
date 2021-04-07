// ==UserScript==
// @name        no cookies
// @namespace   andbrant
// @match       https://stackoverflow.com/*
// @match       https://serverfault.com/*
// @match       https://*.stackexchange.com/*
// @match       https://superuser.com/*
// @grant       none
// @version     0.4
// @author      -
// @require     https://github.com/yeltnar/tampermonkey_scripts/raw/master/timeoutPromise.notauser.js
// @require     https://github.com/yeltnar/tampermonkey_scripts/raw/master/textEleSearch.notauser.js
// @require     https://github.com/yeltnar/tampermonkey_scripts/raw/master/getCousinEle.notauser.js
// @nv run-at      document-idle
// @description 3/30/2021, 1:04:55 PM
// ==/UserScript==


(async()=>{
  
  let customize_cookie_button;
  let loop_count=0;
  
  while(customize_cookie_button===undefined && loop_count<10){
    customize_cookie_button = await textEleSearch("Customize settings");
    await timeoutPromise(100);
    console.log("loop");
    loop_count++;
  }
 
  console.log({customize_cookie_button});
  
  if(customize_cookie_button!==undefined){
    customize_cookie_button.click();
    
    const confirm_button = await waitOnElement("Confirm my choices");
  
    [...document.querySelector('#modal-description').querySelectorAll("input")].forEach((cur)=>{
      cur.checked=false;
      console.log(cur.checked,cur);
    });

    
    confirm_button.click();
  }
  
})()
