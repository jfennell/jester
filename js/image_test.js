var img1 = new Image();
img1.src = "img/1.jpg";
var img2 = new Image();
img2.src = "img/2.jpg";
var img3 = new Image();
img3.src = "img/3.jpg";

document.onkeydown = function(e) {
	var img = document.getElementById("pic");
	var out = document.getElementById("test-div");
	if (e.which == 37) { // Left
		out.firstChild.data = "Left";
		img.src = img1.src;
	} else if (e.which == 39) { // Right
		out.firstChild.data = "Right";
		img.src = img2.src;
	} else {
		out.firstChild.data  = "Other";
		img.src = img3.src;
	}
};
