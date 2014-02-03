'use strict';

var FortressClicker = FortressClicker || {};
FortressClicker.JobDefinitions = (function () {
    var jobDefinitions = {};

    var jobDefinition = new FortressClicker.JobDefinition();
    jobDefinition.name = "Take Clipping";
    jobDefinition.category = FortressClicker.JobCategories.Agriculture;
    jobDefinition.requiredLabor = FortressClicker.Labors.Horticulture;
    jobDefinition.effortRequired = 25;
    jobDefinition.requiredResources[FortressClicker.Resources.Trees.name] = 1;
    jobDefinition.providedResources[FortressClicker.Resources["Tree Clippings"].name] = 2;
    jobDefinitions.TakeClipping = jobDefinition;

    jobDefinition = new FortressClicker.JobDefinition();
    jobDefinition.name = "Plant Tree";
    jobDefinition.category = FortressClicker.JobCategories.Agriculture;
    jobDefinition.requiredLabor = FortressClicker.Labors.Horticulture;
    jobDefinition.effortRequired = 25;
    jobDefinition.requiredResources[FortressClicker.Resources["Tree Clippings"].name] = 1;
    jobDefinition.providedResources[FortressClicker.Resources.Saplings.name] = 1;
    jobDefinitions.PlantTree = jobDefinition;

    jobDefinition = new FortressClicker.JobDefinition();
    jobDefinition.name = "Fell Tree";
    jobDefinition.category = FortressClicker.JobCategories.Agriculture;
    jobDefinition.requiredLabor = FortressClicker.Labors.Woodcutting;
    jobDefinition.effortRequired = 25;
    jobDefinition.requiredResources[FortressClicker.Resources.Trees.name] = 2;
    jobDefinition.usedResources = {};
    jobDefinition.usedResources[FortressClicker.Resources.Trees.name] = 1;
    jobDefinition.providedResources[FortressClicker.Resources.Logs.name] = 1;
    jobDefinitions.FellTree = jobDefinition;

    jobDefinition = new FortressClicker.JobDefinition();
    jobDefinition.name = "Plant Wheat";
    jobDefinition.category = FortressClicker.JobCategories.Agriculture;
    jobDefinition.requiredLabor = FortressClicker.Labors.Farming;
    jobDefinition.effortRequired = 25;
    jobDefinition.requiredResources[FortressClicker.Resources["Wheat Seeds"].name] = 1;
    jobDefinition.providedResources[FortressClicker.Resources["Planted Wheat"].name] = 1;
    jobDefinitions.PlantWheat = jobDefinition;

    jobDefinition = new FortressClicker.JobDefinition();
    jobDefinition.name = "Harvest Wheat";
    jobDefinition.category = FortressClicker.JobCategories.Agriculture;
    jobDefinition.requiredLabor = FortressClicker.Labors.Farming;
    jobDefinition.effortRequired = 25;
    jobDefinition.requiredResources[FortressClicker.Resources["Harvestable Wheat"].name] = 1;
    jobDefinition.providedResources[FortressClicker.Resources.Wheat.name] = 1;
    jobDefinition.providedResources[FortressClicker.Resources["Wheat Seeds"].name] = 2;
    jobDefinitions.HarvestWheat = jobDefinition;

    jobDefinition = new FortressClicker.JobDefinition();
    jobDefinition.name = "Bake Bread";
    jobDefinition.category = FortressClicker.JobCategories.Agriculture;
    jobDefinition.requiredLabor = FortressClicker.Labors.Cooking;
    jobDefinition.effortRequired = 25;
    jobDefinition.requiredResources[FortressClicker.Resources.Wheat.name] = 1;
    jobDefinition.providedResources[FortressClicker.Resources.Bread.name] = 1;
    jobDefinitions.BakeBread = jobDefinition;

    jobDefinition = new FortressClicker.JobDefinition();
    jobDefinition.name = "Brew Beer";
    jobDefinition.category = FortressClicker.JobCategories.Agriculture;
    jobDefinition.requiredLabor = FortressClicker.Labors.Brewing;
    jobDefinition.effortRequired = 25;
    jobDefinition.requiredResources[FortressClicker.Resources.Wheat.name] = 1;
    jobDefinition.providedResources[FortressClicker.Resources.Beer.name] = 1;
    jobDefinitions.BrewBeer = jobDefinition;

    return jobDefinitions;
})();