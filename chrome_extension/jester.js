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
        // Doesn't have a random button
        random: function() {},
        comic: function() {
            return $('#MainTable img[alt="Comic"]').first();
        }
    },
    // There are multiple comics on this domain, but they
    // are uniform enough to all work!
    "www.cad-comic.com": {
        prev: function() {
            return $('div.navigation a.nav-back'
                ).first().attr('href');
        },
        next: function() {
            return $('div.navigation a.nav-next'
                ).first().attr('href');
        },
        random: function() {
            return $('div.navigation a.nav-random'
                ).first().attr('href');
        },
        comic: function() {
            return $('div#content img');
        }
    },
    "www.penny-arcade.com": {
        prev: function() {
            return $('ul.newsNav a.btnPrev'
                ).first().attr('href');
        },
        next: function() {
            return $('ul.newsNav a.btnNext'
                ).first().attr('href');
        },
        random: function() {},
        comic: function() {
            return $('div.comic.post img');
        }
    },
    "xkcd.com": {
        prev: function() {
            return $('ul.comicNav a[rel="prev"]'
                ).first().attr('href');
        },
        next: function() {
            return $('ul.comicNav a[rel="next"]'
                ).first().attr('href');
        },
        random: function() {
            return "http://dynamic.xkcd.com/random/comic/";
        },
        comic: function() {
            return $('#comic img');
        }
    }
};


var main = function() {
    var host = new Uri(location.href).host();
    var navigator = navigatorDirectory[host];
    if (!navigator) {
        console.log('failed to find navigator for host "' + host + '"');
        return;
    }

    // Scroll to the top of the comic (display as much as possible)
    var comic = navigator.comic();
    if (comic !== undefined) {
        $(document).scrollTop(comic.offset().top);
    }

    // Grab the prev & next url for navigation
    var prevUrl = navigator.prev();
    var nextUrl = navigator.next();
    var randUrl = navigator.random();

    $(document).on('keydown', function(evt) {
        // Left
        if (prevUrl !== undefined && evt.which === 37) {
            location.replace(prevUrl);
        // Right
        } else if (nextUrl !== undefined && evt.which === 39) {
            location.replace(nextUrl);
        // Random
        } else if (randUrl !== undefined && evt.which === 82) {
            location.replace(randUrl);
        }
    });
};

main();

})();

