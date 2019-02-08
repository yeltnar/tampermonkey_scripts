dd = (()=>{

	const body = document.querySelector('body');
	const drew_div = document.createElement('div');
	body.appendChild(drew_div);

	default_width = "10px"
	default_height = "10px"

	drew_div.style.position = 'absolute' 
	drew_div.style.right = '0px'
	drew_div.style.top = '0px' 
	drew_div.style.width = default_width
	drew_div.style.height = default_height
	drew_div.style.backgroundColor = "blue"
	drew_div.style.zIndex = "100000000"

	drew_div.onclick = ()=>{
		alert('hi');
	}

	drew_div.onmouseenter = ()=>{
		console.log("enter")
	drew_div.style.width = "100px"
	drew_div.style.height = "100px"
	}
	drew_div.onmouseexit = ()=>{
		console.log("exit")
	}
	

	return drew_div

})();