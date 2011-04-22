javascript: (function() {
	// Don't run on frames or iframes
	if (window.top != window.self) { return; }

	var prevComicAlt = "The Previous Comic";
	var nextComicAlt = "The Next Comic";

	var imgs = document.getElementsByTagName("img");

	var nav = {}
	// Figure out the next/prev urls
	for (var i = 0; i < imgs.length; ++i) {
		if (imgs[i].alt === prevComicAlt) {
			nav["prev"] = imgs[i].parentNode.href;	
		} else if (imgs[i].alt === nextComicAlt) {
			nav["next"] = imgs[i].parentNode.href;
		}
	}

	//alert("Prev: " + nav["prev"] + "\nNext: " + nav["next"] + "\nlocaction.href: " + location.href);

	// Handle left/right arrows to navigate
	var handleArrow = function(e) {
		if (e.which === 37 && nav["prev"] !== undefined) { // Left
			//alert("Saw left");
			location.href = nav["prev"];
		} else if (e.which === 39 && nav["next"] !== undefined) { // Right
			//alert("Saw right");
			location.href = nav["next"];
		}
	}
	document.addEventListener("keydown", handleArrow, true);
})();
