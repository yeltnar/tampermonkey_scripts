const ntfyApi = (()=>{

    async function sendToPhone(url) {
  
      const deviceId = "group.android";
      const title = document.title;
  
      return await sendToNtfy({url, title, deviceId});
    }
  
    async function sendToNtfy({url, title=`default title`, message="default message", deviceId="group.android", priority=5}){
      const ntfy_topic = getNtfyTopic();
      const ntfy_url = getNtfyUrl();
      const data = {
        topic:ntfy_topic,
        message,
        title,
        priority,
        actions:[
          
        ]
      };

      if(url!==undefined){
        data.click=url;
        data.actions.push({
          action: 'view',
          label: 'Open',
          url: url,
        });
      }
  
      const headers=null;
      // const headers = {
      //   'Content-Type':'test/plain'
      // };
  
      console.log(data)
  
      console.log({ ntfy_url });
      // const reply = await GM_xmlHttpRequestPromise(ntfy_url, 'POST', JSON.stringify(data), JSON.stringify(headers));
      const reply = await GM_xmlHttpRequestPromise(ntfy_url, 'POST', JSON.stringify(data));
      console.log("called send to ntfy");
      return reply;
    }
  
    function getNtfyTopic(){
      key_name='ntfy_topic'
      return getGeneric({key_name,allow_random:true})
    }
  
    function getNtfyUrl(){
      key_name='ntfy_url'
      return getGeneric({key_name})
    }
  
    function getGeneric({key_name,allow_random=false}){
      let value = GM_getValue(key_name);
      if (value === undefined || value === null) {
          prompt_value = `enter ${key_name} value`
          prompt_value = allow_random===true ? `${value} or cancel for a random value` : value;
          value = prompt(prompt_value);
          if(allow_random===true && value===null){
            value = window.crypto.getRandomValues(new Uint32Array(100))[0].toString(16);
          }
          GM_setValue(key_name, value);
          if(allow_random===true && value===null){
            alert(`random value is ${value}`)
          }
      }

      return value;  
    }
  
    return {sendToPhone, sendToNtfy};
  
  })();
  