// ==UserScript==
// @name        ercot get table as json
// @namespace   andbrant
// @match       https://www.ercot.com/content/cdr/html/20231110_real_time_spp.html
// @match       https://www.ercot.com/content/cdr/html/*
// @grant       none
// @run-at document-end // document-start // document-idle
// @version     0.1
// @author      -
// @dont-require     https://github.com/yeltnar/tampermonkey_scripts/raw/master/timeoutPromise.notauser.js
// @dont-require     https://github.com/yeltnar/tampermonkey_scripts/raw/master/textEleSearch.notauser.js
// @description 11/15/2023, 6:35:17 PM
// ==/UserScript==


(()=>{

	let x=[...document.querySelector('tbody').children];

  let headers = [];

	x=x.reduce((acc,cur,i,a)=>{
		const {children:c}=cur;
		y=c;

    if(headers.length===0){

      [...c].forEach((c_header)=>{
        headers.push(c_header.innerText);
      });

    }else{

      let to_return = {};

      [...c].forEach((c_value, value_i, a)=>{
        const key = headers[value_i];

        if( !/(Oper Day|Interval Ending|LZ_NORTH)/.test(key) ){
          return;
        }

        let value = c_value.innerText;

        if( !/(Oper Day|Interval Ending)/.test(key) ){
          value = parseFloat(value)/1000;
        }

        to_return[key] = value;
      });

      acc.push(to_return);

    }
    return acc;
	},[]);

  // console.log(headers);

	// console.log(JSON.stringify(x));
	console.log(x);

  const total = x.reduce((acc, cur, i, arr)=>{
    // console.log(cur.LZ_NORTH);
    const price = parseFloat(cur.LZ_NORTH);
    return acc+price;
  },0);
  console.log(total/x.length)

	// console.log(x[0]);
	return x;

})()







