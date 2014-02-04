'use strict';

var FortressClicker = FortressClicker || {};
FortressClicker.SkillLevels = (function () {
    var levels = [
        { number: -5, name: "Dabbling", minimum: 0, },
        { number: -4, name: "Novice", minimum: 50, },
        { number: -3, name: "Adequate", minimum: 110, },
        { number: -2, name: "Competent", minimum: 180, },
        { number: -1, name: "Skilled", minimum: 260, },
        { number: 0, name: "Proficient", minimum: 350, },
        { number: 1, name: "Talented", minimum: 450, },
        { number: 2, name: "Adept", minimum: 560, },
        { number: 3, name: "Expert", minimum: 680, },
        { number: 4, name: "Professional", minimum: 810, },
        { number: 5, name: "Accomplished", minimum: 950, },
        { number: 6, name: "Great", minimum: 1100, },
        { number: 7, name: "Master", minimum: 1260, },
        { number: 8, name: "High Master", minimum: 1430, },
        { number: 9, name: "Grand Master", minimum: 1610, },
        { number: 10, name: "Legendary", minimum: 1800, },
        { number: 11, name: "Legendary", minimum: 2000, },
        { number: 12, name: "Legendary", minimum: 2210, },
        { number: 13, name: "Legendary", minimum: 2430, },
        { number: 14, name: "Legendary", minimum: 2660, },
        { number: 15, name: "Legendary", minimum: 2900, },
    ];

    return {
        getLevel: function (experience) {
            for (var i = levels.length - 1; i > -1; i--) {
                if (experience >= levels[i].minimum) {
                    return levels[i];
                }
            }
        }
    };
})();
