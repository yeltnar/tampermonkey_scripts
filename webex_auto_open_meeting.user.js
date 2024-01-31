// ==UserScript==
// @name        webex_auto_open_meeting
// @namespace   andbrant
// @match       https://ibm.webex.com/webappng/sites/ibm/meeting/home*
// @grant       none
// @run-at document-end // document-start // document-idle
// @version     0.2
// @author      -
// @require     https://github.com/yeltnar/tampermonkey_scripts/raw/master/timeoutPromise.notauser.js
// @require     https://github.com/yeltnar/tampermonkey_scripts/raw/master/textEleSearch.notauser.js
// @description 1/23/2024, 12:41:32 PM
// ==/UserScript==

const drew = "drew";
const ONE_MIN = 1000 * 60;
const THREE_MIN = ONE_MIN * 3

async function getEventChildren(){
  const events = [...document.querySelectorAll(`[role="article"]`)];

  if( events.length === 0 ){
    console.log(drew+' looping for children');
    await timeoutPromise(500);
    return getEventChildren();
  }

  return events;
}

;(async()=>{

  console.log(drew+ " start");

	const events = await getEventChildren();

	const now = new Date();
	const year = now.getFullYear();

	const midnight_today_str = `11:59:59pm ${now.getMonth()+1}/${now.getDate()} ${now.getFullYear()}`;
	const midnight_today = new Date(midnight_today_str);

	let events_obj = events.map(( cur )=>{

		const time_child = cur.children[1];

		let time_child_text = time_child.innerText.split('\n').join(" ");

		let time_child_res = /(.*) -.*, (.*)/.exec(time_child_text);
		time_child_res = time_child_res[1]+" "+time_child_res[2]+" "+year;

		const date = new Date(time_child_res);
		const ms_delay = date - now;

		const is_today = date < midnight_today;

		return {
			is_today,
			date,
			ms_delay,
			element: cur,
            min_delay: ms_delay / ONE_MIN,
			name: cur.children[2].innerText.split('\n').join(' ').split(/ {2,}/).join(' ')
		};

	});

	events_obj = events_obj.reduce(( acc, cur )=>{

		if( cur.is_today && (cur.ms_delay - THREE_MIN) > 0 ){
			acc.push(cur);
		}

		return acc;

	},[]);

	events_obj.forEach(( cur )=>{

		const timeout_id = setTimeout(()=>{
			cur.element.querySelectorAll('button')[0].click();
      window.open(window.location.href,'_blank');
			console.log('drew clicking '+cur.name)
	    console.log('clicking')
		},cur.ms_delay-60*1000);

		console.log('drew - set timeout for '+cur.name+' id:'+timeout_id)

	});


	console.log({drew,events_obj});

})();

