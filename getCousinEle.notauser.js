function getCousinEle({tester, ele}){
  
  const parent = ele.parentElement;
  // console.log({ele,parent});

  if(parent===null){
    console.log(ele);
    throw new Error(`${ele} parent is null!`);
  }
  
  const search_result = textEleSearch(tester, parent);
  
  if( search_result!==undefined ){
    // return tester.exec(search_result.innerText)[1];
    return search_result;
  }else if(parent!==null){
    return getCousinText({tester, ele:parent});
  }
  
}