// ==UserScript==
// @name           Girl Genius Paging
// @namespace      http://www.jasonfennell.com
// @description    Let you navigate forward and back with left and right arrows
// @include        http://www.girlgeniusonline.com/comic.php?*
// ==/UserScript==

// Don't run on frames or iframes
if (window.top != window.self) { return; }

var girlGenius = function() {
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

	// Handle left/right arrows to navigate
	var handleArrow = function(e) {
		if (e.which === 37 && nav["prev"] !== undefined) { // Left
			location.replace(nav["prev"]);
		} else if (e.which === 39 && nav["next"] !== undefined) { // Right
			location.replace(nav["next"]);
		}
	}
	document.addEventListener("keydown", handleArrow, true);
}

girlGenius();
