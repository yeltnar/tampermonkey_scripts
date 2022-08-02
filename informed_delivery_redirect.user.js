// ==UserScript==
// @name        informed delivery redirect
// @namespace   andbrant
// @match       https://informeddelivery.usps.com/box/pages/secure/packageDashboardAction?selectedTrckNum.*
// @match       https://*/*
// @grant       GM_openInTab
// @run-at      document-start // document-idle
// @version     0.1
// @author      -
// @dont-require     https://github.com/yeltnar/tampermonkey_scripts/raw/master/timeoutPromise.notauser.js
// @dont-require     https://github.com/yeltnar/tampermonkey_scripts/raw/master/textEleSearch.notauser.js
// @description 8/1/2022, 1:21:18 PM
// ==/UserScript==


(()=>{
  
  const x = /https:\/\/informeddelivery.usps.com\/box\/pages\/secure\/packageDashboardAction?selectedTrckNum(.*)/.test(document.location.href); 
  
  const appURL = new URLSearchParams(window.location.search);
  const appURLValue = appURL.get('appURL');
  
  console.log({appURL,appURLValue});
  
  const selectedTrckNum = new URLSearchParams(appURLValue);
  const to_find = 'selectedTrckNum';
  const myParam2 = selectedTrckNum.get(to_find);
  
  console.log(appURLValue.split(to_find));
  
  console.log({appURLValue,myParam2,selectedTrckNum});
  
  const it = selectedTrckNum.entries();
  
  let v = it.next();
  console.log( selectedTrckNum.get( v.value[0] ) );
  const tracking = selectedTrckNum.get( v.value[0] );
  
  movePage(`https://tools.usps.com/go/TrackConfirmAction?tRef=fullpage&tLc=2&text28777=&tLabels=${tracking}`); 
  
})();


async function movePage(new_url){
  // window.location.href = new_url;
  if(GM_info.platform.os==="android"){ // don't have containers or auto open in new containers on mobile 
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
