var QC = {
	'comicId': 1600,

	'url': function() {
		return "http://questionablecontent.net/comics/" + this.comicId + ".png";
	},

	'next': function() {
		this.comicId += 1;
		return this.url();
	},

	'prev': function() {
		this.comicId -= 1;
		return this.url();
	}
};

function makeMover(qc) {
	return function(e) {
		var img = document.getElementById("pic");
		if (e.which == 37) { // Left
			img.src = qc.prev();
		} else if (e.which == 39) { // Right
			img.src = qc.next();
		}
	};
};

document.onkeydown = makeMover(QC);
