const textEleSearch = (() => {

  function regexTester(tester, ele, options) {
    return tester.test(ele[options.key]);
  }
  function stringTester(tester, ele, options) {
    if (ele[options.key] === undefined || ele[options.key] === null) { return false; }
    return ele[options.key].includes(tester);
  }

  function shouldCheckChildren(tester, ele, options = {}) {

    options = { key: "innerText", ...options };
    let { testFunct } = { ...options };

    if (ele === null) { debugger }

    if (testFunct === undefined) {
      if (tester instanceof RegExp) {
        testFunct = regexTester;
      } else if (typeof tester === 'string') {
        testFunct = stringTester;
      }
    }

    if (testFunct === undefined) {
      throw new Error("testerFunct not found");
    } else {
      return testFunct(tester, ele, options, shouldCheckChildren);
    }

  }

  return async function textEleSearch(tester, top_element) {

    if (top_element === undefined) { top_element = document.body; } // if no top element, set to this page's body 

    let to_return;
    let filtered_descendants;

    // TODO move this elsewhere 
    async function filterChildren(children) {
      // frameset -> go deeper on all children
      const child_arr = [...children]; // children isn't actually an array with all the functions 

      const child_arr_deep_results = await Promise.all(child_arr.map(async (cur, i, arr) => {
        return await textEleSearch(tester, cur);
      }));

      return child_arr_deep_results.filter((cur, i, arr) => {
        return cur !== undefined;
      });
    }

    if (top_element.tagName === "FRAMESET") {
      filtered_descendants = await filterChildren(top_element.children);
      filtered_descendants = filtered_descendants.length === 0 ? undefined : filtered_descendants;
      filtered_descendants = filtered_descendants?.length === 1 ? filtered_descendants[0] : filtered_descendants;
    }
    else if (top_element.tagName === "FRAME" && top_element.contentDocument) {
      await waitOnFrameToLoad(top_element);

      const ele = top_element.contentDocument.querySelector('body');

      if (shouldCheckChildren(tester, ele)) {
        filtered_descendants = await filterChildren(ele.children);
        filtered_descendants = filtered_descendants.length === 0 ? undefined : filtered_descendants;
        filtered_descendants = filtered_descendants?.length === 1 ? filtered_descendants[0] : filtered_descendants;
      }
    }
    else if (top_element.childElementCount < 1) { // no children, check if pass and return element if it does   
      if (shouldCheckChildren(tester, top_element)) {
        filtered_descendants = top_element;
      }
    }
    else {

      // neither -> check normal body
      if (shouldCheckChildren(tester, top_element)) {
        filtered_descendants = await filterChildren(top_element.children);
        if (filtered_descendants.length === 0) {
          filtered_descendants = [top_element] // if children don't match, set to self // make an array so the next line couple of lines work out
        }
        filtered_descendants = filtered_descendants.length === 0 ? undefined : filtered_descendants;
        filtered_descendants = filtered_descendants?.length === 1 ? filtered_descendants[0] : filtered_descendants;
      }

    }

    return filtered_descendants;
  }

  async function waitOnFrameToLoad(frame) {
    while ((frame.contentWindow.document).readyState !== "complete") {
      await timeoutPromise(1000);
      console.log('waiting on frame to load readyState->' + (frame.contentDocument || frame.contentWindow.document).readyState);
    }
  }

})();


async function waitOnElement(element_text, loop_time = 250) {

  if (timeoutPromise === undefined) {
    throw new Error("timeoutPromise is not defined; make sure to include it in the top level user script to use waitOnElement");
  }

  let select_a_date_button = await textEleSearch(element_text);
  while (select_a_date_button === undefined) {
    await timeoutPromise(loop_time);
    select_a_date_button = await textEleSearch(element_text);
  }
  return select_a_date_button;
}
