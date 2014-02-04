'use strict';

var FortressClicker = FortressClicker || {};
FortressClicker.Job = (function () {
    return function (jobDefinition, building) {
        this.building = building;
        this.name = jobDefinition.name;
        this.percentComplete = 0;
        this.effortSpent = 0;
        this.effortRequired = jobDefinition.effortRequired;
        this.requiredLabor = jobDefinition.requiredLabor;
        this.requiredResources = jobDefinition.requiredResources;
        this.usedResources = jobDefinition.usedResources;
        this.providedResources = jobDefinition.providedResources;
        this.providedBuilding = jobDefinition.providedBuilding;
        this.providedNourishment = jobDefinition.providedNourishment;
        this.providedHydration = jobDefinition.providedHydration;
        this.status = FortressClicker.JobStatuses.Pending;
        this.skill = jobDefinition.skill;
        this.isCancelable = true;

        for (var usedResource in this.usedResources) {
            this.building.game.inventory.removeResource(usedResource, this.usedResources[usedResource]);
        }

        if (this.providedBuilding !== undefined) {
            this.providedBuilding.isBuilt = true;
        }

        this.work = function (dwarf) {
            if (this.status == FortressClicker.JobStatuses.Pending) {
                this.building.removeJobFromQueue(this);
                this.status = FortressClicker.JobStatuses.InProgress;
            }

            var dwarfSkillLevel = FortressClicker.SkillLevels.getLevel(dwarf.skills[this.skill] || 0).number;
            var adjustedEffort = 1 + 1 * (dwarfSkillLevel / 10);

            this.effortSpent += adjustedEffort;
            this.percentComplete = (this.effortSpent / this.effortRequired) * 100;

            if (this.effortSpent >= this.effortRequired) {
                this.complete(dwarf);
            }
        };

        this.cancel = function () {
            if (this.status == FortressClicker.JobStatuses.Pending) {
                this.building.removeJobFromQueue(this);
            }

            for (var usedResource in this.usedResources) {
                this.building.game.inventory.addResource(usedResource, this.usedResources[usedResource]);
            }

            if (this.providedBuilding !== undefined) {
                this.providedBuilding.isBuilt = false;
            }

            this.status = FortressClicker.JobStatuses.Cancelled;
        };

        this.complete = function (dwarf) {
            for (var providedResource in this.providedResources) {
                this.building.game.inventory.addResource(providedResource, this.providedResources[providedResource]);
            }

            if (this.providedBuilding !== undefined) {
                this.building.game.addBuilding(this.providedBuilding);
                this.providedBuilding.isBuilt = true;
            }

            if (this.providedNourishment !== undefined) {
                dwarf.nourishment += this.providedNourishment;
            }

            if (this.providedHydration !== undefined) {
                dwarf.hydration += this.providedHydration;
            }

            this.status = FortressClicker.JobStatuses.Completed;
        };
    };
})();