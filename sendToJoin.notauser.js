const joinApi = (()=>{

  async function sendToPhone(url) {

    const deviceId = "group.android";
    const title = document.title;

    return await sendToJoin({url, title, deviceId});
  }

  async function sendToJoin({url, title="default title", deviceId="group.android", text}){
    const apikey = getJoinApiKey();
    let req_url = `https://joinjoaomgcd.appspot.com/_ah/api/messaging/v1/sendPush?apikey=${apikey}&deviceId=${deviceId}&title=${title}`
    const data = {
      title,
      text,
      url,
    };
    const headers={
      'Content-Type':'application/json',
    }
    
    console.log({ req_url });
    const reply = await GM_xmlHttpRequestPromise(req_url, 'POST', JSON.stringify(data), JSON.stringify(headers));
    console.log("called send to join");
    return reply;
  }

  function getJoinApiKey(){
    let apikey = GM_getValue('join_apikey');
    if (apikey === undefined || apikey === null) {
        apikey = prompt("enter join api key");
        GM_setValue('join_apikey', apikey);
    }
    return apikey;
  }

  return {sendToPhone, sendToJoin};
  
})();

