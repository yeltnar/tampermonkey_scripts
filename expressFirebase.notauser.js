const expressFirebase = (()=>{

  async function sendToPhone(url) {

    const apikey = getJoinApiKey();

    const deviceId = "group.android";
    const title = document.title;

    return await sendToJoin({url, title, deviceId});
  }

  async function sendToJoin({url, title="default title", deviceId="group.android"}){
    let req_url = `https://joinjoaomgcd.appspot.com/_ah/api/messaging/v1/sendPush?url=${url}&title=${title}&deviceId=${deviceId}&apikey=${apikey}`;
    console.log({ req_url });
    const reply = await GM_xmlHttpRequestPromise(req_url);
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
