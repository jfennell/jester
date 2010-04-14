
/*
document.onkeydown = function(e) {
	// 37 is left, 39 is right, 32 is space
	//alert("Got a keydown event!.  It is: " + e.which);
	var outdiv = document.getElementById("test-div");
	outdiv.firstChild.data = e.which;
}
*/

/*
document.onkeydown = function(e) {
	var img = document.getElementById("pic");
	if (e.which == 37) {
		img.src = "img/1.jpg";	
	} else if (e.which == 39) {
		img.src = "img/2.jpg";
	} else if (e.which == 32) {
		img.src = qcUrl(1641);
	} else {
		img.src = "img/3.jpg";
	}
}
*/

// QC url
// http://questionablecontent.net/comics/1641.png
function qcUrl(n) {
	return "http://questionablecontent.net/comics/" + n + ".png";
}

var qcStart = 1600;

function qcNextUrl() {
	qcStart += 1;
	return qcUrl(qcStart);
}

function qcPrevUrl() {
	qcStart -= 1;
	return qcUrl(qcStart);
}

// TODO: move to === ?
function qcMove(e) {
	var img = document.getElementById("pic");
	if (e.which == 37) { // Left
		img.src = qcPrevUrl();
	} else if (e.which == 39) {
		img.src = qcNextUrl();
	} else if (e.which = 32) {
		img.src = qcNextUrl();
	}
}

document.onkeydown = qcMove;
