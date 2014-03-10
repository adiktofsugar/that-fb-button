var zeptoEvent;

//     Zepto.js
//     (c) 2010-2014 Thomas Fuchs
//     Zepto.js may be freely distributed under the MIT license.

(function(){

  zeptoEvent = {};

  var _zid = 1, undefined,
      slice = Array.prototype.slice,
      isFunction = _.isFunction,
      isString = function(obj){ return typeof obj == 'string' },
      handlers = {},
      specialEvents={},
      focusinSupported = 'onfocusin' in window,
      focus = { focus: 'focusin', blur: 'focusout' },
      hover = { mouseenter: 'mouseover', mouseleave: 'mouseout' }

  specialEvents.click = specialEvents.mousedown = specialEvents.mouseup = specialEvents.mousemove = 'MouseEvents'

  function zid(element) {
    return element._zid || (element._zid = _zid++)
  }
  function findHandlers(element, event, fn, selector) {
    event = parse(event)
    if (event.ns) var matcher = matcherFor(event.ns)
    return _.filter(handlers[zid(element)] || [], function(handler) {
      return handler
        && (!event.e  || handler.e == event.e)
        && (!event.ns || matcher.test(handler.ns))
        && (!fn       || zid(handler.fn) === zid(fn))
        && (!selector || handler.sel == selector)
    })
  }
  function parse(event) {
    var parts = ('' + event).split('.')
    return {e: parts[0], ns: parts.slice(1).sort().join(' ')}
  }
  function matcherFor(ns) {
    return new RegExp('(?:^| )' + ns.replace(' ', ' .* ?') + '(?: |$)')
  }

  function eventCapture(handler, captureSetting) {
    return handler.del &&
      (!focusinSupported && (handler.e in focus)) ||
      !!captureSetting
  }

  function realEvent(type) {
    return hover[type] || (focusinSupported && focus[type]) || type
  }

  function add(element, events, fn, data, selector, delegator, capture){
    var id = zid(element), set = (handlers[id] || (handlers[id] = []))
    events.split(/\s/).forEach(function(event){
      var handler   = parse(event)
      handler.fn    = fn
      handler.sel   = selector
      
      handler.del   = delegator
      var callback  = delegator || fn
      handler.proxy = function(e){
        e = compatible(e)
        if (e.isImmediatePropagationStopped()) return
        e.data = data
        var result = callback.apply(element, e._args == undefined ? [e] : [e].concat(e._args))
        if (result === false) e.preventDefault(), e.stopPropagation()
        return result
      }
      handler.i = set.length
      set.push(handler)
      if ('addEventListener' in element)
        element.addEventListener(realEvent(handler.e), handler.proxy, eventCapture(handler, capture))
    })
  }
  function remove(element, events, fn, selector, capture){
    var id = zid(element)
    ;(events || '').split(/\s/).forEach(function(event){
      findHandlers(element, event, fn, selector).forEach(function(handler){
        delete handlers[id][handler.i]
      if ('removeEventListener' in element)
        element.removeEventListener(realEvent(handler.e), handler.proxy, eventCapture(handler, capture))
      })
    })
  }

  zeptoEvent.event = { add: add, remove: remove }


  var returnTrue = function(){return true},
      returnFalse = function(){return false},
      ignoreProperties = /^([A-Z]|returnValue$|layer[XY]$)/,
      eventMethods = {
        preventDefault: 'isDefaultPrevented',
        stopImmediatePropagation: 'isImmediatePropagationStopped',
        stopPropagation: 'isPropagationStopped'
      }

  function compatible(event, source) {
    if (source || !event.isDefaultPrevented) {
      source || (source = event)

      _.each(eventMethods, function(predicate, name) {
        var sourceMethod = source[name]
        event[name] = function(){
          this[predicate] = returnTrue
          return sourceMethod && sourceMethod.apply(source, arguments)
        }
        event[predicate] = returnFalse
      })

      // var cond;
      // if (source.defaultPrevented !== undefined) {
      //   cond = source.defaultPrevented
      // } else {
      //   if ('returnValue' in source) {
      //     cond = source.returnValue === false
      //   } else if (source.getPreventDefault) {
      //     cond = source.getPreventDefault()
      //   }
      // }

      // if (cond) {
      //   event.isDefaultPrevented = returnTrue
      // }


      if (source.defaultPrevented !== undefined ? source.defaultPrevented :
          'returnValue' in source ? source.returnValue === false :
          source.getPreventDefault && source.getPreventDefault())
        event.isDefaultPrevented = returnTrue
    }
    return event
  }

  function createProxy(event) {
    var key, proxy = { originalEvent: event }
    for (key in event)
      if (!ignoreProperties.test(key) && event[key] !== undefined) proxy[key] = event[key]

    return compatible(proxy, event)
  }

  zeptoEvent.Event = function(type, props) {
    if (!isString(type)) props = type, type = props.type
    var event = document.createEvent(specialEvents[type] || 'Events'), bubbles = true
    if (props) for (var name in props) (name == 'bubbles') ? (bubbles = !!props[name]) : (event[name] = props[name])
    event.initEvent(type, bubbles, true)
    return compatible(event)
  };







  zeptoEvent.on = function(element, event, selector, data, callback, one){
    var autoRemove, delegator, $this = this
    if (event && !isString(event)) {
      _.each(event, function(fn, type){
        zeptoEvent.on(element, type, selector, data, fn, one)
      });
    }

    if (!isString(selector) && !isFunction(callback) && callback !== false)
      callback = data, data = selector, selector = undefined
    if (isFunction(data) || data === false)
      callback = data, data = undefined

    if (callback === false) callback = returnFalse

    
    if (one) autoRemove = function(e){
      remove(element, e.type, callback);
      return callback.apply(this, arguments)
    }

    if (selector) delegator = function(e){
      var evt,
        match = traversing.closest(e.target, selector, element);
      
      if (match && match !== element) {
        evt = _.extend(createProxy(e), {currentTarget: match, liveFired: element})
        return (autoRemove || callback).apply(match, [evt].concat(slice.call(arguments, 1)))
      }
    }

    add(element, event, callback, data, selector, delegator || autoRemove);
  }
  zeptoEvent.off = function(element, event, selector, callback){
    if (event && !isString(event)) {
      _.each(event, function(fn, type){
        zeptoEvent.off(element, type, selector, fn);
      });
    }

    if (!isString(selector) && !isFunction(callback) && callback !== false)
      callback = selector, selector = undefined

    if (callback === false) callback = returnFalse

    remove(element, event, callback, selector);
  }

  // $.fn.trigger = function(event, args){
  //   event = (isString(event) || $.isPlainObject(event)) ? $.Event(event) : compatible(event)
  //   event._args = args
  //   return this.each(function(){
  //     // items in the collection might not be DOM elements
  //     if('dispatchEvent' in this) this.dispatchEvent(event)
  //     else $(this).triggerHandler(event, args)
  //   })
  // }

  // // triggers event handlers on current element just as if an event occurred,
  // // doesn't trigger an actual event, doesn't bubble
  // $.fn.triggerHandler = function(event, args){
  //   var e, result
  //   this.each(function(i, element){
  //     e = createProxy(isString(event) ? $.Event(event) : event)
  //     e._args = args
  //     e.target = element
  //     $.each(findHandlers(element, event.type || event), function(i, handler){
  //       result = handler.proxy(e)
  //       if (e.isImmediatePropagationStopped()) return false
  //     })
  //   })
  //   return result
  // }

})()