// ==UserScript==
// @name        search redirect
// @namespace   Violentmonkey Scripts
// @match       https://www.startpage.com/do/dsearch
// @match       https://www.startpage.com/do/search
// @match       https://www.startpage.com/sp/search
// @match       https://www.google.com/search
// @match       https://duckduckgo.com/?*
// @grant       window.close
// @grant       GM_openInTab
// @version     0.29
// @author      yeltnar
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
      regex:/^(wolfram ?alpha|wa) (.*)/,
      funct:wolframAlpha
    },
    {
      regex:/^(google|gg) (.*)/,
      funct:googleRedirect
    },
    {
      regex:/^(duckduckgo|ddg) (.*)/,
      funct:duckduckgoRedirect
    },
    {
      regex:/^(startpage|sp) (.*)/,
      funct:startpageRedirect
    },
    {
      regex:/^(giphy) (.*)/,
      funct:giphyRedirect
    },
    {
      regex:/^(emoji) (.*)/,
      funct:emojipediaRedirect
    },
    {
      regex:/^(maps) (.*)/,
      funct:mapsRedirect
    },
    {
      regex:/^(amazon|az) (.*)/,
      funct:amazonRedirect
    },
    {
      regex:/\bgh\b/,
      url:`https://github.com/`
    },
    {
      regex:/^(spotify) (.*)/,
      funct:spotifyRedirect
    },
    {
      regex:/^(youtube|yt) (.*)/,
      funct:youtubeRedirect
    },
    {
      regex:/^(ytdl) (.*)/,
      funct:youtubeDownload
    },
    {
      regex:/^(sn|soapnote) (.*)/,
      funct:sopanoteRedirect
    },
    {
      regex:/^toast$/,
      url:`https://raw.githubusercontent.com/yeltnar/tampermonkey_scripts/master/toast.notauser.js`
    },
    {
      regex:/^promiseTimeout$/,
      url:`https://raw.githubusercontent.com/yeltnar/tampermonkey_scripts/master/toast.notauser.js`
    },
    {
      regex:/^tmscripts/,
      url:`https://github.com/yeltnar/tampermonkey_scripts/`
    },
    {
      regex: /^imdb (.*)/,
      funct:imbdRedirect
    },
    {
      regex: /^r\/[^\W]*$/,
      funct:lazyReddit
    },
    {
      regex:/^(fdroid) (.*)/,
      funct:fdroidRedirect
    },
  ];
  
  redirect_list.forEach((cur)=>{
    if(checkAction(cur.regex)){
      if(cur.funct!==undefined){
        cur.funct(cur.regex, );
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
  }else if(/duckduckgo.com/.test(url)){
    console.log("on duckduckgo page");
    return new URLSearchParams(window.location.search).get("q");
  }else{
    console.log("unknown page "+url);
    return "";
  }
}

async function movePage(new_url){
  // window.location.href = new_url;
  if(GM_info.platform.os==="android"){ // don't have containers or auto open in new containers on mobile 
    window.location.href=new_url;
  }else{
    GM_openInTab(new_url,{insert:true});
    closeOldUrl(new_url);
  }
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
  movePage(`https://www.google.com/search?q=${encodeURIComponent(s)}`)
}

function duckduckgoRedirect(regex){
  const q=getQuery(window.location.href);
  const s=regex.exec(q)[2];
  movePage(`https://www.duckduckgo.com/?q=${encodeURIComponent(s)}`)
}

function startpageRedirect(regex){
  const q=getQuery(window.location.href);
  const s=regex.exec(q)[2];
  movePage(`https://www.startpage.com/do/dsearch?query=${encodeURIComponent(s)}`);
}

function wolframAlpha(regex){
  const q=getQuery(window.location.href);
  const s=regex.exec(q)[2];
  // alert(`${s} ${encodeURIComponent(s)}`);
  movePage(`https://www.wolframalpha.com/input/?i=${encodeURIComponent(s)}`)
}

function emojipediaRedirect(regex){
  const q=getQuery(window.location.href);
  const s=regex.exec(q)[2];
  movePage(`https://emojipedia.org/search/?q=${encodeURIComponent(s)}`)
}

function mapsRedirect(regex){
  const q=getQuery(window.location.href);
  const s=regex.exec(q)[2];
  movePage(`https://www.google.com/maps/search/${encodeURIComponent(s)}`)
}

function amazonRedirect(regex){
  const q=getQuery(window.location.href);
  const s=regex.exec(q)[2];
  movePage(`https://www.amazon.com/s?k=${encodeURIComponent(s)}`)
}

function giphyRedirect(regex){
  const q=getQuery(window.location.href);
  const s=regex.exec(q)[2];
  movePage(`https://giphy.com/search/${encodeURIComponent(s)}`);
}

function spotifyRedirect(regex){
  const q=getQuery(window.location.href);
  const s=regex.exec(q)[2];
  movePage(`https://open.spotify.com/search/${encodeURIComponent(s)}`)
}

function youtubeRedirect(regex){
  const q=getQuery(window.location.href);
  const s=regex.exec(q)[2];
  if(s===""){
    movePage(`https://www.youtube.com`);
  }else{
    movePage(`https://www.youtube.com/results?search_query=${encodeURIComponent(s)}`);    
  }
}

function sopanoteRedirect(regex){
  const q=getQuery(window.location.href);
  const s=regex.exec(q)[2];
  movePage(`https://yeltnar.github.io/soapnote/#${encodeURIComponent(s)}`);
}

function imbdRedirect(regex){
  const q=getQuery(window.location.href);
  const s=regex.exec(q)[1];
  // debugger;
  // alert(s);
  movePage(`https://www.imdb.com/find?q=${encodeURIComponent(s)}`);
}

function lazyReddit(regex){
  const q=getQuery(window.location.href);
  const s=regex.exec(q)[0];
  console.log(`found reddit page ${s}`);
  movePage(`https://reddit.com/${s}`);
}

function youtubeDownload(regex){
  const q=getQuery(window.location.href);
  const s=regex.exec(q)[2];
  console.log(`loading ${s} with alltubedownload`);  
  movePage(`https://www.alltubedownload.net/info?url=${encodeURIComponent(s)}`);
}

function fdroidRedirect(regex){
  const q=getQuery(window.location.href);
  const s=regex.exec(q)[2];
  console.log(`loading ${s} with fdroidRedirect`);  
  movePage(`https://search.f-droid.org/?q=${encodeURIComponent(s)}&lang=en`);
}








