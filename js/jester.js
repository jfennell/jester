/**
 * Object to track state and move through
 * Questionable Content urls.
 */
jester = {}

jester.QC = {
    comicId: 1600,
    warmWindow: 2,
    comicCache: {},

    url: function(n) {
        // TODO: Add some validation here.
        return "http://questionablecontent.net/comics/" + n + ".png";
    },

    /**
     * Cached getter of the comic with id `n`.
     */
    getComic: function(n) {
        if (n === undefined) {
            n = this.comicId;
        }

        var comic = this.comicCache[n];
        if (comic === undefined) {
            comic = new Image();
            this.comicCache[n] = comic;
            comic.src = this.url(n);
        }
        return comic;
    },

    /**
     * Hit the getComic function repeatedly to (in the background)
     * start image retrievals for a few comics before and after
     * the current one.
     *
     * Should this do getComic(n) first to give it some sort of priority?
     * We want the *current* one to load as fast as possible.
     *
     * NOTE: In standard use case probably want a longer forward
     * window than backward window because you are reading the strip forward.
     *
     * Additionally, might want to do LRU cache or something... need
     * to ask jlatt or somebody about how you profile memory useage of
     * your js.
     */
    warmSurrounding: function(n) {
        for(var i = -this.warmWindow; i <= this.warmWindow; i += 1) {
            this.getComic(n + i);
        }
    },

    jump: function(n) {
        this.comicId = n;
        this.warmSurrounding(n);
        return this.getComic(n);
    },

    next: function() {
        return this.jump(this.comicId + 1);
    },

    prev: function() {
        return this.jump(this.comicId - 1);
    },

    /**
     * Attache the QC class so that it fills in the
     * DOM element `elt`.
     */
    attach: function(elt) {
        var qc = this;

        // Create a container for the comics to be displayed in
        var container = document.createElement("div");
        var img = document.createElement("img");

        var form = document.createElement("form");
        var labelInput = document.createElement("input");
        labelInput.type = "text";
        $(form).append(labelInput);

        $(img).height(1140);

        qc.updateComic = function(n) {
            var comic = qc.jump(n);
            img.src = comic.src;
            $(labelInput).val(qc.comicId);
        }
        qc.updateComic(qc.comicId);

        $(container).append(img).append(form);
        $(elt).append(container);

        // Bind a callback to the keyup event
        // that will update the container when
        // the user hits left & right arrow keys
        $(document).keyup(function(evt) {
            if(evt.which == 37) { // Left
                qc.updateComic(qc.comicId - 1);
            } else if (evt.which == 39) { // Right
                qc.updateComic(qc.comicId + 1);
            }
        });

        // Bind a callback to the form submit
        $(form).submit(function(evt) {
            evt.preventDefault();
            var jumpTo = parseInt($(labelInput).val());
            qc.updateComic(jumpTo);
        });
    }
}

$(document).ready(function() {
    jester.QC.attach($('body')[0])
});
