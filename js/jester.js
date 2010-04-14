/**
 * Object to track state and move through
 * Questionable Content urls.
 */
var QC = {
	'comicId': 1600,

	'imageCache': {},

	'checkCache': function() {
		var img = this.imageCache[this.comicId];
		if (img === undefined) {
			img = new Image()
			this.imageCache[this.comicId] = img;
			img.src = this.url();
		}
		return img.src;
	},

	'url': function() {
		return "http://questionablecontent.net/comics/" + this.comicId + ".png";
	},

	'next': function() {
		this.comicId += 1;
		return this.checkCache();
	},

	'prev': function() {
		this.comicId -= 1;
		return this.checkCache();
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
