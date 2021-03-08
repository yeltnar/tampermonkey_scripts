// ==UserScript==
// @name        search redirect
// @namespace   Violentmonkey Scripts
// @match       https://www.startpage.com/do/dsearch
// @match       https://www.google.com/search
// @grant       window.close
// @grant       GM_openInTab
// @version     0.13
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
    {
      regex:/ ?firefox ?store ?/,
      url:`https://addons.mozilla.org/en-US/firefox/`
    },
    {
      regex:/ ?chrome ?store ?/,
      url:`https://chrome.google.com/webstore/category/extensions`
    },
    {
      regex:/^(wolfram ?alpha|wa)\W?(.*)/,
      funct:wolframAlpha
    },
    {
      regex:/^(google|gg)\W?(.*)/,
      funct:googleRedirect
    },
    {
      regex:/^(giphy)\W?(.*)/,
      funct:giphyRedirect
    },
    {
      regex:/^(emoji)\W?(.*)/,
      funct:emojipediaRedirect
    },
    {
      regex:/^(maps)\W?(.*)/,
      funct:mapsRedirect
    },
    {
      regex:/^(amazon|az)\W?(.*)/,
      funct:amazonRedirect
    },
    {
      regex:/ ?gh ?/,
      url:`https://github.com/`
    },
    
    
  ];
  
  redirect_list.forEach((cur)=>{
    if(checkAction(cur.regex)){
      if(cur.funct!==undefined){
        cur.funct(cur.regex);
      }else{
        movePage(cur.url)
      }
    }
  });

  function checkAction(regex){
    return regex.test(query);
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

function movePage(new_url){
  // window.location.href = new_url;
  GM_openInTab(new_url,{insert:true});
  closeOldUrl(new_url);
}

function closeOldUrl(new_url){
  const interval = setInterval(()=>{
      if(new_url!==window.location.href){
        clearInterval(interval);
        window.close();
      }
    },100); 
}

function googleRedirect(regex){
  const q=getQuery(window.location.href);
  const s=regex.exec(q)[2];
  movePage(`https://www.google.com/search?q=${s}`)
}

function wolframAlpha(regex){
  const q=getQuery(window.location.href);
  const s=regex.exec(q)[2];
  movePage(`https://www.wolframalpha.com/input/?i=${s}`)
}

function emojipediaRedirect(regex){
  const q=getQuery(window.location.href);
  const s=regex.exec(q)[2];
  movePage(`https://emojipedia.org/search/?q=${s}`)
}

function mapsRedirect(regex){
  const q=getQuery(window.location.href);
  const s=regex.exec(q)[2];
  movePage(`https://www.google.com/maps/search/${s}`)
}

function amazonRedirect(regex){
  const q=getQuery(window.location.href);
  const s=regex.exec(q)[2];
  movePage(`https://www.amazon.com/s?k=${s}`)
}

function giphyRedirect(regex){
  const q=getQuery(window.location.href);
  const s=regex.exec(q)[2];
  movePage(`https://giphy.com/search/${s}`)
}
