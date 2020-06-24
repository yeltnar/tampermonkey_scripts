// ==UserScript==
// @name        IBM login check
// @namespace   Violentmonkey Scripts
// @match       *://*.na.collabserv.com/*
// @grant       none
// @version     1.0
// @author      -
// @description 6/24/2020, 9:53:19 AM
// 
// @grant GM.xmlHttpRequest
// ==/UserScript==


async function alwaysRun(){
  
  const details = {
    url:"https://apps.na.collabserv.com/profiles/photo.do"
  };
  
  console.log(`about to do request for login check`);
  
  const resp_status_code = await networkPromise(details).then(resp=>resp.status);

  console.log(`resp_status_code is ${resp_status_code} ${new Date().toString()}`);
  
  if( resp_status_code===401 ){
    alert("need to refresh verse");
  }
  
}

(()=>{
  
  alwaysRun();
  
  setInterval(alwaysRun, 60*1000);
  
})();


// allow CORS
function networkPromise(details){
  return new Promise((resolve, reject)=>{
    GM.xmlHttpRequest({
      method: "GET",
      ...details,
      onload: function(response) {
        resolve(response);
      }
    });
  });
}
