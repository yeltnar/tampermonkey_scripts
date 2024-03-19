// ==UserScript==
// @name        move to cooked.wiki
// @namespace   andbrant
// @match        http://*/*
// @match        https://*/*
// @grant        GM_registerMenuCommand
// @run-at document-start // document-idle
// @version     0.0.1
// @author      -
// @dont-require     https://github.com/yeltnar/tampermonkey_scripts/raw/master/timeoutPromise.notauser.js
// @dont-require     https://github.com/yeltnar/tampermonkey_scripts/raw/master/textEleSearch.notauser.js
// @description 3/19/2024, 11:39:45 AM
// ==/UserScript==

GM_registerMenuCommand("move to cooked.wiki", async()=>{
  window.location.href = `https://cooked.wiki/${window.location.href}`;
});

