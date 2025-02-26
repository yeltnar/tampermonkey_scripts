// ==UserScript==
// @name        big status - tz
// @namespace   andbrant
// @match       https://techzone.ibm.com/my/reservations/*
// @match       https://techzone.ibm.com/my/reservations/ibmcloud-2/.*
// @match       https://techzone.ibm.com/my/reservations/ibmcloud-2/6553ae16cab8f60017e89ec1
// @match       https://techzone.ibm.com/my/reservations/ibmcloud-2/6557cbf3cf68770017042787
// @match       https://techzone.ibm.com/my/reservations/ibmcloud-2/669ffce2720bb3001ec1960c
// @grant       none
// @run-at document-end // document-start // document-idle
// @version     1.0
// @author      -
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_xmlhttpRequest
// @require     https://github.com/yeltnar/tampermonkey_scripts/raw/master/timeoutPromise.notauser.js
// @require     https://github.com/yeltnar/tampermonkey_scripts/raw/master/textEleSearch.notauser.js
// @require      https://raw.githubusercontent.com/yeltnar/tampermonkey_scripts/master/toast.notauser.js
// @require      https://raw.githubusercontent.com/yeltnar/tampermonkey_scripts/master/GM_xmlhttpRequestPromise.notauser.js
// @require      https://raw.githubusercontent.com/yeltnar/tampermonkey_scripts/master/sendToNtfy.notauser.js
// @description 11/7/2023, 9:05:52 AM
// ==/UserScript==

// const ntfyApi = (()=>{

//     async function sendToPhone(url, priority=3) {

//       const deviceId = "group.android";
//       const title = document.title;

//       return await sendToNtfy({url, title, deviceId, priority});
//     }

//     async function sendToNtfy({url, title=`default title`, message="default message", deviceId="group.android", priority=3}){
//       const ntfy_topic = getNtfyTopic();
//       const ntfy_url = getNtfyUrl();
//       const data = {
//         topic:ntfy_topic,
//         message,
//         title,
//         priority,
//         actions:[

//         ]
//       };

//       if(url!==undefined){
//         data.click=url;
//         data.actions.push({
//           action: 'view',
//           label: 'Open',
//           url: url,
//         });
//       }

//       const headers=null;
//       // const headers = {
//       //   'Content-Type':'test/plain'
//       // };

//       console.log(data)

//       console.log({ ntfy_url });
//       // const reply = await GM_xmlHttpRequestPromise(ntfy_url, 'POST', JSON.stringify(data), JSON.stringify(headers));
//       const reply = await GM_xmlHttpRequestPromise(ntfy_url, 'POST', JSON.stringify(data));
//       console.log("called send to ntfy");
//       return reply;
//     }

//     function getNtfyTopic(){
//       key_name='ntfy_topic'
//       return getGeneric({key_name,allow_random:true})
//     }

//     function getNtfyUrl(){
//       key_name='ntfy_url'
//       return getGeneric({key_name})
//     }

//     function getGeneric({key_name,allow_random=false}){
//       if(key_name==='ntfy_url'){
//         GM_deleteValue(key_name);
//       }
//       let value = GM_getValue(key_name);
//       if (value === undefined || value === null) {
//           prompt_value = `enter ${key_name} value`
//           prompt_value = allow_random===true ? `${value} or cancel for a random value` : value;
//           console.log(`going to prompt ; ${key_name}`)
//           value = prompt(prompt_value);
//           if(allow_random===true && value===null){
//             value = window.crypto.getRandomValues(new Uint32Array(100))[0].toString(16);
//           }
//           GM_setValue(key_name, value);
//           if(allow_random===true && value===null){
//             alert(`random value is ${value}`)
//           }
//       }
//       console.log(`getGeneric ${key_name} - ${value}`)

//       return value;
//     }

//     return {sendToPhone, sendToNtfy};

//   })();



// const {sendToPhone} = ntfyApi;
// delete ntfyApi;

(async()=>{

  console.log('hi from tz script');

  // sendToPhone("test");

  // look for `Status:`
  // await timeoutPromise(5000);
  const status_element = await waitOnElement('Status');
  const status_text = status_element.innerText;
  const parent_text = status_element.parentElement.innerText;
  const actual_text = new RegExp(`${status_text} (.*)`).exec(parent_text)[1];
  console.log( actual_text );

  [...document.body.children].forEach(c=>c.parentElement.removeChild(c));

  // sendToPhone("loading");

  const div = document.createElement('div');
  div.style.width="100vw";
  div.style.height="100vh";
  div.style.fontSize="8rem";
  div.style.display="flex";
  div.style.flexDirection="column";
  div.style.justifyContent="space-evenly";
  div.style.alignItems="center";

  const d2 = document.createElement('div');
  d2.innerText = actual_text;
  div.appendChild(d2);

  const d3 = document.createElement('div');
  d3.innerText = new Date().toString();
  div.appendChild(d3);

  document.body.appendChild(div);

  if( actual_text === 'Provisioning' ){
    console.log('setting timeout')
    await timeoutPromise(30*1000);
    console.log('reloading')
    window.location.href = window.location.href; // refresh
  } else {
    // sendToPhone("finished provisioning");
  }

})()

