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
  }

  // Send a basic Ajax request.
  ajax.send = function(options){
    options = _.extend({
      method: 'GET',
      bustcache: 'nocache' // Set to null to disable additional cache-busting arg on all ajax requests
    }, options || {});

    var url = options.url;
    var cb = options.cb;
    var method = options.method;
    var args = options.args;
    var bustcache = options.bustcache;

    method = method.toUpperCase();

    var x = ajax.x();

    if(bustcache){
      var c = bustcache + '=' + (new Date().getTime());
      
      if (method=='GET') {
        url += url.indexOf('?') == -1 ? '?':'&'+c;
      
      } else if (args && args !== '') {
        args += '&' + c;
      
      } else {
        args=c;
      }
    }

    x.open(method,url,true);

    x.onreadystatechange=function(){
      if(x.readyState==4) {
        cb(x.responseText);
      }
    };

    if(method=='POST') {
      var headers = _.extend({
        'Content-type': 'application/x-www-form-urlencoded'
      }, options.headers || {});
      
      _.each(headers, function (value, key) {
        x.setRequestHeader(key, value);
      });
    }
    x.send(args);
  };

  // Uses a GET request to query the specified url and return a response to the specified function.
  ajax.get=function(url,func){
    ajax.send({
      url: url,
      cb: func,
      method: 'GET'
    });
  }


  // Uses a POST request to query the specified url and return a response to the specified function.
  ajax.post=function(url,func,args){
    ajax.send({
      url: url,
      cb: func,
      method: 'POST',
      args: args
    });
  }


}());