// ==UserScript==
// @name        calendar popup
// @namespace   Violentmonkey Scripts
// @match       https://mail.notes.na.collabserv.com/livemail/($Calendar)/*
// @match       http://localhost:5000/
// @grant       none
// @version     1.0
// @author      -
// @run-at      document-idle
// @description 3/15/2021, 9:55:34 AM
// ==/UserScript==

const textEleSearch = (()=>{
  
  function shouldCheckChildren( text, ele ){
    // console.log(ele.nodeName);
    return ele.innerText.includes(text);
  }

  return function textEleSearch(text, top_element){
  
    //console.log({logid:"textEleSearch",top_element});

    if(top_element===undefined){top_element=document.body;} // if no top element, set to this page's body 

    let to_return;
    let filtered_descendants;

    if(top_element.tagName==="FRAMESET" ){

      // frameset -> go deeper on all children
      const child_arr = [...top_element.children];
      filtered_descendants = child_arr.reduce((acc, cur,i,arr)=>{
        const deep_children_check_result = textEleSearch(text, cur);
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
      if( shouldCheckChildren(text,ele) ){
          const child_arr = [...ele.children];
          filtered_descendants = child_arr.reduce((acc,cur,i,arr)=>{
            const deep_children_check_result = textEleSearch(text, cur);
            if(deep_children_check_result !== undefined){
              acc.push(deep_children_check_result);
            }
            return acc;
          },[]);
          filtered_descendants = filtered_descendants.length===0 ? undefined : filtered_descendants;
      }
    }
    else if( top_element.childElementCount<1 ){

      // no children, check if pass and return element if it does 
      if( shouldCheckChildren(text,top_element) ){
        filtered_descendants = top_element;
      }

    }
    else{

      // neither -> check normal body
      if( shouldCheckChildren(text,top_element) ){
          const child_arr = [...top_element.children];
          filtered_descendants = child_arr.reduce((acc,cur,i,arr)=>{
            const deep_children_check_result = textEleSearch(text, cur);
            const is_defined = deep_children_check_result !== undefined;
            if(is_defined){
              acc.push(deep_children_check_result);
            }
            return acc;
          },[]);
          filtered_descendants = filtered_descendants.length===0 ? undefined : filtered_descendants;
          filtered_descendants = filtered_descendants?.length===1 ? filtered_descendants[0] : filtered_descendants;
      }

    }

    return filtered_descendants;
  }

  
})()

