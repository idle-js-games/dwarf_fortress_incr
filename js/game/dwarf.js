'use strict';

var FortressClicker = FortressClicker || {};
FortressClicker.Dwarf = (function () {
    return function (game, name, profession) {
        this.game = game;
        this.profession = profession;
        this.name = name;
        this.currentJob = null;
        this.nourishment = 1000;
        this.hydration = 1000;
        this.skills = {};

        this.isIdle = function () {
            return this.currentJob === null;
        };

        this.isHungry = function () {
            return this.nourishment < 100;
        };

        this.isThirsty = function() {
            return this.hydration < 100;
        };

        this.tick = function () {
            if (this.currentJob !== null && this.currentJob.status == FortressClicker.JobStatuses.Cancelled) {
                this.currentJob = null;
            }

            if (this.isIdle() && this.isThirsty()) {
                var drinkingJob = this.createDrinkingJob();
                if (drinkingJob !== null) {
                    this.currentJob = drinkingJob;
                }
            }

            if (this.isIdle() && this.isHungry()) {
                var eatingJob = this.createEatingJob();
                if (eatingJob !== null) {
                    this.currentJob = eatingJob;
                }
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
                    if (this.currentJob.skill !== undefined) {
                        if (this.skills[this.currentJob.skill] === undefined) {
                            this.skills[this.currentJob.skill] = 0;
                        }
                        this.skills[this.currentJob.skill]++;
                    }
                    this.currentJob = null;
                }
            }

            this.nourishment = Math.max(0, this.nourishment - 1);
            this.hydration = Math.max(0, this.hydration - 1);
        };

        this.createEatingJob = function () {
            var bestAvailableFoodResource =
                _.chain(FortressClicker.Resources)
                    .filter(function (resource) { return resource.nourishment > 0; })
                    .sortBy(function (resource) { return -resource.nourishment; })
                    .filter(function (resource) { return game.inventory.getResourceQuantity(resource) > 0; })
                    .first()
                    .value();

            if (bestAvailableFoodResource !== undefined && bestAvailableFoodResource !== null) {
                var eatingJobDefinition = new FortressClicker.JobDefinition();
                eatingJobDefinition.name = "Eating " + bestAvailableFoodResource.name;
                eatingJobDefinition.effortRequired = 50;
                eatingJobDefinition.isCancelable = false;
                eatingJobDefinition.usedResources[bestAvailableFoodResource.name] = 1;
                eatingJobDefinition.providedNourishment = bestAvailableFoodResource.nourishment;
                return new FortressClicker.Job(eatingJobDefinition, this.game.buildings[0]);
            }

            return null;
        };

        this.createDrinkingJob = function() {
            var bestAvailableDrinkResource =
                _.chain(FortressClicker.Resources)
                    .filter(function (resource) { return resource.hydration > 0; })
                    .sortBy(function (resource) { return -resource.hydration; })
                    .filter(function (resource) { return game.inventory.getResourceQuantity(resource) > 0; })
                    .first()
                    .value();

            if (bestAvailableDrinkResource !== undefined && bestAvailableDrinkResource !== null) {
                var drinkingJobDefinition = new FortressClicker.JobDefinition();
                drinkingJobDefinition.name = "Drinking " + bestAvailableDrinkResource.name;
                drinkingJobDefinition.effortRequired = 50;
                drinkingJobDefinition.isCancelable = false;
                drinkingJobDefinition.usedResources[bestAvailableDrinkResource.name] = 1;
                drinkingJobDefinition.providedHydration = bestAvailableDrinkResource.hydration;
                return new FortressClicker.Job(drinkingJobDefinition, this.game.buildings[0]);
            }

            return null;
        };
    };
})();