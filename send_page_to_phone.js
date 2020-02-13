// ==UserScript==
// @name         video settings
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://192.168.1.100:3333/*
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==

(function() {

    if( document.querySelectorAll("video").length===1 ){
        try{
            const remote_functions = getRemoteFunctions();
            addVideoSettings(remote_functions);
        }catch( e ){
            console.error(e);
            debugger
        }
    }

    async function addVideoSettings(remote_functions){

        const saved_data = await remote_functions.getSavedData();

        const video_element = document.querySelectorAll("video")[0];

        video_element.style.maxWidth = "100%";
        video_element.style.maxHeight = "100%";
        video_element.style.width = "100%";
        video_element.style.height = "100%";

        const play_time = getItem("play_time");
        if( play_time!==undefined ){
            try{
                console.log({play_time});
                video_element.currentTime = parseInt(play_time);
            }catch(e){
                //throw e;
            }
        }

        const paused = JSON.parse(getItem("paused"));
        if( paused!==undefined ){
            try{
                console.log({paused});

                video_element.pause();

                if(paused===false){
                    video_element.play();
                }
            }catch(e){
                throw e;
            }
        }

        setInterval((()=>{
            const video_element = document.querySelectorAll("video")[0];
            const {currentTime}=video_element;
            const {paused} = video_element;
            setItem("play_time",currentTime);
            setItem("paused",paused);
        }),1000);

        setInterval((()=>{
            console.log( getItem("play_time") );
        }),10000);

        console.log( getItem("play_time") );

        console.log("video settings added");


    }

    const prefex=(function (){
        const arr=window.location.href.split("/");
        return arr[arr.length-1];
    })()

    function getItem(str){
        str = prefex+str;
        return localStorage.getItem(str);
    }

    function setItem(str,val){
        str = prefex+str;
        return localStorage.setItem(str,val);
    }

    function getRemoteFunctions(){

        function getSavedData(){
            console.log("remote not yet ready");
        }

        function saveData(){
            console.log("remote not yet ready");
        }

        return {getSavedData,saveData};
    }

    console.log(getProtectedValue("test"));

    function getProtectedValue(name){
        name = name; // optionally set prefix
        let value = GM_getValue(name);
        if(value===undefined||value===null){
            value = prompt("enter "+name+" value");
            GM_setValue(name, value);
        }
        return apikey;
    }

})();
