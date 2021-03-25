const getCousinEle = (()=>{

  if(textEleSearch===undefined||textEleSearch===null){
    throw new Error("textEleSearch is required for getCousinEle");
  }

  return async function getCousinEle({tester, ele}){
  
    const parent = ele.parentElement;
  
    if(parent===null){
      console.log(ele);
      throw new Error(`${ele} parent is null! looking for ${tester}`);
    }
    
    const search_result = await textEleSearch(tester, parent);
    
    if( search_result!==undefined ){
      return search_result;
    }else if(parent!==null){
      return await getCousinEle({tester, ele:parent});
    }
    
  }

})();
