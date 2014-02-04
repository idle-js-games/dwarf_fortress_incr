'use strict';

var FortressClicker = FortressClicker || {};
FortressClicker.BuildingDefinition = (function () {
    return function () {
        this.isVisible = true;
        this.isBuilt = false;
        this.requiredResources = {};

        this.canBuild = function() {
            for (var requiredResource in this.requiredResources) {
                if (game.inventory.getResourceQuantity(requiredResource) < this.requiredResources[requiredResource]) {
                    return false;
                }
            }

            return true;
        };
    };
})();