function old_XMLHttpRequestPromise(url,method="GET"){
  return new Promise((resolve,reject)=>{
    var xhr = GM_xmlhttpRequest();
    xhr.withCredentials = true;
    xhr.addEventListener("readystatechange", function() {
      if(this.readyState === 4) {
        resolve(this.responseText);
      }
    });
    xhr.open(method, url);
    xhr.send();
  });
}


function xmlHttpRequest(url, method = "GET") {

  return new Promise((resolve,reject)=>{
    GM.xmlHttpRequest({
      method,
      url,
      onload: function (response) {
        resolve(response);
      }
    });
  });
}
