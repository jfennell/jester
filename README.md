Jester
======

Jester is a Chrome extension that lets you use arrow
keys to navigate through certain webcomics. It is also easy
to extend it to support new webcomics. 

The navigation is:
 * `left-arrow` for the previous comic & `right-arrow` for the next
 * if the site supports it, `r` picks a random comic
 * supported pages will automatically scroll to the top of the comic image

There is also a `jester.html` file which runs locally and
provides a page that gives you a quick and easy way to
navigate around questionablecontent's web comics. I'll
probably get rid of this at some point.

Making the extension work for your favorite webcomic
----------------------------------------------------
What exactly do you need for a new comic?
 * A function to get url of the previous & next comics.
 * If the site supports random comics, a function to get the random url.
 * A function to get the comic img element, so it can be auto-scrolled to

First you need to do a little bit of research to find the jQuery
selectors needed by Jester to navigate. Lets use Girl Genius as
an example.

Go to a comic page you want to be able navigate from, like [this
one](http://www.girlgeniusonline.com/comic.php?date=20021206) for Girl Genius.
See the Back and Next buttons? We want to write jQuery selectors to extract the
uri they point to. To help you with this, I recommend opening up the Chrome
console and pasting in

	var _anchor = (document.head||document.documentElement);
	var s = document.createElement('script');
	s.src = "//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js";
	_anchor.appendChild(s);

which will inject jQuery on the page. You can then play around with selectors
until you have managed to extract the uris. For table based layouts like Girl
Genius I recommend attribute-based selectors like `#MainTable div a
img[alt*="Previous"]` (though in this case you actually need to hop up to the
parent in order to find the anchor you want).

Once you have your selectors, everything else is quick and easy. Go to
`chrome_extension/jester.js` and add a new entry to the `navigatorDirectory`
object. The key should be the domain of the webcomic of interest and the value
is another object that has `prev`, `next`, `random`, and `comic` defined. The
first three should return the appropriate urls and the last should return the
comic img element.

Finally, go to `chrome_extension/manifest.json` and add your domain to the
`matches` adn `permissions` lists. Now go to `chrome://extensions` (in
Developer mode), reload the extension and hopefully you are good to go!

