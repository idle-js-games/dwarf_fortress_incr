'use strict';

var FortressClicker = FortressClicker || {};
FortressClicker.JobDefinition = (function () {
    return function () {
        this.requiredResources = {};
        this.usedResources = this.requiredResources;
        this.providedResources = {};

        this.canCreate = function (game) {
            for (var requiredResource in this.requiredResources) {
                if (game.inventory.getResourceQuantity(requiredResource) < this.requiredResources[requiredResource]) {
                    return false;
                }
            }

            return true;
        };
    };
})();