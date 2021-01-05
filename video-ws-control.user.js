// ==UserScript==
// @name        video ws controll
// @namespace   Violentmonkey Scripts
// @match       https://www.youtube.com/watch*
// @match       https://m.youtube.com/watch*
// @match       https://www.hulu.com/watch*
// @grant       none
// @version     0.7
// @author      -
// @description 10/7/2020, 11:58:24 AM
// @run-at      document-end
// ==/UserScript==



(() => {
  
    const current_session_id = new URLSearchParams(window.location.search).get("session_id") || undefined;
    console.log({current_session_id});

    const ACTIONS = {
        play: "play",
    };

    let video_element;
  
    (()=>{
      console.log('adding setup timeout...');
      setTimeout(()=>{
        console.log('adding...');
        video_element = document.querySelector("video");
        console.log('adding video element events to '+video_element);

        // add event listeners for the video
        video_element.addEventListener("play", () => {
            console.log('you clicked play');
            socketSend(getPlayAction(video_element));
        });
        video_element.addEventListener("pause", () => {
            console.log('you clicked pause');
            socketSend(getPauseAction());
        });
      },3000);
    })()

    // const url = "wss://Node-WSS.yeltnar.repl.co";
    // const url = "wss://192.168.1.132:8080";
    const url = "wss://abra-testing-node-server.herokuapp.com";

    let socket = new WebSocket(url);
  
    const ping_interval = setInterval(()=>{
      socketSend(getKeepAliveAction())
    },30*1000);

    socket.onopen = function (e) {
        const obj = {
            "type": "host",
        };
        socketSend(obj)
      
    };

    socket.onmessage = function (event) {
        console.log(`onmessage - ${event.data}`);
        parseAction(JSON.parse(event.data));
        console.log(`onmessage after - ${event.data} (${new Date().getTime()})`)
    };

    socket.onclose = function (event) {
        if (event.wasClean) {
            console.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
        } else {
            // e.g. server process killed or network down
            // event.code is usually 1006 in this case
            console.log(`connection died at ${new Date().getTime()}`);
            alert('[close] Connection died');
        }
        clearInterval(ping_interval);
    };

    socket.onerror = function (error) {
        alert(`[error] ${error.message}`);
    };

//     setTimeout(() => {
//         console.log('sending pause')
//         socketSend(getPauseAction());
//         setTimeout(() => {
//             console.log('sending play')
//             socketSend(getPlayAction(video_element));
//         }, 5000)

//     }, 5000);


    function socketSend(obj){
      obj.session_id = current_session_id;
      obj.time = new Date().getTime();
      obj.url = window.location.href;
      
      socket.send(JSON.stringify(obj));
    }

    function parseAction(action_obj) {
        console.log(`parseAction`);

        console.log(`parseAction - ${JSON.stringify(action_obj, null, 2)}`);
      
        console.log(action_obj)
        console.log(action_obj.session_id)
        console.log(current_session_id)
      
      if( current_session_id!==undefined && action_obj.session_id===current_session_id ){
          
          // update time seperatly 
          if (action_obj.current_time !== undefined) {
              video_element.currentTime = action_obj.current_time
          }

          if (action_obj.action === "pause") {
              video_element.pause();
              console.log('pausing');
          } else if (action_obj.action === "play") {
              video_element.play();
              console.log('playing')
          }
          
        }else{ // don't parse action 
            console.log(JSON.stringify({
                action_url: action_obj.url,
                curent_url: window.location.href
            }, null, 2))
            return;
        } 
    }

    function getPlayAction(video_element) {

        let current_time;
        if (video_element !== undefined) {
            current_time = video_element.getCurrentTime();
        }

        return {
            "videocontrol": true,
            "action": "play",
            current_time
        }
    }

    function getPauseAction() {
        return {
            "videocontrol": true,
            "action": "pause",
        }
    }

    function getKeepAliveAction() {
        return {
            "videocontrol": false,
            "action": "keep_alive",
        }
    }

})();
