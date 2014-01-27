'use strict';

var FortressClicker = FortressClicker || { };
FortressClicker.Professions = (function()
{
    return {
        Miner:
        {
            name: "Miner",
            labors:
            [
                FortressClicker.Labors.Mining,
                FortressClicker.Labors.Masonry,
                FortressClicker.Labors.Stonecarving,
            ],
        },
        Woodcutter:
        {
            name: "Woodcutter",
            labors:
            [
                FortressClicker.Labors.Woodcutting,
                FortressClicker.Labors.Carpentry,
                FortressClicker.Labors.Woodcarving,
            ],
        },
        Farmer:
        {
            name: "Farmer",
            labors:
            [
                FortressClicker.Labors.Horticulture,
                FortressClicker.Labors.Farming,
                FortressClicker.Labors.Cooking,
                FortressClicker.Labors.Brewing,
                FortressClicker.Labors.Weaving,
                FortressClicker.Labors.Tailoring,
            ],
        },
        Rancher:
        {
            name: "Rancher",
            labors:
            [
                FortressClicker.Labors.Leatherworking,
                FortressClicker.Labors.AnimalHusbandry,
                FortressClicker.Labors.Butchery,
                FortressClicker.Labors.Cooking,
            ],
        },
        Builder:
        {
            name: "Builder",
            labors:
            [
                FortressClicker.Labors.Architecture,
                FortressClicker.Labors.Construction,
            ],
        },
        Blacksmith:
        {
            name: "Blacksmith",
            labors:
            [
                FortressClicker.Labors.Smelting,
                FortressClicker.Labors.Blacksmithing,
                FortressClicker.Labors.Metalworking,
                FortressClicker.Labors.WeaponCrafting,
                FortressClicker.Labors.ArmorCrafting,
            ],
        },
        Jeweler:
        {
            name: "Jeweler",
            labors:
            [
                FortressClicker.Labors.Gemcutting,
                FortressClicker.Labors.JewelryMaking,
            ],
        },
    };
})();
