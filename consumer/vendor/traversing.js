var traversing;
(function () {

	traversing = {};

	var rneedsContext = Sizzle.selectors.match.needsContext;


	// From jquery src/traversing.js
	// but modified to take an element as the first arg
	// and took out some extra complexity...so it's actually pretty heavily modified
	traversing.closest = function( element, selectors, context ) {
		var cur,
			match;

		for ( cur = element; cur && cur !== context; cur = cur.parentNode ) {

			// Always skip document fragments
			if ( cur.nodeType < 11 &&
				// Don't pass non-elements to Sizzle
				cur.nodeType === 1 &&
				
				Sizzle.matchesSelector(cur, selectors)) {

				match = cur;
				break;
			}
		}

		return match;
	};


})();