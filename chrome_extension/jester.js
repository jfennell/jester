/*
 * Injectable js to let you navigate through webcomics with arrow keys.
 */
(function() {

var navigatorDirectory = {
	"www.girlgeniusonline.com": {
		prev: function() {
			return $('#MainTable div a img[alt*="Previous"]'
				).first().parent().attr('href');
		},
		next: function() {
			return $('#MainTable div a img[alt*="Next"]'
				).first().parent().attr('href');
		},
		comic: function() {
			return $('#MainTable img[alt="Comic"]').first();
		}
	}
};
	

var main = function() {
	console.log('main function is executing');

	var host = new Uri(location.href).host();
	var navigator = navigatorDirectory[host];
	if (!navigator) { 
		console.log('failed to find navigator for host "' + host + '"');
		return; 
	}

	// Scroll to the top of the comic (display as much as possible)
	var comic = navigator.comic();
	$(document).scrollTop(comic.offset().top);

	// Grab the prev & next url for navigation
	var prevUrl = navigator.prev();
	var nextUrl = navigator.next();

	$(document).on('keydown', function(evt) {
		console.log('keydown handler is executing');
		
		// Left
		if (prevUrl !== undefined && evt.which === 37) { 
			location.replace(prevUrl);
		// Right
		} else if (nextUrl !== undefined && evt.which === 39) {
			location.replace(nextUrl);
		}
		// Do I need .preventDefault() or .stopPropagation()?
	});
};

main();

})();

