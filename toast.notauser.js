function toast(msg,time,style={color:"white",backgroundColor:"green"}){
  
  const load = document.createElement("div");
  load.setAttribute("findme", "drew");
  load.style.position="absolute";
  load.style.left="0px";
  load.style.top="0px";
  load.style.width="100%";
  load.style.zIndex=Number.MAX_SAFE_INTEGER;
  load.style.height="10px";

  const start = new Date();
  
  let load_bar;
  
  if( msg instanceof HTMLElement ){
    load_bar = msg;
  }
  else{
    load_bar = document.createElement("div");
    load_bar.style.width = "100%";
    load_bar.style.backgroundColor=style.backgroundColor;
    load_bar.style.position="fixed";
    load_bar.style.left="0px";
    load_bar.style.top="0px";

    load_bar.innerHTML = msg;
    load_bar.style.color = style.color;
    load_bar.style.textAlign="center";
    load_bar.style.fontSize="2rem";
  }

  load.appendChild(load_bar);
  document.documentElement.appendChild(load);

	console.log(document.querySelector("[findme=drew]"));
  
  // remove after time lapsed, if greater than 0
  if(time>0){
    setTimeout(()=>{
      document.documentElement.removeChild(load);
    },time);
  }

}