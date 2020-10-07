// ==UserScript==
// @name        video ws controll
// @namespace   Violentmonkey Scripts
// @match       https://www.youtube.com/watch*
// @grant       none
// @version     0.3
// @author      -
// @description 10/7/2020, 11:58:24 AM
// @run-at      document-end
// ==/UserScript==


(() => {

    const ACTIONS = {
        play: "play",
    };


    const video_element = document.querySelector("video");


    const url = "wss://Node-WSS.yeltnar.repl.co";

    let socket = new WebSocket(url);

    // add event listeners for the video
    video_element.addEventListener("play", () => {
        console.log('you clicked play');
        socket.send(JSON.stringify(getPlayAction(video_element)));
    });
    video_element.addEventListener("pause", () => {
        console.log('you clicked pause');
        socket.send(JSON.stringify(getPauseAction()));
    });

    socket.onopen = function (e) {
        const obj = {
            "type": "host",
            "location": window.location.href,
            "time": new Date().getTime()
        };
        socket.send(JSON.stringify(obj));
    };

    socket.onmessage = function (event) {
        console.log(`onmessage - ${event.data}`);
        parseAction(JSON.parse(event.data));
        console.log(`onmessage after - ${event.data}`)
    };

    socket.onclose = function (event) {
        if (event.wasClean) {
            console.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
        } else {
            // e.g. server process killed or network down
            // event.code is usually 1006 in this case
            alert('[close] Connection died');
        }
    };

    socket.onerror = function (error) {
        alert(`[error] ${error.message}`);
    };

    setTimeout(() => {
        console.log('sending pause')
        socket.send(JSON.stringify(getPauseAction()));
        setTimeout(() => {
            console.log('sending play')
            socket.send(JSON.stringify(getPlayAction()));
        }, 5000)

    }, 5000);




    function parseAction(action_obj) {
        console.log(`parseAction`)

        console.log(`parseAction - ${JSON.stringify(action_obj, null, 2)}`);

        if (action_obj.url !== window.location.href) {
            console.log(JSON.stringify({
                action_url: action_obj.url,
                curent_url: window.location.href
            }, null, 2))
            return;
        }

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
    }

    function getPlayAction(video_element) {

        let current_time;
        if (video_element !== undefined) {
            current_time = video_element.getCurrentTime();
        }

        return {
            "videocontrol": true,
            "action": "play",
            url: window.location.href,
            current_time
        }
    }

    function getPauseAction() {
        return {
            "videocontrol": true,
            "action": "pause",
            url: window.location.href,
        }
    }

})();
