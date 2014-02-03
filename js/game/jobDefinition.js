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

        this.onCreate = function (game) {
            for (var usedResource in this.usedResources) {
                game.inventory.removeResource(usedResource, this.usedResources[usedResource]);
            }
        };

        this.onCancel = function (game) {
            for (var usedResource in this.usedResources) {
                game.inventory.addResource(usedResource, this.usedResources[usedResource]);
            }
        };

        this.onComplete = function (game) {
            for (var providedResource in this.providedResources) {
                game.inventory.addResource(providedResource, this.providedResources[providedResource]);
            }

            if (this.customOnComplete !== undefined) {
                this.customOnComplete(game);
            }
        };
    };
})();