// ==UserScript==
// @name           Megatokyo Paging
// @namespace      http://www.jasonfennell.com
// @description    Let you navigate forward and back with left and right arrows
// @include        http://megatokyo.com/strip*
// ==/UserScript==

// Don't run on frames or iframes
if (window.top != window.self) { return; }

var megatokyo = function() {
	var prevComicAlt = "The Previous Comic";
	var nextComicAlt = "The Next Comic";

	var nav = {};
	var prevs = document.getElementsByClassName("prev");
	if (prevs.length > 0 && prevs[0].children.length > 0) {
		nav["prev"] = prevs[0].children[0].href;
	}
	var nexts = document.getElementsByClassName("next");
	if (nexts.length > 0 && nexts[0].children.length > 0) {
		nav["next"] = nexts[0].children[0].href;
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

megatokyo();
