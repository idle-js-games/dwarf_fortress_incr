'use strict';

var FortressClicker = FortressClicker || {};
FortressClicker.Game = (function () {
    return function () {
        this.wealth = 0;

        this.jobDefinitions = FortressClicker.JobDefinitions;
        this.jobCategories = FortressClicker.JobCategories;
        this.buildingDefinitions = FortressClicker.BuildingDefinitions;
        this.professions = FortressClicker.Professions;
        this.skillLevels = FortressClicker.SkillLevels;
        this.calendar = new FortressClicker.Calendar();
        this.inventory = new FortressClicker.Inventory(this.calendar);

        this.buildings = [];
        this.dwarves = [];

        this.tick = function () {
            if (!this.isPaused) {
                this.calendar.tick();
                this.inventory.tick();

                for (var i = 0; i < this.dwarves.length; i++) {
                    this.dwarves[i].tick();
                }
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

        this.addBuilding = function(buildingDefinition) {
            this.buildings.push(new FortressClicker.Building(this, buildingDefinition));
            buildingDefinition.isBuilt = true;
        };

        this.inventory.addResource(FortressClicker.Resources.Trees, 500);
        this.inventory.addResource(FortressClicker.Resources.Logs, 500);
        this.inventory.addResource(FortressClicker.Resources["Wheat Seeds"], 25);

        var dwarfNames = new FortressClicker.NameGenerator().generate(6);
        this.dwarves.push(new FortressClicker.Dwarf(this, dwarfNames[0], FortressClicker.Professions.Farmer));
        this.dwarves.push(new FortressClicker.Dwarf(this, dwarfNames[1], FortressClicker.Professions.Farmer));
        this.dwarves.push(new FortressClicker.Dwarf(this, dwarfNames[2], FortressClicker.Professions.Woodcutter));
        this.dwarves.push(new FortressClicker.Dwarf(this, dwarfNames[3], FortressClicker.Professions.Woodcutter));
        this.dwarves.push(new FortressClicker.Dwarf(this, dwarfNames[4], FortressClicker.Professions.Woodcutter));
        this.dwarves.push(new FortressClicker.Dwarf(this, dwarfNames[5], FortressClicker.Professions.Builder));

        for (var i = 0; i < this.buildingDefinitions.length; i++) {
            var buildingDefinition = this.buildingDefinitions[i];
            if (buildingDefinition.initialBuilding) {
                this.addBuilding(buildingDefinition);
            }
        }
    };
})();
