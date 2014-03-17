///////////
// Removed the "Backbone" from the events
// Besides that, its the same
///////////

var Events;
(function () {

  var slice = Array.prototype.slice;

 // Backbone.Events
  // ---------------

  // A module that can be mixed in to *any object* in order to provide it with
  // custom events. You may bind with `on` or remove with `off` callback
  // functions to an event; `trigger`-ing an event fires all callbacks in
  // succession.
  //
  //     var object = {};
  //     _.extend(object, Backbone.Events);
  //     object.on('expand', function(){ alert('expanded'); });
  //     object.trigger('expand');
  //
  Events = {

    // Bind an event to a `callback` function. Passing `"all"` will bind
    // the callback to all events fired.
    on: function(name, callback, context) {
      if (!eventsApi(this, 'on', name, [callback, context]) || !callback) return this;
      this._events || (this._events = {});
      var events = this._events[name] || (this._events[name] = []);
      events.push({callback: callback, context: context, ctx: context || this});
      return this;
    },

    // Bind an event to only be triggered a single time. After the first time
    // the callback is invoked, it will be removed.
    once: function(name, callback, context) {
      if (!eventsApi(this, 'once', name, [callback, context]) || !callback) return this;
      var self = this;
      var once = _.once(function() {
        self.off(name, once);
        callback.apply(this, arguments);
      });
      once._callback = callback;
      return this.on(name, once, context);
    },

    // Remove one or many callbacks. If `context` is null, removes all
    // callbacks with that function. If `callback` is null, removes all
    // callbacks for the event. If `name` is null, removes all bound
    // callbacks for all events.
    off: function(name, callback, context) {
      var retain, ev, events, names, i, l, j, k;
      if (!this._events || !eventsApi(this, 'off', name, [callback, context])) return this;
      if (!name && !callback && !context) {
        this._events = void 0;
        return this;
      }
      names = name ? [name] : _.keys(this._events);
      for (i = 0, l = names.length; i < l; i++) {
        name = names[i];
        if (events = this._events[name]) {
          this._events[name] = retain = [];
          if (callback || context) {
            for (j = 0, k = events.length; j < k; j++) {
              ev = events[j];
              if ((callback && callback !== ev.callback && callback !== ev.callback._callback) ||
                  (context && context !== ev.context)) {
                retain.push(ev);
              }
            }
          }
          if (!retain.length) delete this._events[name];
        }
      }

      return this;
    },

    // Trigger one or many events, firing all bound callbacks. Callbacks are
    // passed the same arguments as `trigger` is, apart from the event name
    // (unless you're listening on `"all"`, which will cause your callback to
    // receive the true name of the event as the first argument).
    trigger: function(name) {
      if (!this._events) return this;
      var args = slice.call(arguments, 1);
      if (!eventsApi(this, 'trigger', name, args)) return this;
      var events = this._events[name];
      var allEvents = this._events.all;
      if (events) triggerEvents(events, args);
      if (allEvents) triggerEvents(allEvents, arguments);
      return this;
    },

    // Tell this object to stop listening to either specific events ... or
    // to every object it's currently listening to.
    stopListening: function(obj, name, callback) {
      var listeningTo = this._listeningTo;
      if (!listeningTo) return this;
      var remove = !name && !callback;
      if (!callback && typeof name === 'object') callback = this;
      if (obj) (listeningTo = {})[obj._listenId] = obj;
      for (var id in listeningTo) {
        obj = listeningTo[id];
        obj.off(name, callback, this);
        if (remove || _.isEmpty(obj._events)) delete this._listeningTo[id];
      }
      return this;
    }

  };

  // Regular expression used to split event strings.
  var eventSplitter = /\s+/;

  // Implement fancy features of the Events API such as multiple event
  // names `"change blur"` and jQuery-style event maps `{change: action}`
  // in terms of the existing API.
  var eventsApi = function(obj, action, name, rest) {
    if (!name) return true;

    // Handle event maps.
    if (typeof name === 'object') {
      for (var key in name) {
        obj[action].apply(obj, [key, name[key]].concat(rest));
      }
      return false;
    }

    // Handle space separated event names.
    if (eventSplitter.test(name)) {
      var names = name.split(eventSplitter);
      for (var i = 0, l = names.length; i < l; i++) {
        obj[action].apply(obj, [names[i]].concat(rest));
      }
      return false;
    }

    return true;
  };

  // A difficult-to-believe, but optimized internal dispatch function for
  // triggering events. Tries to keep the usual cases speedy (most internal
  // Backbone events have 3 arguments).
  var triggerEvents = function(events, args) {
    var ev, i = -1, l = events.length, a1 = args[0], a2 = args[1], a3 = args[2];
    switch (args.length) {
      case 0: while (++i < l) (ev = events[i]).callback.call(ev.ctx); return;
      case 1: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1); return;
      case 2: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1, a2); return;
      case 3: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1, a2, a3); return;
      default: while (++i < l) (ev = events[i]).callback.apply(ev.ctx, args); return;
    }
  };

  var listenMethods = {listenTo: 'on', listenToOnce: 'once'};

  // Inversion-of-control versions of `on` and `once`. Tell *this* object to
  // listen to an event in another object ... keeping track of what it's
  // listening to.
  _.each(listenMethods, function(implementation, method) {
    Events[method] = function(obj, name, callback) {
      var listeningTo = this._listeningTo || (this._listeningTo = {});
      var id = obj._listenId || (obj._listenId = _.uniqueId('l'));
      listeningTo[id] = obj;
      if (!callback && typeof name === 'object') callback = this;
      obj[implementation](name, callback, this);
      return this;
    };
  });

})();


///////////////
// From Marionette
//
// Changed Marionette to EventHelpers
//////////////

(function () {

  // Trigger an event and/or a corresponding method name. Examples:
  //
  // `this.triggerMethod("foo")` will trigger the "foo" event and
  // call the "onFoo" method.
  //
  // `this.triggerMethod("foo:bar")` will trigger the "foo:bar" event and
  // call the "onFooBar" method.
  Events.triggerMethod = (function(){

    // split the event name on the ":"
    var splitter = /(^|:)(\w)/gi;

    // take the event section ("section1:section2:section3")
    // and turn it in to uppercase name
    function getEventName(match, prefix, eventName) {
      return eventName.toUpperCase();
    }

    // actual triggerMethod implementation
    var triggerMethod = function(event) {
      // get the method name from the event name
      var methodName = 'on' + event.replace(splitter, getEventName);
      var method = this[methodName];

      // trigger the event, if a trigger method exists
      if(_.isFunction(this.trigger)) {
        this.trigger.apply(this, arguments);
      }

      // call the onMethodName if it exists
      if (_.isFunction(method)) {
        // pass all arguments, except the event name
        return method.apply(this, _.tail(arguments));
      }
    };

    return triggerMethod;
  })();



  // Marionette.bindEntityEvents & unbindEntityEvents
  // ---------------------------
  //
  // These methods are used to bind/unbind a backbone "entity" (collection/model)
  // to methods on a target object.
  //
  // The first parameter, `target`, must have a `listenTo` method from the
  // EventBinder object.
  //
  // The second parameter is the entity (Backbone.Model or Backbone.Collection)
  // to bind the events from.
  //
  // The third parameter is a hash of { "event:name": "eventHandler" }
  // configuration. Multiple handlers can be separated by a space. A
  // function can be supplied instead of a string handler name.

  (function(){
    "use strict";

    // Bind the event to handlers specified as a string of
    // handler names on the target object
    function bindFromStrings(target, entity, evt, methods){
      var methodNames = methods.split(/\s+/);

      _.each(methodNames,function(methodName) {

        var method = target[methodName];
        if(!method) {
          throwError("Method '"+ methodName +"' was configured as an event handler, but does not exist.");
        }

        target.listenTo(entity, evt, method);
      });
    }

    // Bind the event to a supplied callback function
    function bindToFunction(target, entity, evt, method){
        target.listenTo(entity, evt, method);
    }

    // Bind the event to handlers specified as a string of
    // handler names on the target object
    function unbindFromStrings(target, entity, evt, methods){
      var methodNames = methods.split(/\s+/);

      _.each(methodNames,function(methodName) {
        var method = target[methodName];
        target.stopListening(entity, evt, method);
      });
    }

    // Bind the event to a supplied callback function
    function unbindToFunction(target, entity, evt, method){
        target.stopListening(entity, evt, method);
    }


    // generic looping function
    function iterateEvents(target, entity, bindings, functionCallback, stringCallback){
      if (!entity || !bindings) { return; }

      // allow the bindings to be a function
      if (_.isFunction(bindings)){
        bindings = bindings.call(target);
      }

      // iterate the bindings and bind them
      _.each(bindings, function(methods, evt){

        // allow for a function as the handler,
        // or a list of event names as a string
        if (_.isFunction(methods)){
          functionCallback(target, entity, evt, methods);
        } else {
          stringCallback(target, entity, evt, methods);
        }

      });
    }

    // Export Public API
    Events.bindEntityEvents = function(target, entity, bindings){
      iterateEvents(target, entity, bindings, bindToFunction, bindFromStrings);
    };

    Events.unbindEntityEvents = function(target, entity, bindings){
      iterateEvents(target, entity, bindings, unbindToFunction, unbindFromStrings);
    };

  })();


})();