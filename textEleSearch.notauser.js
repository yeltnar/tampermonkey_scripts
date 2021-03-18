const textEleSearch = (()=>{
  
  function shouldCheckChildren( tester, ele, options={} ){
    // console.log(ele.nodeName);
    const {key}={key:"innerText",...options}; 
    
    if(tester instanceof RegExp){
        return tester.test(ele[key]);
    }else if(typeof tester === 'string'){
        if(ele[key]===undefined||ele[key]===null){return false;}
        return ele[key].includes(tester);
    }else{
      throw new Error('unknown tester');
    }
  }

  return function textEleSearch(tester, top_element){

    if(top_element===undefined){top_element=document.body;} // if no top element, set to this page's body 

    let to_return;
    let filtered_descendants;

    if(top_element.tagName==="FRAMESET" ){

      // frameset -> go deeper on all children
      const child_arr = [...top_element.children];
      filtered_descendants = child_arr.reduce((acc, cur,i,arr)=>{
        const deep_children_check_result = textEleSearch(tester, cur);
        if(deep_children_check_result !== undefined){
          acc.push(deep_children_check_result);
        }
        return acc;
      },[]);
      filtered_descendants = filtered_descendants.length===0 ? undefined : filtered_descendants;
      filtered_descendants = filtered_descendants?.length===1 ? filtered_descendants[0] : filtered_descendants;
      

    }
    else if(top_element.tagName==="FRAME" && top_element.contentDocument ){

      // frame -> check special body
      const ele = top_element.contentDocument.querySelector('body');
      if( shouldCheckChildren(tester,ele) ){
          const child_arr = [...ele.children];
          filtered_descendants = child_arr.reduce((acc,cur,i,arr)=>{
            const deep_children_check_result = textEleSearch(tester, cur);
            if(deep_children_check_result !== undefined){
              acc.push(deep_children_check_result);
            }
            return acc;
          },[]);
          filtered_descendants = filtered_descendants.length===0 ? undefined : filtered_descendants;
          filtered_descendants = filtered_descendants?.length===1 ? filtered_descendants[0] : filtered_descendants;
      }
    }
    else if( top_element.childElementCount<1 ){

      // no children, check if pass and return element if it does 
      if( shouldCheckChildren(tester,top_element) ){
        filtered_descendants = top_element;
      }

    }
    else{

      // neither -> check normal body
      if( shouldCheckChildren(tester,top_element) ){
          const child_arr = [...top_element.children];
          filtered_descendants = child_arr.reduce((acc,cur,i,arr)=>{
            const deep_children_check_result = textEleSearch(tester, cur);
            const is_defined = deep_children_check_result !== undefined;
            if(is_defined){
              acc.push(deep_children_check_result);
            }
            return acc;
          },[]);
          if( filtered_descendants.length===0 ){
              filtered_descendants = [top_element] // if children don't match, set to self // make an array so the next line couple of lines work out
          }
          filtered_descendants = filtered_descendants.length===0 ? undefined : filtered_descendants;
          filtered_descendants = filtered_descendants?.length===1 ? filtered_descendants[0] : filtered_descendants;
      }

    }

    return filtered_descendants;
  }

  
})();
