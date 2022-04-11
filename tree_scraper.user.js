// ==UserScript==
// @name        tree scraper
// @namespace   andbrant
// @match       https://www.balsamhill.com/p/european-fir-artificial-christmas-tree
// @grant       none
// @version     1.0
// @author      -
// @require     https://github.com/yeltnar/tampermonkey_scripts/raw/master/timeoutPromise.notauser.js
// @require     https://github.com/yeltnar/tampermonkey_scripts/raw/master/textEleSearch.notauser.js
// @require     https://raw.githubusercontent.com/yeltnar/tampermonkey_scripts/master/getCousinEle.notauser.js
// @description 4/11/2022, 11:05:41 AM
// ==/UserScript==

(async()=>{
  
  const light_guide_ele = await waitOnElement("Light Guide");
  const height_button = await getCousinEle({tester:"5.5'",ele:light_guide_ele});
  console.log({light_guide_ele,height_button});  
  
  height_button.click();
  
  // await timeoutPromise(3000);
  
  // regex for dollar amount
  const price = (await waitOnElement("TOTAL"))[0];
  // const price = await textEleSearch('499');
  const dollar_amount_arr = await getCousinEle({tester:/\$[0-9]+\.?[0-9]{0,2}/,ele:light_guide_ele});
  const dollar_amount = dollar_amount_arr.filter((c)=>{
    // debugger
    return ![...c.classList].includes("sale-price");
  })[0].innerText;
  console.log({price,dollar_amount})
  
})();
