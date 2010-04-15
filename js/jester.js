/**
 * TODO: 
 * 1. Add a form input & jump-to-comic
 * 2. Clean up object initialization
 */
/**
 * Object to track state and move through
 * Questionable Content urls.
 */
var QC = function() {
	var comicId = 1600;
	var warmWindow = 2;
	var comicCache = {};

	return {
		'url': function(n) {
			// TODO: Add some validation here.
			return "http://questionablecontent.net/comics/" + n + ".png";
		},

		'setComicId': function(n) {
			comicId = n;
		},

		'getComicId': function() {
			return comicId;
		},

		/**
		 * Cached getter of the comic with id `n`.
		 */
		'getComic': function(n) {
			var comic = comicCache[n];
			if (comic === undefined) {
				comic = new Image();
				comicCache[n] = comic;
				comic.src = this.url(n);
			}
			return comic;
		},

		/**
		 * Hit the getComic function repeatedly to (in the background)
		 * start image retrievals for a few comics before and after
		 * the current one.
		 *
		 * Should this do getComic(n) first to give it some sort of priority?
		 * We want the *current* one to load as fast as possible.
		 *
		 * NOTE: In standard use case probably want a longer forward
		 * window than backward window because you are reading the strip forward.
		 *
		 * Additionally, might want to do LRU cache or something... need
		 * to ask jlatt or somebody about how you profile memory useage of
		 * your js.
		 */
		'warmSurrounding': function(n) {
			for(var i = -warmWindow; i <= warmWindow; i += 1) {
				this.getComic(n + i);
			}
		},

		'next': function() {
			comicId += 1;
			this.warmSurrounding(comicId);
			var comic = this.getComic(comicId);
			return comic.src;
		},

		'prev': function() {
			comicId -= 1;
			this.warmSurrounding(comicId);
			var comic = this.getComic(comicId);
			return comic.src;
		}
	}
}();

/**
 * Factory function that makes an event handler to
 * handle left & right arrow keys for moving along
 * a list maintained by the object passed into
 * the factory.
 */
function makeMover(qc) {
	var img = document.getElementById("pic");
	var testDiv = document.getElementById("test-div");
	return function(e) {
		if (e.which == 37) { // Left
			img.src = qc.prev();
		} else if (e.which == 39) { // Right
			img.src = qc.next();
		}
		testDiv.firstChild.data = qc.getComicId();
	};
};

//document.onkeydown = makeMover(QC);
// Only instrument once all the DOM elements are created....
// seems ghetto
// ???: Why does this only work with 'window' and not 'document'
window.onload = function() {
	document.onkeydown = makeMover(QC);
}
