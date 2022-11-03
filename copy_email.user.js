// ==UserScript==
// @name        Copy email
// @namespace   andbrant
// @match        http://*/*
// @match        https://*/*
// @grant       none
// @run-at document-end // document-start // document-idle
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_registerMenuCommand
// @grant        GM_setClipboard
// @noframes
// @version     0.1
// @author      -
// @require      https://raw.githubusercontent.com/yeltnar/tampermonkey_scripts/master/toast.notauser.js
// @dont-require     https://github.com/yeltnar/tampermonkey_scripts/raw/master/timeoutPromise.notauser.js
// @dont-require     https://github.com/yeltnar/tampermonkey_scripts/raw/master/textEleSearch.notauser.js
// @description 9/8/2022, 10:17:19 AM
// ==/UserScript==


(()=>{
  GM_registerMenuCommand("Copy Email",copyEmail);
})();

function copyEmail(){

	let a = /.{4,5}:\/\/(.*?)\//.exec(window.location.href)[1].split('.');
	let email_user = a[a.length-2];

  let output_domain = getOutputDomain();

  let email = `${email_user}@${output_domain}`;
  
  GM_setClipboard(email);

  toast(`Copied '${email}'`, 1500, { backgroundColor: "pink" });

}

function getOutputDomain(){
  let output_domain = GM_getValue('output_domain');
  if (output_domain === undefined || output_domain === null) {
      output_domain = prompt("enter email domain");
      GM_setValue('output_domain', output_domain);
  }
  return output_domain;
}
