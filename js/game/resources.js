'use strict';

var FortressClicker = FortressClicker || {};
FortressClicker.Resources = (function () {
    var resources = {};

    resources.Saplings = { name: "Saplings" };
    resources["Tree Clippings"] = { name: "Tree Clippings" };
    resources.Trees = { name: "Trees" };
    resources.Logs = { name: "Logs", isBuildingMaterial: true };
    resources["Wheat Seeds"] = { name: "Wheat Seeds" };
    resources["Harvestable Wheat"] = { name: "Harvestable Wheat" };
    resources["Planted Wheat"] = { name: "Planted Wheat" };
    resources.Wheat = { name: "Wheat" };
    resources.Bread = { name: "Bread", nourishment: 1000 };
    resources.Beer = { name: "Beer", hydration: 1000 };

    // Growth
    resources.Saplings.changesTo = resources.Trees;
    resources.Saplings.changeTime = 100;

    resources["Planted Wheat"].changesTo = resources["Harvestable Wheat"];
    resources["Planted Wheat"].changeTime = 100;

    return resources;
})();
