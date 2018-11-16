// ==UserScript==
// @name         Emoji Text Box
// @namespace    http://tampermonkey.net/
// @version      0.11
// @description  add emoji replece to text box
// @author       You
// @match        http://*/*
// @match        https://*/*
// @match        chrome-extension://*/*
// @run-at       document-idle
// @grant        none
// ==/UserScript== 

let wordLookUpList = {"::D:":"😄",":eeb:":"brantley@us.ibm.com",":eea:":"andcbrant@gmail.com",":drewtest:":"This is an example of some string replaceing",":smile:":"😀",":happy:":"😆",":joy:":"😄",":haha:":"😆",":laugh:":"😄",":pleased:":"☺️",":hot:":"😅",":tears:":"😂",":lol:":"🤣",":laughing:":"🤣",":blush:":"☺️",":proud:":"😊",":angel:":"😇",":flirt:":"😘",":whew:":"😌",":love:":"💘",":crush:":"😍",":tongue:":"😋",":lick:":"😋",":prank:":"😝",":silly:":"😜",":rich:":"🤑",":geek:":"🤓",":glasses:":"👓",":cool:":"😎",":smug:":"😤",":meh:":"😐",":sad:":"🙍",":nervous:":"😥",":struggling:":"😣",":upset:":"😫",":whine:":"😫",":tired:":"😪",":mad:":"😠",":annoyed:":"😠",":angry:":"💢",":mute:":"📴",":silence:":"🤐",":speechless:":"😯",":stunned:":"😧",":surprise:":"😮",":impressed:":"😮",":wow:":"😮",":amazed:":"😲",":gasp:":"😲",":horror:":"🙀",":shocked:":"😨",":scared:":"😨",":oops:":"😨",":tear:":"😿",":phew:":"😥",":sweat:":"😥",":cry:":"😭",":bawling:":"😭",":zzz:":"😴",":liar:":"🤥",":hush:":"🙊",":sick:":"🤒",":barf:":"🤢",":disgusted:":"🤢",":achoo:":"🤧",":ill:":"😷",":hurt:":"🤕",":devil:":"👿",":evil:":"👿",":horns:":"👿",":monster:":"👹",":crap:":"💩",":halloween:":"🎃",":dead:":"💀",":danger:":"☠️",":poison:":"💀",":pirate:":"☠️",":ufo:":"👽",":game:":"👾",":retro:":"👾",":hooray:":"🎉",":praise:":"👏",":applause:":"👏",":please:":"🙏",":hope:":"🙏",":wish:":"🙏",":deal:":"🤝",":approve:":"👍",":ok:":"👍",":disapprove:":"👎",":bury:":"👎",":attack:":"👊",":power:":"🔋",":luck:":"🍀",":hopeful:":"🤞",":victory:":"✌️",":peace:":"🕊",":highfive:":"✋",":stop:":"🙅‍♂",":prosper:":"🖖",":spock:":"🖖",":goodbye:":"👋",":flex:":"💪",":bicep:":"💪",":strong:":"💪",":workout:":"🏋",":beauty:":"💇",":manicure:":"💅",":wedding:":"🤵",":marriage:":"💒",":engaged:":"💍",":makeup:":"💄",":lipstick:":"💋",":kiss:":"👄",":taste:":"👅",":hear:":"👂",":sound:":"🔔",":listen:":"👂",":smell:":"👃",":feet:":"👣",":tracks:":"👣",":look:":"👀",":see:":"👀",":watch:":"👀",":user:":"👤",":users:":"👥",":group:":"👥",":team:":"👥",":child:":"👪",":newborn:":"👶",":mustache:":"👨",":father:":"👨",":dad:":"👨",":girls:":"👩",":boy:":"👱",":police:":"👮",":law:":"👮",":helmet:":"👷",":sleuth:":"🕵",":doctor:":"👨‍⚕",":nurse:":"👨‍⚕",":chef:":"👨‍🍳",":graduation:":"🎓",":rockstar:":"👨‍🎤",":school:":"👨‍🏫",":professor:":"👨‍🏫",":coder:":"👨‍💻",":business:":"💼",":research:":"👨‍🔬",":painter:":"👨‍🎨",":space:":"🛰",":justice:":"👨‍⚖",":santa:":"🤶",":christmas:":"🎁",":blonde:":"👸",":crown:":"🤴",":royal:":"👑",":groom:":"🤵",":respect:":"🙇",":thanks:":"🙇",":information:":"💁‍♂",":halt:":"🙅‍♂",":spa:":"💆‍♂",":dress:":"💃",":dancer:":"🕺",":bunny:":"🐰",":exercise:":"🏃",":marathon:":"🎽",":date:":"👬",":couple:":"👬",":home:":"👪",":parents:":"👪",":pants:":"👖",":shirt:":"👔",":formal:":"👔",":beach:":"🐚",":shoe:":"👡",":sneaker:":"👟",":sport:":"👟",":running:":"👟",":hat:":"🎩",":classy:":"🎩",":education:":"🎓",":college:":"🎓",":university:":"🎓",":king:":"👑",":queen:":"👑",":bag:":"👜",":weather:":"☔️",":rain:":"☔️",":pet:":"🐹",":monkey:":"🙊",":blind:":"🙈",":ignore:":"🙈",":deaf:":"🙉",":slow:":"🐢",":sea:":"🌊",":bug:":"🐞",":desert:":"🐪",":speed:":"🐎",":dog:":"🐩",":thanksgiving:":"🦃",":wood:":"🌳",":plant:":"🌱",":leaf:":"🍃",":autumn:":"🍂",":canada:":"🍁",":flowers:":"💐",":flower:":"🌸",":spring:":"🌸",":globe:":"🌏",":world:":"🌐",":international:":"🌐",":summer:":"🍹",":night:":"🌙",":star:":"💫",":shiny:":"✨",":lightning:":"⚡️",":thunder:":"⚡️",":burn:":"🔥",":explode:":"💥",":cloud:":"⛅️",":winter:":"❄️",":cold:":"❄️",":wind:":"💨",":blow:":"💨",":fast:":"💨",":water:":"💦",":fruit:":"🍒",":aubergine:":"🍆",":spicy:":"🌶",":toast:":"🥂",":breakfast:":"🍵",":tempura:":"🍤",":meat:":"🍗",":chicken:":"🍗",":burger:":"🍔",":paella:":"🥘",":curry:":"🥘",":pasta:":"🍝",":noodle:":"🍜",":dessert:":"🍰",":party:":"🎉",":sweet:":"🍬",":milk:":"🍼",":cafe:":"☕️",":espresso:":"☕️",":green:":"♻️",":drink:":"🍸",":drinks:":"🍻",":cheers:":"🥂",":whisky:":"🥃",":vacation:":"🍹",":bottle:":"🍾",":bubbly:":"🍾",":celebration:":"🎆",":cutlery:":"🍴",":dining:":"🍽",":dinner:":"🍽",":sports:":"🎾",":pool:":"🎱",":billiards:":"🎱",":archery:":"🏹",":skating:":"⛸",":gym:":"🏋",":gold:":"🥇",":winner:":"🏆",":silver:":"🥈",":bronze:":"🥉",":award:":"🏆",":contest:":"🏆",":theater:":"🎭",":drama:":"🎭",":design:":"🎨",":paint:":"🎨",":film:":"🎦",":sing:":"🎤",":music:":"🎶",":earphones:":"🎧",":piano:":"🎹",":rock:":"🎸",":dice:":"🎲",":gambling:":"🎲",":target:":"🎯",":play:":"🎮",":controller:":"🎮",":console:":"🎮",":bicycle:":"🚲",":911:":"🚨",":emergency:":"🆘",":train:":"🚂",":flight:":"✈️",":ship:":"⚓️",":launch:":"🚀",":orbit:":"🛰",":cruise:":"🛳",":wip:":"⚠️",":semaphore:":"🚦",":travel:":"🗺",":stone:":"🗿",":beach_umbrella:":"⛱",":camping:":"⛺️",":festival:":"🎆",":skyline:":"🏙",":karl:":"🌁",":time:":"⏳",":smartphone:":"📱",":mobile:":"📱",":call:":"📞",":incoming:":"📲",":desktop:":"💻",":screen:":"💻",":save:":"💾",":photo:":"📸",":video:":"🎥",":phone:":"📞",":podcast:":"🎙",":morning:":"⏰",":signal:":"📡",":idea:":"💡",":light:":"💡",":trash:":"🗑",":dollar:":"💰",":money:":"💵",":cream:":"💰",":subscription:":"💳",":diamond:":"💎",":tool:":"🔨",":shoot:":"🔫",":weapon:":"🔫",":boom:":"💣",":cut:":"✂️",":chop:":"🔪",":cigarette:":"🚬",":funeral:":"⚰️",":fortune:":"🔮",":science:":"🔬",":laboratory:":"🔬",":investigate:":"🔬",":health:":"💉",":medicine:":"💊",":hospital:":"💉",":needle:":"💉",":wc:":"🚽",":bath:":"🚿",":shower:":"🛀",":lock:":"🔑",":password:":"🔑",":bags:":"🛍",":present:":"🎁",":birthday:":"🎈",":letter:":"✉️",":email:":"💌",":envelope:":"💌",":shipping:":"📦",":tag:":"🏷",":document:":"📝",":stats:":"📊",":metrics:":"📉",":graph:":"📉",":schedule:":"📅",":calendar:":"📅",":directory:":"📁",":press:":"📰",":library:":"📚",":location:":"📍",":note:":"📝",":search:":"🔍",":zoom:":"🔍",":security:":"🔓",":private:":"🔒",":heart:":"💘",":chocolates:":"💝",":off:":"🔕",":help:":"🆘",":limit:":"⛔️",":block:":"🚫",":forbidden:":"🚫",":score:":"💯",":perfect:":"💯",":bang:":"❗️",":confused:":"❓",":environment:":"♻️",":global:":"🌐",":swirl:":"🌀",":sleeping:":"💤",":toilet:":"🚻",":restroom:":"🚾",":accessibility:":"♿️",":airport:":"🛄",":movie:":"🎦",":wifi:":"📶",":alphabet:":"🔤",":letters:":"🔠",":yes:":"🆗",":fresh:":"🆕",":numbers:":"🔢",":number:":"#️⃣",":return:":"↩️",":shuffle:":"🔀",":loop:":"🔁",":sync:":"🔄",":trademark:":"™️",":volume:":"🔕",":notification:":"🔔",":announcement:":"📢",":comment:":"💬",":thinking:":"💭",":milestone:":"🏁",":finish:":"🏁",":pride:":"🏳️‍🌈",":china:":"🇨🇳",":keeling:":"🇨🇨",":ivory:":"🇨🇮",":france:":"🇫🇷",":french:":"🇫🇷",":flag:":"🇺🇸",":germany:":"🇩🇪",":italy:":"🇮🇹",":japan:":"🇯🇵",":burma:":"🇲🇲",":russia:":"🇷🇺",":korea:":"🇰🇷",":spain:":"🇪🇸",":turkey:":"🇹🇷",":british:":"🇬🇧",":united:":"🇺🇸",":america:":"🇺🇸"};
let selectors = ["textarea","input[type=text]"];
const green = "#72ff66";
const pink = "pink";

function startFunction (){
    let s = localStorage.getItem("333DrewBrantleysSelector333");

    console.log("Setting emoji replace up");

    if( s !== undefined ){
        selectors.push( s );
    }

    const f = (e)=>{

        console.log( e.srcElement.value );

        sugestions( e.srcElement.value );

        if( /:.*:/.test( e.srcElement.value ) ){

            let foundValues = /:.*:/g.exec( e.srcElement.value );

            for( let i=0; i<foundValues.length; i++ ){

                console.log("wordLookUpList[ foundValues[i] ] "+wordLookUpList[ foundValues[i] ]);

                if( wordLookUpList[ foundValues[i] ] !== undefined ){
                    console.log(wordLookUpList[ foundValues[i] ]);
                    e.srcElement.value = e.srcElement.value.split( foundValues[i]  ).join( wordLookUpList[ foundValues[i] ] );
                    e.srcElement.style.backgroundColor = pink;
                    setTimeout(()=>{ e.srcElement.style.backgroundColor = green; clearInterval(interval); },50);
                    setTimeout(()=>{ e.srcElement.style.backgroundColor = ""; clearInterval(interval); },100);
                }
            }
        }
    };

    for(let k=0; k<selectors.length; k++){
        let elements = document.querySelectorAll( selectors[k] );
        console.log( elements );
        for(let l=0; l<elements.length; l++){
            let e = elements[l];
            let oldLabel = e.getAttribute("aria-label") || e.getAttribute("placeholder");
            if( oldLabel !== undefined && oldLabel !== null ){
                e.setAttribute("placeholder","😎 "+oldLabel+" 😎");
            }else{
                e.setAttribute("placeholder","😎 ");
            }
            e.addEventListener("keyup", f);
            e.style.backgroundColor = pink;
            const interval = setInterval(()=>{
                e.style.backgroundColor = e.style.backgroundColor=== pink ? green : pink;
            },100);
            setTimeout(()=>{ e.style.backgroundColor = ""; clearInterval(interval); },500);
        }
    }
}

function searchEmojiHotKey(e){
    let resp = prompt("Enter emoji search","😎");
    let w;
    if( resp!==null && resp!==undefined && resp!=="" ){
       w = window.open("https://emojipedia.org/search/?q="+resp,"_blank");
    }
}

function sugestions(string){

}

window.addEventListener("load", (()=>{ setTimeout(()=>{ startFunction(); },3000); }));
window.addEventListener("keyup",(e)=>{
    if( e.key==="e" && e.ctrlKey ){
       searchEmojiHotKey(e);
    }
});




















