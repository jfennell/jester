var MaskedManor = function() {
    var comicId = -1;
    var warmWindow =  5;
    var comicCache = {};
    var masked_manor_urls = [
        "http://www.maskedmanor.com/comics/2010-02-01-5c2bfa5b.jpg",
        "http://www.maskedmanor.com/comics/2010-02-02-2e89aee2.jpg",
        "http://www.maskedmanor.com/comics/2010-02-03-017517f6.jpg",
        "http://www.maskedmanor.com/comics/2010-02-04-f859e1c9.jpg",
        "http://www.maskedmanor.com/comics/2010-02-05-cd16cb59.jpg",
        "http://www.maskedmanor.com/comics/2010-02-08-600b3ffe.jpg",
        "http://www.maskedmanor.com/comics/2010-02-09-059d7cb3.jpg",
        "http://www.maskedmanor.com/comics/2010-02-10-63df113f.jpg",
        "http://www.maskedmanor.com/comics/2010-02-11-55117ef8.jpg",
        "http://www.maskedmanor.com/comics/2010-02-12-ed2492ba.jpg",
        "http://www.maskedmanor.com/comics/2010-02-13-d0805a8f.jpg",
        "http://www.maskedmanor.com/comics/2010-02-15-8324c12a.jpg",
        "http://www.maskedmanor.com/comics/2010-02-16-dc486cd0.jpg",
        "http://www.maskedmanor.com/comics/2010-02-17-9b625d2f.jpg",
        "http://www.maskedmanor.com/comics/2010-02-18-a4da815b.jpg",
        "http://www.maskedmanor.com/comics/2010-02-19-da7edbbc.jpg",
        "http://www.maskedmanor.com/comics/2010-02-22-b932a21d.jpg",
        "http://www.maskedmanor.com/comics/2010-02-23-c2e02b9e.jpg",
        "http://www.maskedmanor.com/comics/2010-02-24-7ba6d785.jpg",
        "http://www.maskedmanor.com/comics/2010-02-25-a9218828.jpg",
        "http://www.maskedmanor.com/comics/2010-02-26-6b704231.jpg",
        "http://www.maskedmanor.com/comics/2010-03-01-907763d0.jpg",
        "http://www.maskedmanor.com/comics/2010-03-02-8c7b72c8.jpg",
        "http://www.maskedmanor.com/comics/2010-03-03-45f19c04.jpg",
        "http://www.maskedmanor.com/comics/2010-03-04-090f94d3.jpg",
        "http://www.maskedmanor.com/comics/2010-03-05-b4f61c71.jpg",
        "http://www.maskedmanor.com/comics/2010-03-08-88cedf66.jpg",
        "http://www.maskedmanor.com/comics/2010-03-09-5e89809f.jpg",
        "http://www.maskedmanor.com/comics/2010-03-10-2ede3da6.jpg",
        "http://www.maskedmanor.com/comics/2010-03-11-66923939.jpg",
        "http://www.maskedmanor.com/comics/2010-03-12-ca6a838a.jpg",
        "http://www.maskedmanor.com/comics/2010-03-15-22386724.jpg",
        "http://www.maskedmanor.com/comics/2010-03-16-0fb8b53a.jpg",
        "http://www.maskedmanor.com/comics/2010-03-17-3a83bf53-ad7e7c81.jpg",
        "http://www.maskedmanor.com/comics/2010-03-18-8e01bf7c.jpg",
        "http://www.maskedmanor.com/comics/2010-03-19-a8ad683c.jpg",
        "http://www.maskedmanor.com/comics/2010-03-22-46477ad1.jpg",
        "http://www.maskedmanor.com/comics/2010-03-23-43317383.jpg",
        "http://www.maskedmanor.com/comics/2010-03-24-746ba356.jpg",
        "http://www.maskedmanor.com/comics/2010-03-25-708f5e93.jpg",
        "http://www.maskedmanor.com/comics/2010-03-26-7b3babf3.jpg",
        "http://www.maskedmanor.com/comics/2010-03-29-7bcfbc24.jpg",
        "http://www.maskedmanor.com/comics/2010-03-30-d828afe5.jpg",
        "http://www.maskedmanor.com/comics/2010-03-31-c8b24935.jpg",
        "http://www.maskedmanor.com/comics/2010-04-01-c8cf1a98.jpg",
        "http://www.maskedmanor.com/comics/2010-04-02-10e5456e.jpg",
        "http://www.maskedmanor.com/comics/2010-04-05-22ec0768.jpg",
        "http://www.maskedmanor.com/comics/2010-04-06-2fdbd0a7.jpg",
        "http://www.maskedmanor.com/comics/2010-04-07-8bc8f1f3.jpg",
        "http://www.maskedmanor.com/comics/2010-04-08-59d48aa1.jpg",
        "http://www.maskedmanor.com/comics/2010-04-09-8d2d369d.jpg",
        "http://www.maskedmanor.com/comics/2010-04-12-9c847974.jpg",
        "http://www.maskedmanor.com/comics/2010-04-13-74f82a48.jpg",
        "http://www.maskedmanor.com/comics/2010-04-14-38fa20ed.jpg",
        "http://www.maskedmanor.com/comics/2010-04-15-8ac67c87.jpg",
        "http://www.maskedmanor.com/comics/2010-04-16-5416cba5.jpg",
        "http://www.maskedmanor.com/comics/2010-04-19-c8709aaa.jpg",
        "http://www.maskedmanor.com/comics/2010-04-20-6c481afc.jpg",
        "http://www.maskedmanor.com/comics/2010-04-21-3842335c.jpg",
        "http://www.maskedmanor.com/comics/2010-04-22-15b67db8.jpg",
        "http://www.maskedmanor.com/comics/2010-04-23-6ab15b67.jpg",
        "http://www.maskedmanor.com/comics/2010-04-26-fbf40fbe.jpg",
        "http://www.maskedmanor.com/comics/2010-04-27-49aa519e.jpg",
        "http://www.maskedmanor.com/comics/2010-04-28-c00521f9.jpg",
        "http://www.maskedmanor.com/comics/2010-04-29-9308cbdd.jpg",
        "http://www.maskedmanor.com/comics/2010-04-30-1a5828d5.jpg",
        "http://www.maskedmanor.com/comics/2010-05-03-8dd70f46.jpg"
    ];

    /**
     * Retrieve a comic, caching it as a side effect.
     */
    var getComic = function(n) {
        if (n < 0 || n >= masked_manor_urls.length) {
            return undefined;
        }

        var comic = comicCache[n];
        if (comic === undefined) {
            comic = new Image();
            comicCache[n] = comic;
            comic.src = masked_manor_urls[n];
        }
        return comic;
    };

    /**
     * Get extra comics so we pre-cache for smoother navigation
     */
    var warmForward = function(n) {
        for(var i = 0; i <= warmWindow; i += 1) {
            this.getComic(n + i);
        }
    };

    var next = function() {
        comicId += 1;
        this.warmForward(comicId);
        var comic = this.getComic(comicId);
        return comic.src;
    };

    var prev = function() {
        comicId -= 1;
        var comic = this.getComic(comicId);
        return comic.src;
    };

    return {
        'getComic': getComic,
        'warmForward': warmForward,
        'prev': prev,
        'next': next
    };
}();

function makeMover(comic) {
    var img = document.getElementById("pic");
    var testDiv = document.getElementById("test-div");
    return function(e) {
        if (e.which == 37) { // Left
            img.src = comic.prev();
        } else if (e.which == 39) { // Right
            img.src = comic.next();
        }
        //testDiv.firstChild.data = comic.getComicId();
    };
};

window.onload = function() {
    window.onkeydown = makeMover(MaskedManor)
}
