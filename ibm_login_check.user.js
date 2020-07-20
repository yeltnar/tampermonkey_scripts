// ==UserScript==
// @name        IBM login check
// @namespace   Violentmonkey Scripts
// @match       *://*.na.collabserv.com/*
// @grant       none
// @version     0.8
// @author      yeltnar
// @run-at document-idle
// @description 6/24/2020, 9:53:19 AM
// 
// @grant       GM.xmlHttpRequest
// @grant       GM.setValue
// @grant       GM.getValue
// ==/UserScript==


async function alwaysRun(report_element){
  
  const details = {
    url:"https://apps.na.collabserv.com/profiles/photo.do"
  };
  
  console.log(`about to do request for login check`);
  
  const resp_status_code = await networkPromise(details).then(resp=>resp.status);
  
  const ping_date_str = formatDate(new Date());

  console.log(`resp_status_code is ${resp_status_code} ${ping_date_str}`);
  console.log(`GM.getValue("logged_in") is ${await GM.getValue("logged_in")}`)
  
  if( await GM.getValue("logged_in")===false && resp_status_code===401 ){
      report_element.innerText = `Login ❌ ${ping_date_str}`;
      console.log("not logged in and not alerting");
  }else if( resp_status_code===401 ){
      report_element.innerText = `Login ❌ ${ping_date_str}`;
      await GM.setValue("logged_in",false);
      alert("need to refresh verse");
  }else{
    try{
      report_element.innerText = `Login ✅ ${ping_date_str}`;
      await GM.setValue("logged_in",true);
    }catch(e){}
  }
  
}

(()=>{
  
  // setTimeout();
  let ping_time_ele;
  try{
    ping_time_ele = document.createElement("div")
    ping_time_ele.style.order = 97001;
    ping_time_ele.id = "ibm_login_check_report";
    document.querySelector("[role=menubar]").appendChild(ping_time_ele)
  }catch(e){}
    
  alwaysRun(ping_time_ele);
  
  setInterval(()=>{alwaysRun(ping_time_ele)}, 60*1000);
  
})();


// allow CORS
function networkPromise(details){
  return new Promise((resolve, reject)=>{
    GM.xmlHttpRequest({
      method: "GET",
      ...details,
      onload: function(response) {
        resolve(response);
      }
    });
  });
}

function formatDate(date){
  
  const dateTimeFormat = new Intl.DateTimeFormat('en', { month: 'short', day: '2-digit', hour: "2-digit", minute:"2-digit", second:"2-digit" });
  const date_format_obj = dateTimeFormat .formatToParts(date);
  const [{ value: month },,{ value: day },,{ value: hour },,{ value: minute },,{ value: second },,{value: dayPeriod}] = date_format_obj;

  const str = `${month} ${day} ${hour}:${minute}:${second} ${dayPeriod}`;
  
  return str;
}
