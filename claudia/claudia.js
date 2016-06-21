(function () {
    var countdown = document.querySelector('.countdown time'),
        date = new Date(countdown.getAttribute('datetime')),
        days, hours, minutes, seconds;

    var labels = document.querySelectorAll('.label'),
        counters = document.querySelectorAll('.count');

    var units = ['day', 'hour', 'minute', 'second'];

    // Calculate number of seconds
    var tdelta = parseInt((date - new Date(Date.now())) / 1000);

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

    if (tdelta > 0) {
        // Initialize to show values immediately
        updateCounters(counters, labels, units, getRemainingTime(tdelta--));

        var timer = setInterval(function () {
            updateCounters(counters, labels, units, getRemainingTime(tdelta--));
            if (tdelta < 0) {
                clearInterval(timer);
            }
        }, 1000);
    }
})();