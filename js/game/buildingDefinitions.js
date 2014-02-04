'use strict';

var FortressClicker = FortressClicker || {};
FortressClicker.BuildingDefinitions = (function () {
    var buildingDefinitions = [];

    var buildingDefinition = new FortressClicker.BuildingDefinition();
    buildingDefinition.name = "Builder's Hut";
    buildingDefinition.isVisible = false;
    buildingDefinition.initialBuilding = true;
    buildingDefinitions.push(buildingDefinition);

    buildingDefinition = new FortressClicker.BuildingDefinition();
    buildingDefinition.name = "Forest";
    buildingDefinition.initialBuilding = true;
    buildingDefinition.jobDefinitions = [
        FortressClicker.JobDefinitions["Take Clipping"],
        FortressClicker.JobDefinitions["Plant Tree"],
        FortressClicker.JobDefinitions["Fell Tree"],
    ];
    buildingDefinition.resources = [
        FortressClicker.Resources["Tree Clippings"].name,
        FortressClicker.Resources.Saplings.name,
        FortressClicker.Resources.Trees.name,
        FortressClicker.Resources.Logs.name
    ];
    buildingDefinitions.push(buildingDefinition);

    buildingDefinition = new FortressClicker.BuildingDefinition();
    buildingDefinition.name = "Farmer's Hut";
    buildingDefinition.buildJob = new FortressClicker.JobDefinition();
    buildingDefinition.buildJob.name = "Build " + buildingDefinition.name;
    buildingDefinition.buildJob.requiredLabor = FortressClicker.Labors.Construction;
    buildingDefinition.buildJob.skill = FortressClicker.Skills.Builder;
    buildingDefinition.buildJob.effortRequired = 25;
    buildingDefinition.buildJob.requiredResources[FortressClicker.Resources.Logs.name] = 25;
    buildingDefinition.buildJob.providedBuilding = buildingDefinition;
    buildingDefinition.jobDefinitions = [
        FortressClicker.JobDefinitions["Plant Wheat"],
        FortressClicker.JobDefinitions["Harvest Wheat"]
    ];
    buildingDefinition.resources = [
        FortressClicker.Resources["Wheat Seeds"].name,
        FortressClicker.Resources["Planted Wheat"].name,
        FortressClicker.Resources["Harvestable Wheat"].name,
        FortressClicker.Resources["Wheat"].name
    ];
    buildingDefinitions.push(buildingDefinition);

    buildingDefinition = new FortressClicker.BuildingDefinition();
    buildingDefinition.name = "Camp Kitchen";
    buildingDefinition.buildJob = new FortressClicker.JobDefinition();
    buildingDefinition.buildJob.name = "Build " + buildingDefinition.name;
    buildingDefinition.buildJob.requiredLabor = FortressClicker.Labors.Construction;
    buildingDefinition.buildJob.skill = FortressClicker.Skills.Builder;
    buildingDefinition.buildJob.effortRequired = 25;
    buildingDefinition.buildJob.requiredResources[FortressClicker.Resources.Logs.name] = 25;
    buildingDefinition.buildJob.providedBuilding = buildingDefinition;
    buildingDefinition.jobDefinitions = [
        FortressClicker.JobDefinitions["Bake Bread"],
        FortressClicker.JobDefinitions["Brew Beer"]
    ];
    buildingDefinition.resources = [
        FortressClicker.Resources["Wheat"].name,
        FortressClicker.Resources.Bread.name,
        FortressClicker.Resources.Beer.name
    ];
    buildingDefinitions.push(buildingDefinition);

    buildingDefinition = new FortressClicker.BuildingDefinition();
    buildingDefinition.name = "Carpenter's Workshop";
    buildingDefinition.buildJob = new FortressClicker.JobDefinition();
    buildingDefinition.buildJob.name = "Build " + buildingDefinition.name;
    buildingDefinition.buildJob.requiredLabor = FortressClicker.Labors.Construction;
    buildingDefinition.buildJob.skill = FortressClicker.Skills.Builder;
    buildingDefinition.buildJob.effortRequired = 25;
    buildingDefinition.buildJob.requiredResources[FortressClicker.Resources.Logs.name] = 25;
    buildingDefinition.buildJob.providedBuilding = buildingDefinition;
    buildingDefinition.jobDefinitions = [
        FortressClicker.JobDefinitions["Cut Logs into Planks"],
    ];
    buildingDefinition.resources = [
        FortressClicker.Resources.Logs.name,
        FortressClicker.Resources.Planks.name
    ];
    buildingDefinitions.push(buildingDefinition);

    return buildingDefinitions;
})();