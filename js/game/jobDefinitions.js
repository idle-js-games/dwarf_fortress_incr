'use strict';

var FortressClicker = FortressClicker || {};
FortressClicker.JobDefinitions = (function () {
    var jobDefinitions = {};

    var jobDefinition = new FortressClicker.JobDefinition();
    jobDefinition.name = "Take Clipping";
    jobDefinition.requiredLabor = FortressClicker.Labors.Horticulture;
    jobDefinition.skill = FortressClicker.Skills.Forester;
    jobDefinition.effortRequired = 25;
    jobDefinition.requiredResources[FortressClicker.Resources.Trees.name] = 1;
    jobDefinition.providedResources[FortressClicker.Resources["Tree Clippings"].name] = 2;
    jobDefinitions[jobDefinition.name] = jobDefinition;

    jobDefinition = new FortressClicker.JobDefinition();
    jobDefinition.name = "Plant Tree";
    jobDefinition.requiredLabor = FortressClicker.Labors.Horticulture;
    jobDefinition.skill = FortressClicker.Skills.Forester;
    jobDefinition.effortRequired = 25;
    jobDefinition.requiredResources[FortressClicker.Resources["Tree Clippings"].name] = 1;
    jobDefinition.providedResources[FortressClicker.Resources.Saplings.name] = 1;
    jobDefinitions[jobDefinition.name] = jobDefinition;

    jobDefinition = new FortressClicker.JobDefinition();
    jobDefinition.name = "Fell Tree";
    jobDefinition.requiredLabor = FortressClicker.Labors.Woodcutting;
    jobDefinition.skill = FortressClicker.Skills.Lumberjack;
    jobDefinition.effortRequired = 25;
    jobDefinition.requiredResources[FortressClicker.Resources.Trees.name] = 2;
    jobDefinition.usedResources = {};
    jobDefinition.usedResources[FortressClicker.Resources.Trees.name] = 1;
    jobDefinition.providedResources[FortressClicker.Resources.Logs.name] = 1;
    jobDefinitions[jobDefinition.name] = jobDefinition;

    jobDefinition = new FortressClicker.JobDefinition();
    jobDefinition.name = "Plant Wheat";
    jobDefinition.requiredLabor = FortressClicker.Labors.Farming;
    jobDefinition.skill = FortressClicker.Skills.Farmer;
    jobDefinition.effortRequired = 25;
    jobDefinition.requiredResources[FortressClicker.Resources["Wheat Seeds"].name] = 1;
    jobDefinition.providedResources[FortressClicker.Resources["Planted Wheat"].name] = 1;
    jobDefinitions[jobDefinition.name] = jobDefinition;

    jobDefinition = new FortressClicker.JobDefinition();
    jobDefinition.name = "Harvest Wheat";
    jobDefinition.requiredLabor = FortressClicker.Labors.Farming;
    jobDefinition.skill = FortressClicker.Skills.Farmer;
    jobDefinition.effortRequired = 25;
    jobDefinition.requiredResources[FortressClicker.Resources["Harvestable Wheat"].name] = 1;
    jobDefinition.providedResources[FortressClicker.Resources.Wheat.name] = 1;
    jobDefinition.providedResources[FortressClicker.Resources["Wheat Seeds"].name] = 2;
    jobDefinitions[jobDefinition.name] = jobDefinition;

    jobDefinition = new FortressClicker.JobDefinition();
    jobDefinition.name = "Bake Bread";
    jobDefinition.requiredLabor = FortressClicker.Labors.Cooking;
    jobDefinition.skill = FortressClicker.Skills.Cook;
    jobDefinition.effortRequired = 25;
    jobDefinition.requiredResources[FortressClicker.Resources.Wheat.name] = 1;
    jobDefinition.providedResources[FortressClicker.Resources.Bread.name] = 1;
    jobDefinitions[jobDefinition.name] = jobDefinition;

    jobDefinition = new FortressClicker.JobDefinition();
    jobDefinition.name = "Brew Beer";
    jobDefinition.requiredLabor = FortressClicker.Labors.Brewing;
    jobDefinition.skill = FortressClicker.Skills.Brewer;
    jobDefinition.effortRequired = 25;
    jobDefinition.requiredResources[FortressClicker.Resources.Wheat.name] = 1;
    jobDefinition.providedResources[FortressClicker.Resources.Beer.name] = 1;
    jobDefinitions[jobDefinition.name] = jobDefinition;

    jobDefinition = new FortressClicker.JobDefinition();
    jobDefinition.name = "Cut Logs into Planks";
    jobDefinition.requiredLabor = FortressClicker.Labors.Carpentry;
    jobDefinition.skill = FortressClicker.Skills.Carpenter;
    jobDefinition.effortRequired = 25;
    jobDefinition.requiredResources[FortressClicker.Resources.Logs.name] = 1;
    jobDefinition.providedResources[FortressClicker.Resources.Planks.name] = 1;
    jobDefinitions[jobDefinition.name] = jobDefinition;

    return jobDefinitions;
})();