const ntfyApi = (()=>{

    async function sendToPhone(url) {
  
      const deviceId = "group.android";
      const title = document.title;
  
      return await sendToNtfy({url, title, deviceId});
    }
  
    async function sendToNtfy({url, title="default title", deviceId="group.android", text}){
      const ntfy_topic = getNtftyTopic();
      const ntfy_url = getNtfyUrl();
      let req_url = `https://ntfy.sh`;
      const message = title;
      const data = {
        topic:ntfy_topic,
        message,
        click: url,
        actions:[
          {
            action: 'view',
            label: 'Open',
            url: url
          }
        ]
      };
  
      const headers=null;
      // const headers = {
      //   'Content-Type':'test/plain'
      // };
  
      console.log(data)
  
      console.log({ req_url });
      // const reply = await GM_xmlHttpRequestPromise(req_url, 'POST', JSON.stringify(data), JSON.stringify(headers));
      const reply = await GM_xmlHttpRequestPromise(req_url, 'POST', JSON.stringify(data));
      console.log("called send to join");
      return reply;
    }
  
    function getNtftyTopic(){
      key_name='ntfy_topic'
      return getGeneric(key_name)
    }
  
    function getNtfyUrl(){
      key_name='ntfy_url'
      return getGeneric(key_name)
    }
  
    function getGeneric(key_name){
      let key = GM_getValue(key_name);
      if (key === undefined || key === null) {
          key = prompt(`enter join ${key_name} key`);
          GM_setValue(key_name, key);
      }
      return key;
  
    }
  
    return {sendToPhone, sendToNtfy};
  
  })();
  
  let last_key="";
  const {sendToPhone} = ntfyApi;
  delete ntfyApi;
  
  (()=>{
      'use strict';
  
      window.addEventListener("unload",()=>{sentToPhone(`unloaded ${window.location.href}`)});
  
      console.log("send page to phone added")
  
      window.addEventListener("keyup",keyAction);
      console.log("added send to join key listener");
      async function keyAction(e){
          last_key += e.key;
          if( e.key==="j" && e.altKey === true ){
              await sendThisPageToPhone();
              last_key="";
          }else if( e.code==="KeyJ" && e.altKey === true ){
              await sendThisPageToPhone();
              last_key="";
          }
      }
  
      async function sendThisPageToPhone(){
          let url = window.location.href;
          url = fixForYoutube(url);
          const r = await sendToPhone(url);
          console.log({send_reply:r});
          toast("Sent to phone", 1500, { backgroundColor: "pink" });
      }
  
      GM_registerMenuCommand("Send to Phone", sendThisPageToPhone);
      GM_registerMenuCommand("test", async()=>{
        const r = await GM_xmlHttpRequestPromise('https://do.andbrant.com/');
        console.log(r);
      });
  
      window.sendToPhone = sendToPhone;
      window.sendThisPageToPhone = sendThisPageToPhone;
  
  
  })();