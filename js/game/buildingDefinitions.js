'use strict';

var FortressClicker = FortressClicker || {};
FortressClicker.BuildingDefinitions = (function () {
    var buildingDefinitions = {};

    var buildingDefinition = new FortressClicker.BuildingDefinition();
    buildingDefinition.name = "Forest";
    buildingDefinition.isBuildable = false;
    buildingDefinition.initialBuilding = true;
    buildingDefinition.jobDefinitions = [
        FortressClicker.JobDefinitions.TakeClipping,
        FortressClicker.JobDefinitions.PlantTree,
        FortressClicker.JobDefinitions.FellTree,
    ];
    buildingDefinition.resources = [
        FortressClicker.Resources["Tree Clippings"].name,
        FortressClicker.Resources.Trees.name,
        FortressClicker.Resources.Logs.name
    ];
    buildingDefinitions[buildingDefinition.name] = buildingDefinition;

    buildingDefinition = new FortressClicker.BuildingDefinition();
    buildingDefinition.name = "Open Field";
    buildingDefinition.isBuildable = false;
    buildingDefinition.initialBuilding = true;
    buildingDefinition.jobDefinitions = [
        FortressClicker.JobDefinitions.PlantWheat,
        FortressClicker.JobDefinitions.HarvestWheat
    ];
    buildingDefinition.resources = [
        FortressClicker.Resources["Wheat Seeds"].name,
        FortressClicker.Resources["Planted Wheat"].name,
        FortressClicker.Resources["Harvestable Wheat"].name,
        FortressClicker.Resources["Wheat"].name
    ];
    buildingDefinitions[buildingDefinition.name] = buildingDefinition;

    buildingDefinition = new FortressClicker.BuildingDefinition();
    buildingDefinition.name = "Camp Kitchen";
    buildingDefinition.isBuildable = false;
    buildingDefinition.initialBuilding = true;
    buildingDefinition.jobDefinitions = [
        FortressClicker.JobDefinitions.BakeBread,
        FortressClicker.JobDefinitions.BrewBeer
    ];
    buildingDefinition.resources = [
        FortressClicker.Resources["Wheat"].name,
        FortressClicker.Resources.Bread.name,
        FortressClicker.Resources.Beer.name
];
    buildingDefinitions[buildingDefinition.name] = buildingDefinition;

    return buildingDefinitions;
})();