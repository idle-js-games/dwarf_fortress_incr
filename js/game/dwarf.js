'use strict';

var FortressClicker = FortressClicker || { };
FortressClicker.Dwarf = (function() {
    return function(game, profession) {
        this.game = game;
        this.profession = profession;
        this.name = new FortressClicker.NameGenerator().generate();
        this.currentJob = null;
        this.nourishment = 1000;
        this.hydration = 1000;

        this.isIdle = function() {
            return this.currentJob === null;
        };

        this.tick = function() {
            if (this.currentJob !== null && this.currentJob.status == FortressClicker.JobStatuses.Cancelled) {
                this.currentJob = null;
            }

            if (this.isIdle()) {
                var job = this.game.getNextJob(this);
                if (job !== null) {
                    this.currentJob = job;
                }
            }

            if (!this.isIdle()) {
                this.currentJob.work(this);
                if (this.currentJob.status == FortressClicker.JobStatuses.Completed) {
                    this.currentJob = null;
                }
            }
        };
    };
})();