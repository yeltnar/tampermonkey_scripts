// ==UserScript==
// @name        auto open calendar link
// @namespace   Violentmonkey Scripts
// @match       https://mail.notes.na.collabserv.com/livemail/($Calendar)/*
// @grant       none
// @version     0.5
// @author      -
// @run-at      document-idle
// @description 3/15/2021, 9:55:34 AM
// @require     https://raw.githubusercontent.com/yeltnar/tampermonkey_scripts/master/textEleSearch.notauser.js
// @require     https://raw.githubusercontent.com/yeltnar/tampermonkey_scripts/master/getCousinEle.notauser.js
// @require     https://raw.githubusercontent.com/yeltnar/tampermonkey_scripts/master/toast.notauser.js
// ==/UserScript==

(()=>{

  console.log("calendar window?");
  setTimeout(()=>{
    console.log('main timeout')
    
    const online_meeting = textEleSearch("Online Meeting"); // prefer this one?
    const location = textEleSearch("Location");
    console.log({online_meeting,location});
    
    const ele = online_meeting===undefined?location:online_meeting;
    console.log({location_ele:ele});

    // `https://` all the way to the end 
    const link_ele = getCousinEle({tester:/(https?:\/\/.*)/, ele});
    const link = link_ele.innerText.split(" ")[0];
    //.split(" ")[0];
    console.log({
      link_ele,
      link,
    });
    
    
    // meeting_time = 
    let time_ele = textEleSearch(/time:/i) || textEleSearch("Starts:");
    time_ele = Array.isArray(time_ele) ? time_ele[0] : time_ele;
    console.log({time_ele});
    let time_cousin_ele = getCousinEle({tester:/[0-9]{2}\/[0-9]{2}\/[0-9]{4}/,ele:time_ele});
    console.log({time_cousin_ele});
    time_cousin_ele = Array.isArray(time_cousin_ele) ? time_cousin_ele[0] : time_cousin_ele;
    const time_str = time_cousin_ele.innerText.split(" - ")[0];
    console.log({
      time_cousin_ele,
      time_ele,
      time_str
    });
    
    const open_date_ms = new Date(time_str).getTime()-45*1000; // some buffer before meeting actually starts 
    const open_date = new Date(open_date_ms);
    const open_in = open_date_ms-new Date().getTime();
    
    console.log({open_in,link});
    
    if( open_in > -1*1000*60*10 ){ // if too far in the past, don't open
      const date_str = new Intl.DateTimeFormat('en-US',{dateStyle:"medium",timeStyle:"medium"}).format(open_date);
      toast(`Opening '${link}' ${date_str}`, 10000, { backgroundColor: "#cccccc", color:"rgb(0, 133, 113)" });
      setTimeout(()=>{
        open(link);  
      },open_in);
    }else{
      console.log('too far in past; not opening link');
    }

  },3000); // try to get all the nested iframes loaded 
  
})();


