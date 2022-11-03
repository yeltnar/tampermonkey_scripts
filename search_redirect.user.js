// ==UserScript==
// @name        search redirect
// @namespace   Violentmonkey Scripts
// @match       https://www.startpage.com/do/dsearch
// @match       https://www.startpage.com/do/search
// @match       https://www.startpage.com/sp/search
// @match       https://yeltnar.github.io/search/
// @match       https://www.google.com/search
// @match       https://duckduckgo.com/?*
// @match       https://www.youtube.com/*
// @match       https://www.wolframalpha.com/*
// @match       https://emojipedia.org/search/*
// @match       https://yeltnar.github.io/soapnote/*
// @match       https://mail.google.com/mail/*
// @match       https://www.google.com/maps/*
// @grant       window.close
// @grant       GM_openInTab
// @grant       GM_addValueChangeListener
// @grant       GM_removeValueChangeListener
// @grant       GM_setValue
// @version     0.39
// @author      yeltnar
// @description 1/7/2021, 9:52:00 AM
// @require     https://github.com/yeltnar/tampermonkey_scripts/raw/master/timeoutPromise.notauser.js
// @require     https://raw.githubusercontent.com/yeltnar/tampermonkey_scripts/master/textEleSearch.notauser.js
// @run-at document-start
// ==/UserScript==

function main(query){
  
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
      regex:/fastm/,
      url:`https://www.fastmail.com/`
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
      regex:/^(gh) (.*)/,
      funct: githubRedirect
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
    {
      regex:/^(apkmirror) (.*)/,
      funct:apkmirrorRedirect
    },
    {
      regex:/^(wikipedia|wiki) (.*)/,
      funct:wikipediaRedirect
    },
    {
      regex:/^(gmail) (.*)/,
      funct:gmailRedirect
    }, 
    {
      regex:/^(fastmail) (.*)/,
      funct:fastmailRedirect
    }, 
    {
      regex:/^(work) (.*)/,
      funct:workContainerRedirect
    }, 
    {
      regex:/()(.*)/,
      funct:defaultResult
    }, 
  ];
  
  let found_site=false;
  
  redirect_list.forEach((cur)=>{
    if(checkAction(cur.regex) && found_site!==true){
      if(cur.funct!==undefined){
        cur.funct(cur.regex, );
      }else{
        found_site=true;
        movePage(cur.url)
      }
    }
  });

  function checkAction(regex){
    return regex.test(query);
  }

}

(async()=>{
  
  // code for closing calling tab
  (()=>{
    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop),
    });
    // Get the value of "some_key" in eg "https://example.com/?some_key=some_value"
    const tab_event_id = params.tab_event_id;
    if( tab_event_id !== null ){


      // remove tab_event_id from the URL
      const params = new URLSearchParams(window.location.search)
      params.delete('tab_event_id')
      const new_search = params.toString();
      if( window.location.search !== new_search ){
        window.location.search = new_search;
      }

      // let the previous tab know it can close
      window.addEventListener('DOMContentLoaded',async()=>{
        // alert(`loaded '${tab_event_id}'`);
        GM_setValue(tab_event_id,"DOMContentLoaded");
      }); 
    }
  })();

  const query = getQuery();
  console.log(`query is ${query}`);
  
  main(query);
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
  }else if(/yeltnarsearch/.test(url)){
    console.log("on yeltnarsearch page");
    return new URLSearchParams(window.location.search).get("q");
    // https://yeltnar.github.io/search/?yeltnarsearch&q=asdf
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
    // GM_openInTab(new_url,{insert:true});

    const pg_obj = createPageLoadedListener(new_url);
    
    new_url = pg_obj.new_url;

    const x = GM_openInTab(new_url,{active:true,insert:true});
    await timeoutPromise(2000);
    closeOldUrl(new_url);
  }
}

function createPageLoadedListener(url){
  const tab_event_id = parseInt(Math.random()*Math.pow(10,16))+"";
  GM_addValueChangeListener(tab_event_id, (name, oldVal, newVal, remote)=>{
    console.log(`${tab_event_id} value changed ${oldVal} ${newVal} ${remote}`);
    window.close();
    GM_removeValueChangeListener(change_id);
    
  });

  const spacer = url.includes("?") ? "&" : "?";

  const new_url_0 = url+spacer+"tab_event_id="+tab_event_id;
  
  let new_url = url.split("#");
  new_url[0] = new_url[0]+spacer+"tab_event_id="+tab_event_id;
  new_url = new_url.join("#");
  // alert(JSON.stringify({new_url_0,a:new_url_0.join("#")}));
  // new_url_0 = new_url_0.join("#");

  return {tab_event_id, new_url};
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

function githubRedirect(regex){
  const q=getQuery(window.location.href);
  const s=regex.exec(q)[2];
  console.log(`loading ${s} with githubRedirect`);  
  
  if(s==="me searchredirect"){
    return movePage(`https://github.com/yeltnar/tampermonkey_scripts/blob/master/search_redirect.user.js`);
  }else if(s==="me"){
    return movePage(`https://github.com/yeltnar/`);
  }
  
  return movePage(`https://github.com/`);
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
  }else if( s==="wl" || s==="watchlater" ){
    movePage(`https://www.youtube.com/playlist?list=WL`);
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

function apkmirrorRedirect(regex){
  const q=getQuery(window.location.href);
  const s=regex.exec(q)[2];
  console.log(`loading ${s} with apkmirrorRedirect`);  
  movePage(`https://www.apkmirror.com/?searchtype=apk&s=${encodeURIComponent(s)}`);
}
function wikipediaRedirect(regex){
  const q=getQuery(window.location.href);
  const s=regex.exec(q)[2];
  console.log(`loading ${s} with wikipediaRedirect`);  
  movePage(`https://en.wikipedia.org/?search=${encodeURIComponent(s)}`)
}
function gmailRedirect(regex){
  const q=getQuery(window.location.href);
  const s=regex.exec(q)[2];
  // 
  console.log(`loading ${s} with gmailRedirect`);
  if(s==="compose"){
    movePage(`https://mail.google.com/mail/u/0/?pli=1#inbox?compose=new`);
  }else{
    movePage(`https://mail.google.com/mail/u/0/?pli=1#search/${encodeURIComponent(s)}`);    
  }
}
function fastmailRedirect(regex){
  const q=getQuery(window.location.href);
  const s=regex.exec(q)[2];
  // 
  console.log(`loading ${s} with fastmailRedirect`);
  if(s==="compose"){
    movePage(`https://mail.google.com/mail/u/0/?pli=1#inbox?compose=new`);
  }else{
    movePage(`https://www.fastmail.com/mail/search:${encodeURIComponent(s)}/?u=8c994007`);
    // movePage(`https://mail.google.com/mail/u/0/?pli=1#search/${encodeURIComponent(s)}`);    
  }
}
function workContainerRedirect(regex){
  const q=getQuery(window.location.href);
  let link=regex.exec(q)[2];
  console.log(`loading ${link} with workContainerRedirect`);  

  link = encodeURIComponent(link);
  link = `https://cloud.ibm.com/?r=${link}`
  
  console.log({link})

  // movePage(link)
}

function defaultResult(){
  // alert('default')
  if( /yeltnarsearch/.test(window.location.href) ){
    console.log(1)
    const q=getQuery();
    console.log(2,q)
    console.log(3)
    movePage(`https://www.startpage.com/do/dsearch?query=${q}`);
  }
}



