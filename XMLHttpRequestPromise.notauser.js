function XMLHttpRequestPromise(url,method="GET"){
  return new Promise((resolve,reject)=>{
    var xhr = new GM_xmlhttpRequest();
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
