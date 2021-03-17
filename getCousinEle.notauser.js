const getCousinEle = (()=>{

  if(textEleSearch===undefined||textEleSearch===null){
    throw new Error("textEleSearch is required for getCousinEle");
  }

  return function getCousinEle({tester, ele}){
  
    const parent = ele.parentElement;
    // console.log({ele,parent});
  
    if(parent===null){
      console.log(ele);
      throw new Error(`${ele} parent is null! looking for ${tester}`);
    }
    
    const search_result = textEleSearch(tester, parent);
    console.log({search_result});
    
    if( search_result!==undefined ){
      return search_result;
    }else if(parent!==null){
      return getCousinEle({tester, ele:parent});
    }
    
  }

})();
