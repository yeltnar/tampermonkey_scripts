// ==UserScript==
// @name        bad idea
// @namespace   Violentmonkey Scripts
// @match       https://*/*
// @grant       none
// @version     1.0
// @author      -
// @description 4/8/2021, 12:01:28 AM
// ==/UserScript==

;(()=>{

console.log(1)


const startLoop=(()=>{


    let arr=[...new Array(3)].map(()=>[]);
    const divisions=2;
    const proto_length_ratio=1;
    let length_ratio=proto_length_ratio;	
  
    const toast_res = toast("this is a test",-1,{color:"green",backgroundColor:"green",height:"100vh"});
    
    let loop_id;
    async function startPrintFunction(ms=5000){
        if(loop_id!==undefined){
            return;
        }

        function doTheLog(){

            const print_str = arr.reduce((acc,cur,i,arr)=>{
              acc = `${acc} ${cur.length} `;
              return acc;
            },"")

            const total_pushes = arr.reduce((acc,cur,i,arr)=>{
              acc = acc+cur.length;
              return acc;
            },0)
        
            console.log({
              print_str,
              total_pushes,      
              r:arr[0].length/total_pushes,
            });
          
            if(toast_res.load_bar_ele.childElementCount===0){
              console.log("adding children");
              
              toast_res.load_bar_ele.innerText="";
              
              arr.forEach((cur,i,arr)=>{
                const child = document.createElement("div");
                child.style.height="100%";
                child.style.backgroundColor=i%2===0?"black":"white";
                toast_res.load_bar_ele.appendChild(child);
              });
              
              toast_res.load_bar_ele.style.display="flex";
              toast_res.load_bar_ele.style.flexDirection="row";
            }
          
            [...toast_res.load_bar_ele.children].forEach((cur,i)=>{
              cur.style.width = `${(arr[i].length/total_pushes*100)}%`; // change this to be mroe dynamic
            });
    
        }

        loop_id = setInterval(doTheLog,ms);
        doTheLog();
    }

    return async function(i){
      
      await startPrintFunction(1000);
    
        for(;;){
            
            const smallest = [...arr].sort(function (a, b) {
              if (a.length<b.length) {
                return -1;
              }
              if (a.length>b.length) {
                return 1;
              }
              // a must be equal to b
              return 0;
            }
            )[0];
            
            await randomTimeout();
    
            smallest.push(new Date());
        
        }
    };
})()

const r = [...new Array(1000)].map((cur,i,arr)=>{
  console.log(`starting loop ${i}`);
  return (startLoop(i).catch((e)=>{
    console.error(e);
  }));
})
console.log({r});

Promise.all(r).then(()=>{console.log("done")});


async function randomTimeout(){
    const timeout=5000*Math.random();
    // console.log({timeout});
    await timeoutPromise(timeout);
}

function timeoutPromise(ms){
  return new Promise((resolve, reject)=>{
    setTimeout(resolve,ms);
  }); 
}


  

})();

function toast(msg,time=5000,style={color:"white",backgroundColor:"green"},parentStyle={backgroundColor:"pink"}){
  
  const load = document.createElement("div");
  load.setAttribute("findme", "drew");
  load.style.position="absolute";
  load.style.left="0px";
  load.style.top="0px";
  load.style.width="100%";
  load.style.zIndex=Number.MAX_SAFE_INTEGER;
  load.style.height="10px";
  load.style.backgroundColor=parentStyle.backgroundColor;

  const start = new Date();
  
  let load_bar;
  
  if( msg instanceof HTMLElement ){
    load_bar = msg;
  }
  else{
    load_bar = document.createElement("div");
    load_bar.style.width = style.width||"100%";
    load_bar.style.backgroundColor=style.backgroundColor;
    load_bar.style.position="fixed";
    load_bar.style.left="0px";
    load_bar.style.top="0px";

    style.height && (load_bar.style.height = style.height);

    load_bar.innerHTML = msg;
    load_bar.style.color = style.color;
    load_bar.style.textAlign="center";
    load_bar.style.fontSize="2rem";
  }

  load.appendChild(load_bar);
  document.documentElement.appendChild(load);

	console.log(document.querySelector("[findme=drew]"));
  
  let timeout_id;
  function closeFunction(){
    console.log('findmedrew close fucntion')
    document.documentElement.removeChild(load);
    clearTimeout(timeout_id);
  }
  
  // remove after time lapsed, if greater than 0
  if(time>0){
    timeout_id = setTimeout(()=>{
      closeFunction();
    },time);
  }
  
  return {closeFunction,load_ele:load,load_bar_ele:load_bar};

}
