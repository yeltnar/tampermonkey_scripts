// ==UserScript==
// @name        Simple Amazon URL
// @namespace   andbrant
// @match       https://www.amazon.com/*
// @grant       GM_registerMenuCommand
// @version     0.6
// @author      github/yeltnar
// @dont-require     https://github.com/yeltnar/tampermonkey_scripts/raw/master/timeoutPromise.notauser.js
// @dont-require     https://github.com/yeltnar/tampermonkey_scripts/raw/master/textEleSearch.notauser.js
// @run-at  document-start
// ==/UserScript==

// TODO need no autoload or smart autoload

function simpleAmazonURL(){
  let product = /\/(([A-Z]|[0-9]){10})/.exec(window.location.href)[1];

  // don't redirect wishlists
  if( window.location.href.includes('wishlist') ){
    return
  }

  // don't redirect shops
  if( window.location.href.includes('amazon.com/shop') ){
    return
  }

  // don't redirect reviews
  if( window.location.href.includes('product-reviews') ){
    return
  }

  // don't redirect simple urls
  if( window.location.href === `https://www.amazon.com/dp/${product}` ){
    return
  }

  console.log({
    msg:"moving to simple page",
    href: window.location.href,
    new: `https:/www./amazon.com/dp/${product}`
  });
  window.location.href = `https://amazon.com/dp/${product}`;
}

(()=>{
  GM_registerMenuCommand("Simple Amazon URL", simpleAmazonURL);
})();

(()=>{

  if( localStorage.getItem('simple-amazon-redirect')===null ){
    localStorage.setItem('simple-amazon-redirect','true');
  }
  const v = localStorage.getItem('simple-amazon-redirect');

  console.log({v});

  if(v==='true'){
    simpleAmazonURL();
  }

})()
