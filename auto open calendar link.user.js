// ==UserScript==
// @name        auto open calendar link
// @namespace   Violentmonkey Scripts
// @match       https://mail.notes.na.collabserv.com/livemail/($Calendar)/*
// @match       http://localhost:5000/
// @grant       none
// @version     0.1
// @author      -
// @run-at      document-idle
// @description 3/15/2021, 9:55:34 AM
// @dont require     https://raw.githubusercontent.com/yeltnar/tampermonkey_scripts/master/textEleSearch.notauser.js
// @dont require     https://raw.githubusercontent.com/yeltnar/tampermonkey_scripts/master/getCousinEle.notauser.js
// @require     http://localhost:5000/textEleSearch.notauser.js
// @require     http://localhost:5000/getCousinEle.notauser.js
// ==/UserScript==


(()=>{

  console.log("calendar window?")
  setTimeout(()=>{
    console.log('main timeout')
    
    const online_meeting = textEleSearch("Online Meeting"); // prefer this one?
    const location = textEleSearch("Location");
    console.log({online_meeting,location});

    // `https://` all the way to the end 
    const link_ele = getCousinEle({tester:/(https?:\/\/.*)/, ele:online_meeting===undefined?location:online_meeting});
    const link = link_ele.innerText.split(" ")[0];
    //.split(" ")[0];
    console.log({
      link_ele,
      link,
    });
    
    
    // meeting_time = 
    const time_ele = textEleSearch("Time:");
    const time_cousin_ele = getCousinEle({tester:/[0-9]{2}\/[0-9]{2}\/[0-9]{4}/,ele:time_ele});
    const time_str = time_cousin_ele.innerText.split(" - ")[0];
    console.log({
      time_cousin_ele,
      time_ele,
      time_str
    });
    
    const open_in = new Date(time_str).getTime()-new Date().getTime() -45*1000 ; // some buffer before meeting actually starts 
    
    console.log({open_in});
    
    if( open_in > -1*1000*60*10 ){ // if too far in the past, don't open
      setTimeout(()=>{
        open(link);  
      },open_in);
    }else{
      console.log('too far in past; not opening link');
    }

  },3000); // try to get all the nested iframes loaded 
  
})();


