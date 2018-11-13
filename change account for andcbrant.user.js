// ==UserScript==
// @name         change account for andcbrant
// @namespace    http://your.homepage/
// @version      0.1.5
// @description  enter something useful
// @author       You
// @match        *://keep.google.com/*
// @match        *://contacts.google.com/* 
// @match        *://www.google.com/calendar* 
// @grant        none
// @run-at document-start
// ==/UserScript==

accountToSwitchTo = "andcbrant";

doTheThing("gb_da gbii", "gb_Ma");
doTheThing("yt-thumb-27", "yt-masthead-picker-account-subtitle");
doTheThing("gb_Fa gbii", "gb_9a", true);

function doTheThing(firstThing, secondThing, closeTab)
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
if(closeTab)
{
	window.close();
}
}

