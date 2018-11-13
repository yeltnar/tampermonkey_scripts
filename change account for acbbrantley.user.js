// ==UserScript==
// @name         change account for acbbrantley
// @namespace    http://your.homepage/
// @version      0.1.12
// @description  enter something useful
// @author       You
// @match        *://play.google.com/*
// @match        *://www.youtube.com/*
// @match        *://accounts.google.com/*
// @grant        none
// @run-at document-start
// ==/UserScript==

var currentLocation = window.location.href;
/*/
qsa = document.querySelectorAll;

var accountToSwitchTo = localStorage.getItem("accountToSwitchTo"+ currentLocation.split("u=0").join("")); 

if( accountToSwitchTo == null)
{
	var resp = prompt("Please enter your name", "andcbrant");

	if (resp != null) 
	{
		accountToSwitchTo = resp;
		localStorage.setItem("accountToSwitchTo", accountToSwitchTo);
	}
}

var element = qsa(".gb_b.gb_8a.gb_R")[0];
element = element.length != undefined ? element[0] : element;

if( !( element.title.indexOf( accountToSwitchTo ) >= 0) )
{
	console.log("not right")
	element.click()
	qsa(".gb_xb")[0].click()
}
else
{
	console.log("is right")
}
console.log("accountToSwitchTo is "+accountToSwitchTo)
//*/

if(currentLocation.indexOf("u=0") >= 0)
{
    window.location.href = currentLocation.split("u=0").join("u=1"); // shitty lazy way
}
    
/*now assumes default user is andcbrant

doTheThing("gb_da gbii", "gb_Ma");
doTheThing("gb_d gbii", "gb_S");
doTheThing("yt-thumb-27", "yt-masthead-picker-account-subtitle");

function doTheThing(firstThing, secondThing)
{
 var first = document.getElementsByClassName(firstThing)[0];
if (first != undefined && !(first.parentElement.title.indexOf(accountToSwitchTo) > -1))
{
	console.log("in if 1");
	first.click();
	var divArrayGotBack = document.getElementsByClassName(secondThing);
	for(var i=0; i<divArrayGotBack.length; i++)
	{
		if(divArrayGotBack[i].innerHTML.indexOf(accountToSwitchTo) > -1 )
		{
			console.log("in if 2");
			console.log(divArrayGotBack[i]);
			divArrayGotBack[i].click();
		}
	}
}   
}
*/







