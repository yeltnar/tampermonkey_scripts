function xmlHttpRequestPromise(url, method = "GET") {
  return new Promise((resolve,reject)=>{
    GM_xmlhttpRequest({
      method,
      url,
      onload: function (response) {
        resolve(response);
      },
      onerror: function(err){
        reject(err);
      }
    });
  });
}
