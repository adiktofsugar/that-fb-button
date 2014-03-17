var Deferred;
(function () {

	Deferred = function () {
		this.callbacks = [];
		_.bindAll(this, "done", "resolve");
		return this;
	};

	_.extend(Deferred.prototype, {
		done: function (cb, context) {
			this.callbacks.push({
				cb: cb,
				context: context
			});

			if (this.isResolved) {
				this.resolve();
			}
		},
		resolve: function () {
			var args = _.toArray(arguments);
			if (args) {
				this.resolvedArgs = args;
			}

			var resolvedArgs = this.resolvedArgs;
			if (!resolvedArgs) {
				resolvedArgs = [];
			}

			this.isResolved = true;

			this.callbacks.reverse();
			while (this.callbacks.length) {
				var cb = this.callbacks.pop();

				setTimeout(function () {
					cb.cb.apply(cb.context, resolvedArgs);
				}, 0);
			}
		}
	});

})();