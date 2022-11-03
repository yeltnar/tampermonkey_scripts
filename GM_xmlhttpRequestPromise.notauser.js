function GM_xmlHttpRequestPromise(url, method = "GET", data=null, headers=null) {
  return new Promise((resolve,reject)=>{
    const obj = {
      method,
      url,
      onload: function (response) {
        resolve(response);
      },
      onerror: function(err){
        reject(err);
      }
    };

    if(data!==null){
      obj.data = data;
    }

    if(headers!==null){
      obj.headers = headers;
    }

    console.log({req_obj:obj});

    GM_xmlhttpRequest(obj);
  });
}
