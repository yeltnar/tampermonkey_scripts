// ==UserScript==
// @name        video ws control
// @namespace   Violentmonkey Scripts
// @match       https://www.youtube.com/watch*
// @grant       none
// @version     1.0
// @author      -
// @description 10/7/2020, 11:58:24 AM
// ==/UserScript==

(()=>{
    const url = "wss://Node-WSS.yeltnar.repl.co";

    let socket = new WebSocket(url);
  
    socket.onopen = function(e) {
        const obj = {
            "type":"host",
            "location":window.location.href,
            "time":new Date().getTime()
        };
        socket.send(JSON.stringify(obj));
    };
  
    socket.onmessage = function(event) {
      console.log(`onmessage - ${event.data}`);
      parseAction(JSON.parse(event.data));
      console.log(`onmessage after - ${event.data}`)
    };
  
    socket.onclose = function(event) {
      if (event.wasClean) {
        console.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
      } else {
        // e.g. server process killed or network down
        // event.code is usually 1006 in this case
        alert('[close] Connection died');
      }
    };
  
    socket.onerror = function(error) {
      alert(`[error] ${error.message}`);
    };
  
  })();


function a(){
  console.log('another thing')
}


function parseAction(action_obj){
  console.log(`parseAction`)
  const video_element = document.querySelector("video");
  
  console.log(`parseAction - ${JSON.stringify(action_obj, null, 2)}`);
  
  if( action_obj.action==="pause" ){
    video_element.pause();
    console.log('pausing')
  } 
}
