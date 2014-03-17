// FROM https://github.com/seven1m/mini/blob/master/src/ajax.js
var ajax;
(function () {

  ajax = {};

  // The XMLHttpRequest object (or MS equivalent) used for communication
  ajax.x=function(){
    try{
      return new ActiveXObject('Msxml2.XMLHTTP')
    }catch(e){
      try{
        return new ActiveXObject('Microsoft.XMLHTTP')
      }catch(e){
        return new XMLHttpRequest()
      }
    }
  };

  var queryStringFromObject = function (data) {
    var queryString = "";
    for (var key in data) {
      queryString += "&" + encodeURIComponent(key) + "=" + encodeURIComponent(data[key]);
    }
    if (queryString) {
      queryString = "?" + queryString.substring(1);
    }
    return queryString;
  };

  // Send a basic Ajax request.
  ajax.send = function(options){
    options = _.extend({
      method: 'GET',
      data: {},
      
      bustCache: true,
      
      success: function () {},
      error: function () {},
      complete: function () {}

    }, options || {});

    var url = options.url;
    if (!url) {
      throw new Error("Cannot use ajax without url!");
    }
    
    var success = options.success;
    var error = options.error;
    var complete = options.complete;

    var method = options.method.toUpperCase();
    var data = options.data;
    var shouldBustCache = options.bustCache;

    method = method.toUpperCase();

    var x = ajax.x();

    if(shouldBustCache){
      var buster = (new Date().getTime());
      var bustKey = "cache";
      if (method == "GET") {
        while (data[bustKey]) {
          bustKey = bustKey + "1";
        }
        data[bustKey] = buster;
      }
    }

    if (method == "GET") {
      var queryString = queryStringFromObject(data);
      url = url + queryString;
    }
    
    x.open(method,url,true);

    x.onreadystatechange=function(){
      if(x.readyState==4) {
        if (x.status == 200) {
          success(x.responseText);
        } else {
          error(x, x.statusText, x.status);
        }
        complete(x);
      }
    };

    var sendData = null;

    if(method=='POST') {
      var headers = _.extend({
        'Content-type': 'application/x-www-form-urlencoded'
      }, options.headers || {});
      
      _.each(headers, function (value, key) {
        x.setRequestHeader(key, value);
      });

      switch(headers['Content-Type']) {
        case "application/x-www-form-urlencoded":
          sendData = queryStringFromObject(data).substring(1);
          break;
        
        case "application/json":
          sendData = JSON.stringify(data);
          break;
      }

    }

    x.send(sendData);
  };


}());