!(function() {

    function Venetian(el) {
        if (this === window) {
            return new Venetian(el);
        }
        if (!el) {
            throw new Error('You must supply a valid DOM element');
        }
        this.el = el;
        window.addEventListener('load', this.run.bind(this));
    }

    Venetian.prototype.run = function() {
        var venetian = this.el,
            items = venetian.children,
            total = items.length,
            width = venetian.clientWidth,
            division = Math.floor(width / total);

        if (items.length < 2) {
            return;
        }

        items[0].style.display = 'block';

        venetian.addEventListener('mousemove', function(e) {
            var left = e.x;
            var section = ~~((left / width) * total);
            showImage(section);
        });

        function showImage(index) {
            for (var i = 0; i < total; i++) {
                items[i].style.display = (i === index) ? 'block' : 'none';
            }
        }
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