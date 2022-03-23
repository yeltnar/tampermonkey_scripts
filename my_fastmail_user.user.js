// ==UserScript==
// @name        move to my fastmail user
// @namespace   andbrant
// @match       https://www.fastmail.com/login*
// @match       https://www.fastmail.com/*
// @grant       GM_getValue
// @grant       GM_setValue
// @version     1.0
// @author      -
// @dont-require     https://github.com/yeltnar/tampermonkey_scripts/raw/master/timeoutPromise.notauser.js
// @dont-require     https://github.com/yeltnar/tampermonkey_scripts/raw/master/textEleSearch.notauser.js
// @description 3/23/2022, 11:00:42 AM
// ==/UserScript==

(()=>{
  
  const stored_user = GM_getValue("u");
  const qp_user = new URLSearchParams(window.location.search).get("u");
  
  console.log('0',{qp_user,stored_user})
  
  if( qp_user !== undefined && qp_user !== null ){
    console.log('Updating fastmail user to ${qp_user}');
    GM_setValue("u",qp_user);
  }else if( stored_user !== undefined && /login/.test(window.location.href) ){ // if have a stored user, and its not in the URL 
    console.log('moving to stored user ${stored_user}');
    window.location.href = `https://www.fastmail.com/mail/Inbox?u=${stored_user}`;
  }
  
})();
