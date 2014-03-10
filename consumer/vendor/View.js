// Parts of backbone View, modified to work with my libs

var View;
(function () {

	// Cached regex to split keys for `delegate`.
	var delegateEventSplitter = /^(\S+)\s*(.*)$/;

	var cid = 0;

	View = {
		create: function (element, name) {
			var t = {};

			_.extend(t, this);

			t.cid = cid++;
			t.name = name;
			t.setElement( element );

			if (t.initialize) {
				t.initialize.apply(t, arguments);
			}

			return t;
		},

		setElement: function (element) {
			this.el = element;
			this.delegateEvents();
		},

		
		delegateEvents: function () {
			var self = this;

			events = _.result(this, 'events');
			if (!events) {
				return this;
			}
			
			this.undelegateEvents();
			
			for (var key in events) {
				var method = events[key];
				if (!_.isFunction(method)) method = this[events[key]];
				if (!method) continue;

				var match = key.match(delegateEventSplitter);
				var eventName = match[1], selector = match[2];
				
				method = _.bind(method, this);
				eventName += '.delegateEvents' + this.cid;
				
				if (selector === '') {
					//this.$el.on(eventName, method);
					zeptoEvent.on(this.el, eventName, method);
				} else {
					//this.$el.on(eventName, selector, method);
					zeptoEvent.on(this.el, eventName, selector, method);
				}
			}


			
		},

		// Clears all callbacks previously bound to the view with `delegateEvents`.
		// You usually don't need to use this, but may wish to if you have multiple
		// Backbone views attached to the same DOM element.
		undelegateEvents: function() {
			zeptoEvent.off(this.el, '.delegateEvents' + this.cid);
			return this;
		}
	};

})();