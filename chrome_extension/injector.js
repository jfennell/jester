// Not currently used, but handy recipie for getting
// jQuery into a console to mess with the page.
var _anchor = (document.head||document.documentElement);

var s = document.createElement('script');
s.src = "//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js";
_anchor.appendChild(s);

var s = document.createElement('script');
s.src = "//jsuri.googlecode.com/files/jsuri-1.1.1.js"
_anchor.appendChild(s);

var s = document.createElement('script');
s.src = chrome.extension.getURL("fairlocal.js");
_anchor.appendChild(s);
