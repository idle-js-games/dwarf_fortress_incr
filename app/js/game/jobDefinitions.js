'use strict';

var FortressClicker = FortressClicker || { };
FortressClicker.JobDefinitions = (function() {
    var jobDefinitions = [ ];
    
    var jobDefinition = new FortressClicker.JobDefinition();
    jobDefinition.name = "Take Clipping";
    jobDefinition.category = FortressClicker.JobCategories.Agriculture;
    jobDefinition.requiredLabor = FortressClicker.Labors.Horticulture;
    jobDefinition.effortRequired = 100;
    jobDefinition.requiredResources = [{ name: FortressClicker.Resources.Trees, quantity: 1 }];
    jobDefinition.providedResources = [{ name: FortressClicker.Resources.TreeClippings, quantity: 2 }];
    jobDefinitions.push(jobDefinition);
    
    jobDefinition = new FortressClicker.JobDefinition();
    jobDefinition.name = "Plant Tree";
    jobDefinition.category = FortressClicker.JobCategories.Agriculture;
    jobDefinition.requiredLabor = FortressClicker.Labors.Horticulture;
    jobDefinition.effortRequired = 100;
    jobDefinition.requiredResources = [{ name: FortressClicker.Resources.TreeClippings, quantity: 1 }];
    jobDefinition.providedResources = [{ name: FortressClicker.Resources.Saplings, quantity: 1 }];
    jobDefinition.customOnComplete = function(game)
    {
        game.addDelayedAction(function()
        {
            game.resources[FortressClicker.Resources.Saplings].count--;
            game.resources[FortressClicker.Resources.Trees].count++;
        }, 600);
    };
    jobDefinitions.push(jobDefinition);

    jobDefinition = new FortressClicker.JobDefinition();
    jobDefinition.name = "Fell Tree";
    jobDefinition.category = FortressClicker.JobCategories.Agriculture;
    jobDefinition.requiredLabor = FortressClicker.Labors.Woodcutting;
    jobDefinition.effortRequired = 150;
    jobDefinition.requiredResources = [{ name: FortressClicker.Resources.Trees, quantity: 1 }];
    jobDefinition.providedResources = [{ name: FortressClicker.Resources.Timber, quantity: 2 }];
    jobDefinitions.push(jobDefinition);

    jobDefinition = new FortressClicker.JobDefinition();
    jobDefinition.name = "Plant Wheat";
    jobDefinition.category = FortressClicker.JobCategories.Agriculture;
    jobDefinition.requiredLabor = FortressClicker.Labors.Farming;
    jobDefinition.effortRequired = 150;
    jobDefinition.requiredResources = [{ name: FortressClicker.Resources.WheatSeeds, quantity: 1 }];
    jobDefinition.providedResources = [{ name: FortressClicker.Resources.PlantedWheat, quantity: 1 }];
    jobDefinition.customOnComplete = function(game)
    {
        game.addDelayedAction(function()
        {
            game.resources[FortressClicker.Resources.PlantedWheat].count--;
            game.resources[FortressClicker.Resources.HarvestableWheat].count++;
        }, 600);
    };
    jobDefinitions.push(jobDefinition);

    jobDefinition = new FortressClicker.JobDefinition();
    jobDefinition.name = "Harvest Wheat";
    jobDefinition.category = FortressClicker.JobCategories.Agriculture;
    jobDefinition.requiredLabor = FortressClicker.Labors.Farming;
    jobDefinition.effortRequired = 150;
    jobDefinition.requiredResources = [{ name: FortressClicker.Resources.HarvestableWheat, quantity: 1 }];
    jobDefinition.providedResources =
    [
        { name: FortressClicker.Resources.Wheat, quantity: 1 },
        { name: FortressClicker.Resources.WheatSeeds, quantity: 2 },
    ];
    jobDefinitions.push(jobDefinition);

    jobDefinition = new FortressClicker.JobDefinition();
    jobDefinition.name = "Bake Bread";
    jobDefinition.category = FortressClicker.JobCategories.Agriculture;
    jobDefinition.requiredLabor = FortressClicker.Labors.Cooking;
    jobDefinition.effortRequired = 300;
    jobDefinition.requiredResources = [{ name: FortressClicker.Resources.Wheat, quantity: 1 }];
    jobDefinition.providedResources = [{ name: FortressClicker.Resources.Bread, quantity: 1 }];
    jobDefinitions.push(jobDefinition);

    return jobDefinitions;
})();