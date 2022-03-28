// ==UserScript==
// @name        fi redirect
// @namespace   Violentmonkey Scripts
// @match       https://accounts.google.com/AccountChooser*
// @grant       window.close
// @grant       GM_getValue
// @grant       GM_setValue
// @version     0.1
// @author      yeltnar
// @description 1/7/2022, 9:52:00 AM
// @require     https://github.com/yeltnar/tampermonkey_scripts/raw/master/timeoutPromise.notauser.js
// @require     https://raw.githubusercontent.com/yeltnar/tampermonkey_scripts/master/textEleSearch.notauser.js
// @run-at document-start
// ==/UserScript==

(async()=>{
  
  window.addEventListener('load', moveToFi);
                          
  async function moveToFi(event){
    console.log('page is fully loaded');
    const continue_qp = new URLSearchParams(window.location.search).get("continue");
    console.log(continue_qp);
    
    if(continue_qp==="https://messages.google.com/web/u/0/postSignIn"){
      console.log('clicking on email');
      const fi_email = getFiEmail();
      console.log({fi_email});
      const email_ele = await textEleSearch(fi_email);
      console.log({fi_email,email_ele});
      email_ele.click();
    }
  }
                          
})();

function getFiEmail(){
  let fi_email = GM_getValue('fi_email');
  if (fi_email === undefined || fi_email === null) {
      fi_email = prompt("enter Google Fi Email");
      GM_setValue('fi_email', fi_email);
  }
  return fi_email;
}




