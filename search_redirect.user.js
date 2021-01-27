// ==UserScript==
// @name        search redirect
// @namespace   Violentmonkey Scripts
// @match       https://www.startpage.com/do/dsearch
// @grant       window.close
// @version     0.4
// @author      -
// @description 1/7/2021, 9:52:00 AM
// @run-at document-start
// ==/UserScript==

(()=>{
  
  const query = getQuery();
  console.log(`query is ${query}`);
  
  const redirect_list = [
    {
      regex:/ ?fi ?sms ?/,
      url:`https://accounts.google.com/AccountChooser/signinchooser?continue=https%3A%2F%2Fmessages.google.com%2Fweb%2Fu%2F0%2FpostSignIn&flowName=GlifWebSignIn&flowEntry=AccountChooser`
    },
    {
      regex:/ ?css ?flex ?/,
      url:`https://css-tricks.com/snippets/css/a-guide-to-flexbox/`
    },
    {
      regex:/ ?css ?grid(layout)? ?/,
      url:`https://css-tricks.com/snippets/css/complete-guide-grid/`
    },
  ];
  
  redirect_list.forEach((cur)=>{
    if(checkAction(cur.regex)){
      movePage(cur.url)
    }
  });

  function checkAction(regex){
    return regex.test(query);
  }

  function movePage(new_url){
    window.location.href = new_url;

    const interval = setInterval(()=>{
      if(new_url!==window.location.href){
        clearInterval(interval);
        window.close();
      }
    },100); 
  }

})();

function getQuery(url=window.location.href){
  if(/google.com/.test(url)){
    console.log("on google page");
    return new URLSearchParams(window.location.search).get("q");
  }else if(/startpage.com/.test(url)){
    console.log("on startpage page");
    return new URLSearchParams(window.location.search).get("query");
  }else{
    console.log("unknown page "+url);
    return "";
  }
}

