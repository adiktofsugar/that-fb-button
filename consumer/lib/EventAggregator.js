var EventAggregator;
(function () {

	EventAggregator = function () {
		_.extend(this, Events);
		_.bindAll(this, "on", "off", "trigger",
			"forwardEvents", "unforwardEvents");
	};
	_.extend(EventAggregator.prototype, {
		forwardEvents: function (entity, prefix) {
			var vent = this;

			if (!entity) {
				throw new Error("Entity must be passed to EventAggregator.bindEvents!");
			}
			if (!prefix) {
				throw new Error("Prefix must be passed to EventAggregator.bindEvents!");
			}

			this._bindEventsListener = function (eventName) {
				var args = _.toArray(arguments).slice(1);
				var realEventName = prefix + ":" + eventName;

				args = [realEventName, entity].concat(args);

				vent.trigger.apply(vent, args);
			};

			entity.on("all", this._bindEventsListener);
		},
		unforwardEvents: function (entity) {
			if (this._bindEventsListener) {
				entity.off("all", this._bindEventsListener);
			}
		}
	});

})();