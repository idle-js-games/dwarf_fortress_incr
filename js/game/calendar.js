'use strict';

var FortressClicker = FortressClicker || {};
FortressClicker.Calendar = (function () {
    return function() {
        var startingYear = 200;
        var daysPerMonth = 28;
        var monthsPerSeason = 3;
        var seasonsPerYear = 4;
        var ticksPerDay = 120;
        var ticksPerMonth = ticksPerDay * daysPerMonth;
        var ticksPerSeason = ticksPerMonth * monthsPerSeason;
        var ticksPerYear = ticksPerSeason * seasonsPerYear;

        var seasons =
        [
            "Spring",
            "Summer",
            "Autumn",
            "Winter"
        ];

        var seasonParts =
        [
            "Early",
            "Mid",
            "Late"
        ];

        var months =
        [
            "Granite",
            "Slate",
            "Felsite",
            "Hematite",
            "Malachite",
            "Galena",
            "Limestone",
            "Sandstone",
            "Timber",
            "Moonstone",
            "Opal",
            "Obsidian"
        ];

        this.currentTick = 0;
        this.currentDate = "";

        this.tick = function() {
            this.currentTick++;
            this.currentDate = getDateString(this.currentTick);
        };

        var getDateString = function(ticks) {
            var year = startingYear + Math.floor(ticks / ticksPerYear);
            var season = seasons[Math.floor((ticks % ticksPerYear) / ticksPerSeason)];
            var monthIndex = Math.floor((ticks % ticksPerSeason) / ticksPerMonth);
            var month = months[monthIndex];
            var seasonPart = seasonParts[monthIndex % 3];
            var day = Math.floor((ticks % ticksPerMonth) / ticksPerDay) + 1;

            return day + getDaySuffix(day) + " " + month + ", " + year + ", " + seasonPart + " " + season;
        };

        var getDaySuffix = function(day) {
            var ones = day % 10;
            var tens = Math.floor(day / 10) % 10;

            if (tens === 1) {
                return "th";
            } else if (ones === 1) {
                return "st";
            } else if (ones === 2) {
                return "nd";
            } else if (ones === 3) {
                return "rd";
            } else {
                return "th";
            }
        };
    };
})();