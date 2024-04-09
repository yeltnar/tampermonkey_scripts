// ==UserScript==
// @name        ercot get table as json
// @namespace   andbrant
// @match       https://www.ercot.com/content/cdr/html/20231110_real_time_spp.html
// @match       https://www.ercot.com/content/cdr/html/*
// @grant       none
// @run-at document-end // document-start // document-idle
// @version     0.2
// @author      -
// @dont-require     https://github.com/yeltnar/tampermonkey_scripts/raw/master/timeoutPromise.notauser.js
// @dont-require     https://github.com/yeltnar/tampermonkey_scripts/raw/master/textEleSearch.notauser.js
// @description 11/15/2023, 6:35:17 PM
// ==/UserScript==

const FLAG_MIN = 13;
const ZONE = 'LZ_NORTH';

let min_table = {
  "00": 45,
  "15": 00,
  "30": 15,
  "45": 30,
};

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

        if( !new RegExp('(Oper Day|Interval Ending|Hour Ending|'+ZONE+')').test(key) ){
          return;
        }

        let value = c_value.innerText;

        const regex = /(Oper Day|Interval Ending|Hour Ending)/;

        if( !regex.test(key) ){
          value = parseFloat(value)/1000;
        }

        to_return[key] = value;
      });

      acc.push(to_return);

    }
    return acc;
	},[]);

  // console.log(headers);


  const total = x.reduce((acc, cur, i, arr)=>{
    const price = parseFloat(cur[ZONE]);
    return acc+price;
  },0);
  console.log({avg_price:total/x.length});


  const mydiv = document.createElement('table');
  mydiv.setAttribute('id','findmedrew');

  const d_outer = document.createElement('tr');
  const hour_ele = document.createElement('td');
  const price_ele = document.createElement('td');
  hour_ele.innerText = 'start interval';
  price_ele.innerText = 'price';
  d_outer.appendChild(hour_ele);
  d_outer.appendChild(price_ele);
  mydiv.appendChild(d_outer);

  x.forEach((c)=>{
    const d_outer = document.createElement('tr');
    const hour_ele = document.createElement('td');
    const price_ele = document.createElement('td');

    let price = c[ZONE];
    price = parseInt(price * 100000 ) / 1000;

    console.log(c)

    let fix_hour_ending_obj = fixHourEnding( c['Hour Ending'] );
    let fix_interval_ending_obj = fixIntervalEnding( c['Interval Ending'] );

    let {str,hour,min} = {...fix_hour_ending_obj, ...fix_interval_ending_obj};

    if(price>FLAG_MIN){
      d_outer.style.backgroundColor = 'pink';
    }

    hour_ele.innerText = str;
    price_ele.innerText = "¢ "+price;

    d_outer.appendChild(hour_ele);
    d_outer.appendChild(price_ele);

    mydiv.appendChild(d_outer);
    console.log(c);
  });

  document.body.appendChild(mydiv);

	// console.log(x[0]);
	return x;

})();

function fixIntervalEnding( interval_ending ){

  if(interval_ending===undefined){
    return {};
  }

  console.log('fixIntervalEnding');

  let hour = /(..)../.exec(interval_ending)[1];
  let min = /..(..)/.exec(interval_ending)[1];

  min = min_table[min];
  hour = parseInt(hour);

  if(min===45){
    hour = hour-1;
  }

  min = fixPadding(min);
  hour = fixPadding(hour);

  return {
    str:`${hour}:${min}`,
    hour,
    min
  };
}

function fixHourEnding( hour_ending ){

  if(hour_ending===undefined){
    return {};
  };

  min = 0;
  hour = hour_ending;

  if(min===45){
    hour = hour-1;
  }

  console.log({
    min,
    hour,
    fmd:'fixHourEnding',
    hour_ending,
  });

  min = fixPadding(min);
  hour = fixPadding(hour);

  return {
    str:`${hour}:${min}`,
    hour,
    min
  };
}

function fixPadding(num){
  if( num < 10 ){
    num = "0"+num;
  }
  return num+"";
}






