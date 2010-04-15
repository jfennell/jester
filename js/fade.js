function fade(node) {
	var color = 0;	
	function doFade() {
		node.bgColor = "#FFFF" + color.toString(16);
		if (color < 255) {
			color += 1;
			setTimeout(doFade, 10);
		}
	}
	setTimeout(doFade, 10);
}

// Requires including the script in the footer after
// the body tag has been initialized
fade(document.body);
