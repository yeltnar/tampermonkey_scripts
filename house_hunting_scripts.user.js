// ==UserScript==
// @name        house_hunting_scripts
// @namespace   andbrant
// @match       https://www.redfin.com/*/home/*
// @grant       GM_registerMenuCommand
// @grant       GM_openInTab
// @grant       GM_getValue
// @grant       GM_setValue
// @version     1.2
// @author      -
// @require     https://github.com/yeltnar/tampermonkey_scripts/raw/master/timeoutPromise.notauser.js
// @dont-require     https://raw.githubusercontent.com/yeltnar/tampermonkey_scripts/master/timeoutPromise.notauser.js
// @require     https://raw.githubusercontent.com/yeltnar/tampermonkey_scripts/master/textEleSearch.notauser.js
// @dont-require     https://raw.githubusercontent.com/yeltnar/tampermonkey_scripts/master/getCousinEle.notauser.js
// @description 3/5/2022, 10:01:16 AM
// @grant       GM_xmlhttpRequest
// ==/UserScript==

const addr_key = 'to_addresses';

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
  
})();

(async()=>{
  
  GM_registerMenuCommand("Open Google maps directions", googleDirections);
  GM_registerMenuCommand("updateToAddresses", updateToAddresses);
  
  const to_addresses = (()=>{
    
    // take local storage value, or gm local storage value, then prompt if both empty 
    let to_addr_str = localStorage.getItem(addr_key);
    if(to_addr_str !== null && to_addr_str !== undefined){
      GM_setValue(addr_key, to_addr_str);
    }else{
      to_addr_str = GM_getValue(addr_key);
    }
    
    if( to_addr_str === null || to_addr_str === undefined ){
      to_addr_str = updateToAddresses();
    }
    
    console.log({to_addr_str});
    
    let to_addresses = JSON.parse(to_addr_str);
    
    return to_addresses;
  })();
  
  async function googleDirections(){
    const address = await getAddress();
    // alert('google directions '+address);
    
    const fixed_address = address.split(" ").join("+");
    
    to_addresses.forEach(async(c,i,a)=>{
      const fixed_dest = c.split(" ").join("+");
      const url = `https://www.google.com/maps/dir/${fixed_address}/${fixed_dest}`;
      console.log(url);
      await timeoutPromise(50*i);
      GM_openInTab(url);
    });
    
    
    console.log(address)
  }
  
  async function getAddress(){
    const top_stats = document.querySelector('.top-stats');
    const zipcode_ele = await textEleSearch(/[0-9]{5}/,top_stats);
    return zipcode_ele.parentElement.innerText;
  }
  
})();

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

function updateToAddresses(){
  let to_addr_str = prompt( "Enter JSON array of addresses" );
  console.log({new_val:to_addr_str});
  GM_setValue(addr_key,to_addr_str);
  console.log('set values')
  return to_addr_str
}