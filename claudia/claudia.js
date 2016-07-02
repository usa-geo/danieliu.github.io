(function () {
    var countdown = document.querySelector('.countdown time'),
        date = new Date(countdown.getAttribute('datetime')),
        days, hours, minutes, seconds;

    var labels = document.querySelectorAll('.label'),
        counters = document.querySelectorAll('.count');

    var units = ['day', 'hour', 'minute', 'second'];

    // Calculate number of seconds
    var tdelta = parseInt((date - Date.now()) / 1000);

    function getRemainingTime(time) {
        days = parseInt(time / (60 * 60 * 24), 10);
        hours = parseInt((time / (60 * 60)) % 24, 10);
        minutes = parseInt(time / 60 % 60, 10);
        seconds = parseInt((time % 60), 10);

        return [days, hours, minutes, seconds];
    }

    function updateCounters(counters, labels, units, remaining) {
        for (var i = 0; i < counters.length; i++) {
            var el = counters[i],
                count = remaining[i],
                label = labels[i],
                unit = units[i];

            // Zero-pad values below 10
            el.textContent = count < 10 ? ("0" + count) : count;
            label.textContent = count === 1 ? unit : unit + "s";
        }
    }

    function embedGoodbye() {
        var container = document.querySelector('.countdown'),
            embed = document.createElement('iframe'),
            w = window.innerWidth,
            attrs = {
                src: 'https://www.youtube.com/embed/s0SUEMGZU04?autoplay=1&controls=0&showinfo=0&rel=0',
                frameborder: 0,
                allowfullscreen: ''
            };

        attrs.width = w < 500 ? w : 500;
        attrs.height = attrs.width * 3 / 4;

        for (var key in attrs) {
            embed.setAttribute(key, attrs[key]);
        }

        container.replaceChild(embed, countdown);
    }

    if (tdelta > 0) {
        // Initialize to show values immediately
        updateCounters(counters, labels, units, getRemainingTime(tdelta--));

        var timer = setInterval(function () {
            updateCounters(counters, labels, units, getRemainingTime(tdelta--));
            if (tdelta <= 0) {
                clearInterval(timer);
                embedGoodbye();
            }
        }, 1000);
    } else {
        embedGoodbye();
    }
})();