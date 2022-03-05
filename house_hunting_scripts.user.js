// ==UserScript==
// @name        house_hunting_scripts
// @namespace   andbrant
// @match       https://www.redfin.com/*/home/*
// @grant       none
// @version     1.0
// @author      -
// @dont-require     https://github.com/yeltnar/tampermonkey_scripts/raw/master/timeoutPromise.notauser.js
// @require     https://github.com/yeltnar/tampermonkey_scripts/raw/master/textEleSearch.notauser.js
// @description 3/5/2022, 10:01:16 AM
// @grant       GM_xmlhttpRequest
// ==/UserScript==


(async()=>{
  
  const address = document.querySelector('.homeAddress').innerText.split("\n").join(" ");
  
  const district = await(async()=>{  
    let district_container = await textEleSearch(`School District:`)
    if(Array.isArray(district_container)){
      district_container=district_container[0];
    }
    const district = district_container.querySelector(`span`);
    return district.innerText;    
  })();  
  
  const open_house = (()=>{
    const snippets = document.querySelectorAll('.open-house-event-snippet');
    return [...snippets].map((c)=>{
      return c.innerText;
    }).join("; ");
  })();
  
  const price = document.querySelector('.statsValue').innerText;
  
  const o={
    address,
    district,
    open_house,
    price,
    url:window.location.href,
  };
  
  console.log(JSON.stringify(o,null));
  
  if(document.querySelectorAll('.favorite-alt').length>0){
    // alert(`favorited`);
    save(o);
  }else{
    document.querySelector('.favorite.svg-icon-off-color').onclick = ()=>{
      // alert('click');
      save(o);
    }
  }
  
})()

function save(o){
  
  var data = JSON.stringify(o);
  
  const control = GM_xmlhttpRequest({
    url:"https://script.google.com/macros/s/AKfycbzEbeAuhWr3rFJMm1TJPSwtoOjBSql7xkZ0xFV8fVydStu45kgv_Oy4SO8yO0xEU24Z3Q/exec",
    method: "POST",
    data,
  });

  // var xhr = new XMLHttpRequest();

  // control.addEventListener("readystatechange", function() {
  //   if(this.readyState === 4) {
  //     console.log(this.responseText);
  //   }
  // });

  // xhr.open("POST", "https://script.google.com/macros/s/AKfycbxzx08uxFkvxNQXAYYgr3Jx5-KW6VDJGNZ1KKXqtdput1YiopOUz3_Lpbc8bTgQxaX4tA/exec");
  // xhr.setRequestHeader("Content-Type", "application/json");

  // xhr.send(data);
  
}
