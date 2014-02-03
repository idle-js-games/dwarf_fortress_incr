'use strict';

var FortressClicker = FortressClicker || {};
FortressClicker.Game = (function () {
    return function () {
        this.wealth = 0;
        this.mapSize = 4096;

        this.jobDefinitions = FortressClicker.JobDefinitions;
        this.jobCategories = FortressClicker.JobCategories;
        this.professions = FortressClicker.Professions;
        this.calendar = new FortressClicker.Calendar();
        this.inventory = new FortressClicker.Inventory(this.calendar);

        this.buildings = {};
        this.dwarves = [];
        this.resources = {};

        this.tick = function () {
            this.calendar.tick();
            this.inventory.tick();

            for (var i = 0; i < this.dwarves.length; i++) {
                this.dwarves[i].tick();
            }
        };

        this.getNextJob = function (dwarf) {
            for (var buildingName in this.buildings) {
                var building = this.buildings[buildingName];
                for (var i = 0; i < building.jobQueue.length; i++) {
                    var job = building.jobQueue[i];
                    if (job.status == FortressClicker.JobStatuses.Pending &&
                        dwarf.profession.labors.indexOf(job.requiredLabor) > -1) {
                        return job;
                    }
                }
            };

            return null;
        };

        this.inventory.addResource(FortressClicker.Resources.Trees, 10);
        this.inventory.addResource(FortressClicker.Resources["Wheat Seeds"], 10);

        this.dwarves.push(new FortressClicker.Dwarf(this, FortressClicker.Professions.Farmer));
        this.dwarves.push(new FortressClicker.Dwarf(this, FortressClicker.Professions.Farmer));
        this.dwarves.push(new FortressClicker.Dwarf(this, FortressClicker.Professions.Woodcutter));
        this.dwarves.push(new FortressClicker.Dwarf(this, FortressClicker.Professions.Woodcutter));
        this.dwarves.push(new FortressClicker.Dwarf(this, FortressClicker.Professions.Builder));
        this.dwarves.push(new FortressClicker.Dwarf(this, FortressClicker.Professions.Builder));

        for (var buildingDefinitionName in FortressClicker.BuildingDefinitions) {
            var buildingDefinition = FortressClicker.BuildingDefinitions[buildingDefinitionName];
            if (buildingDefinition.initialBuilding) {
                this.buildings[buildingDefinitionName] = new FortressClicker.Building(this, buildingDefinition);
            }
        }
    };
})();
