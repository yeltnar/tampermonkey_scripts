function xmlHttpRequest(url, method = "GET") {
  return new Promise((resolve,reject)=>{
    GM_xmlHttpRequest({
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
