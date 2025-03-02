(function ($) {
    $.fn.countdownTimer = function (options) {
        var settings = $.extend({ startTime: new Date("September 19, 2024 00:00:00 UTC+0800") }, options);

        var container = $(this);
        var secondsEl = container.find(".time.seconds");
        var minutesEl = container.find(".time.minutes");
        var hoursEl = container.find(".time.hours");
        var daysEl = container.find(".time.days");

        function updateCountdown() {
            var now = new Date();
            var timeElapsed = now - settings.startTime; // Time since September 19, 2024

            // Calculate total days since September 19, 2024
            var totalDaysElapsed = Math.max(0, Math.floor(timeElapsed / (1000 * 60 * 60 * 24)));

            // Calculate how much time has passed today (hours, minutes, seconds)
            var startOfToday = new Date();
            startOfToday.setHours(0, 0, 0, 0); // Set time to midnight (start of today)

            var timePassedToday = now - startOfToday;
            var hours = Math.floor((timePassedToday / (1000 * 60 * 60)) % 24);
            var minutes = Math.floor((timePassedToday / (1000 * 60)) % 60);
            var seconds = Math.floor((timePassedToday / 1000) % 60);

            updateValue(daysEl, totalDaysElapsed);
            updateValue(hoursEl, hours);
            updateValue(minutesEl, minutes);
            updateValue(secondsEl, seconds);
        }

        function updateValue(el, value) {
            var strValue = value.toString().padStart(2, "0");

            if (Modernizr.cssanimations) {
                var oldValue = el.find(".value").addClass("fadeOutDown animated");
                var newValue = $("<div class='value'>" + strValue + "</div>");
                el.prepend(newValue);
                newValue.addClass("fadeInDown animated");

                setTimeout(function () {
                    oldValue.remove();
                }, 200);
            } else {
                el.find(".value").text(strValue);
            }
        }

        // Update countdown every second
        var countdownInterval = setInterval(updateCountdown, 1000);
        updateCountdown(); // Run immediately on page load

        return this;
    };
})(jQuery);
