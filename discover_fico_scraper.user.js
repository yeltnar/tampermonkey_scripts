// ==UserScript==
// @name        Discover FICO Scraper 
// @namespace   Violentmonkey Scripts
// @match       https://portal.discover.com/customersvcs/ficoscore/score/showCardScore
// @grant       none
// @version     0.1.0
// @author      -
// @description 5/18/2020, 10:29:28 AM
// @run-at      document-idle
// ==/UserScript==


(()=>{
  
  console.log("FICO scraper added");

  document.querySelector("#table-tab").click();

  let tab_content = [...document.querySelector(".table-details.tab-content").children[0].querySelector("tbody").querySelectorAll(".data-row")];

  tab_content = tab_content.map((cur,i,arr)=>{

    const text_date = cur.querySelectorAll("td")[0].innerText;
    const score = cur.querySelector(".score").innerText;

    const regex = /([a-zA-Z]+) '([0-9]+)/;
    const regex_results = regex.exec(text_date);

    const month = regex_results[1];
    const year = regex_results[2];

    const date = {
      month,
      year
    };

    return {
      date,
      text_date,
      score
    };
  });
  
  download(JSON.stringify(tab_content,null,2),"fico.json",'text/json');
  
  function download(data, filename, type) {
    var file = new Blob([data], {type: type});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 0); 
    }
}

  
  
})()
