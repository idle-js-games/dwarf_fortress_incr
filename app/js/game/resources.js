'use strict';

var FortressClicker = FortressClicker || { };
FortressClicker.Resources = (function()
{
    return {
        Saplings: "Saplings",
        TreeClippings: "TreeClippings",
        Trees: "Trees",
        Timber: "Timber",
        WheatSeeds: "WheatSeeds",
        PlantedWheat: "PlantedWheat",
        HarvestableWheat: "HarvestableWheat",
        Wheat: "Wheat",
        Bread: "Bread",
    };
})();

FortressClicker.Resource = (function()
{
    function Resource(name, category, isVisible)
    {
        this.name = name;
        this.category = category;
        this.isVisible = isVisible;
    }
    
    return Resource;
})();