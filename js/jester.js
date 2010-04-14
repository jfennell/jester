/**
 * Object to track state and move through
 * Questionable Content urls.
 */
var QC = {
	'comicId': 1600,
	'warmWindow': 2,
	'comicCache': {},

	'url': function(n) {
		// TODO: Add some validation here.
		return "http://questionablecontent.net/comics/" + n + ".png";
	},

	/**
	 * Cached getter of the comic with id `n`.
	 */
	'getComic': function(n) {
		var comic = this.comicCache[n];
		if (comic === undefined) {
			comic = new Image();
			this.comicCache[n] = comic;
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
		for(var i = -this.warmWindow; i <= this.warmWindow; i += 1) {
			this.getComic(n + i);
		}
	},

	'next': function() {
		this.comicId += 1;
		this.warmSurrounding(this.comicId);
		var comic = this.getComic(this.comicId);
		return comic.src;
	},

	'prev': function() {
		this.comicId -= 1;
		this.warmSurrounding(this.comicId);
		var comic = this.getComic(this.comicId);
		return comic.src;
	}
};

/**
 * Factory function that makes an event handler to
 * handle left & right arrow keys for moving along
 * a list maintained by the object passed into
 * the factory.
 */
function makeMover(qc) {
	return function(e) {
		var img = document.getElementById("pic");
		if (e.which == 37) { // Left
			img.src = qc.prev();
		} else if (e.which == 39) { // Right
			img.src = qc.next();
		}
		document.getElementById("test-div").firstChild.data = qc.comicId;
	};
};

document.onkeydown = makeMover(QC);
