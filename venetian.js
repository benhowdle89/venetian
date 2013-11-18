!(function() {

    function Venetian(el) {
        if (this === window) {
            return new Venetian(el);
        }
        if (!el) {
            throw new Error('You must supply a valid DOM element');
        }
        if (el.length) {
            for (var i = el.length - 1; i >= 0; i--) {
                return new Venetian(el[i]);
            }
        }
        this.el = el;
        window.addEventListener('load', function() {
            this.populate();
            this.init();
        }.bind(this));
        window.addEventListener('resize', function() {
            this.populate();
        }.bind(this));
    }

    Venetian.prototype.populate = function() {
        this.items = this.el.children;
        this.total = this.items.length;
        this.width = this.el.clientWidth;
        this.division = Math.floor(this.width / this.total);
    };

    Venetian.prototype.showItem = function(index) {
        for (var i = 0; i < this.total; i++) {
            this.items[i].style.display = (i === index) ? 'block' : 'none';
        }
        this.cleanUp();
    };

    Venetian.prototype.moveHandler = function(mouseLeft) {
        var posLeft = this.el.getBoundingClientRect().left,
            position = mouseLeft - posLeft;
        if (position < 0) {
            position = 0;
        } else if (position > this.width) {
            position = this.width;
        }
        var section = ~~ ((position / this.width) * this.total);
        this.showItem(section);
    };

    Venetian.prototype.cleanUp = function() {
        var hidden = [];
        for (var i = 0; i < this.total; i++) {
            if (this.items[i].style.display == 'none') {
                hidden.push(true);
            }
        }
        if(hidden.length === this.total){
            this.items[0].style.display = 'block';
        }
    };

    Venetian.prototype.init = function() {

        if (this.items.length < 2) {
            return;
        }

        this.items[0].style.display = 'block';

        this.el.addEventListener('mousemove', function(e) {
            this.moveHandler(e.x);
        }.bind(this));

        this.el.addEventListener('touchmove', function(e) {
            this.moveHandler(e.targetTouches[0].screenX);
        }.bind(this));

    };

    if ('jQuery' in window) {
        $.fn.venetian = function() {
            return this.each(function() {
                new Venetian(this);
            });
        };
    }

    window.Venetian = Venetian;
})();