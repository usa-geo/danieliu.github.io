(function () {
    var countdown = document.querySelector('.countdown time'),
        date = new Date(countdown.getAttribute('datetime')),
        days, hours, minutes, seconds;

    // Calculate number of seconds
    var tdelta = parseInt((date - Date.now()) / 1000);

    function setMessage(msg) {
        document.querySelector('.message').textContent = msg;
    }

    function getRemainingTime(time) {
        days = parseInt(time / (60 * 60 * 24), 10);
        hours = parseInt((time / (60 * 60)) % 24, 10);
        minutes = parseInt(time / 60 % 60, 10);
        seconds = parseInt((time % 60), 10);

        return [days, hours, minutes, seconds];
    }

    function updateCounters(remaining) {
        var labels = document.querySelectorAll('.label'),
            counters = document.querySelectorAll('.count'),
            units = ['day', 'hour', 'minute', 'second'];

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

    function embedVid() {
        var container = document.querySelector('.countdown'),
            frameContainer = document.createElement('div'),
            embed = document.createElement('iframe'),
            w = window.innerWidth,
            attrs = {
                src: 'https://www.youtube.com/embed/s0SUEMGZU04?autoplay=1&color=white&showinfo=0&rel=0&end=60',
                frameborder: 0,
                allowfullscreen: ''
            };

        attrs.width = w < 400 ? w : 400;
        attrs.height = attrs.width * 3 / 4;

        for (var key in attrs) {
            embed.setAttribute(key, attrs[key]);
        }

        frameContainer.setAttribute('class', 'vid-container');
        frameContainer.appendChild(embed);

        // container.replaceChild(frameContainer, countdown);
        container.insertBefore(frameContainer, countdown);
    }


    if (tdelta > 0) {
        // Initialize to show values immediately
        updateCounters(getRemainingTime(tdelta--));
        setMessage("until Claudia leaves :(");

        var timer = setInterval(function () {
            updateCounters(getRemainingTime(tdelta--));
            if (tdelta <= 0) {
                clearInterval(timer);
                embedVid();
            }
        }, 1000);
    } else {
        tdelta = -tdelta;
        updateCounters(getRemainingTime(tdelta++));
        setMessage("since Claudia left :(");
        var countUp = setInterval(function () {
            updateCounters(getRemainingTime(tdelta++));
        }, 1000);
        embedVid();
    }
})();