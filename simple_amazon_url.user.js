// ==UserScript==
// @name        Simple Amazon URL
// @namespace   andbrant
// @match       https://www.amazon.com/*
// @grant       GM_registerMenuCommand
// @version     0.8
// @author      github/yeltnar
// @dont-require     https://github.com/yeltnar/tampermonkey_scripts/raw/master/timeoutPromise.notauser.js
// @dont-require     https://github.com/yeltnar/tampermonkey_scripts/raw/master/textEleSearch.notauser.js
// @run-at  document-start
// ==/UserScript==

// TODO need no autoload or smart autoload

function simpleAmazonURL(){

  const regex = /\/(([A-Z]|[0-9]){10})/g;
  let product;
  const match_list = Array.from(window.location.href.matchAll(regex));

  // make sure there is a nubmber in the ASIN
  let validate_regex = /[0-9]/;
  for( let k in match_list ){
    if(validate_regex.test(match_list[k][1])){
      product = match_list[k][1];
    }
  }

  // don't redirect wishlists
  if( window.location.href.includes('wishlist') ){
    return
  }

  // don't redirect shops
  if( window.location.href.includes('amazon.com/shop') ){
    console.log('breaking for amazon.com/shop');
    return
  }else if( window.location.href.includes('amazon.com/store') ){
    console.log('breaking for amazon.com/store');
    return
  }else if( window.location.href.includes('/b/') ){
    console.log('breaking for /b/');
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
