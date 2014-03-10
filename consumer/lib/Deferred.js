var Deferred;
(function () {

	Deferred = function () {
		this.callbacks = [];
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
		resolve: function (args) {
			if (args) {
				this.resolvedArgs = args;
			}

			var resolvedArgs = this.resolvedArgs;

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