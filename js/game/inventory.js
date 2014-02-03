'use strict';

var FortressClicker = FortressClicker || {};
FortressClicker.Inventory = (function () {
    return function (calendar) {
        var resources = {};
        var resourceChanges = {};

        var getResourceName = function (resource) {
            if (typeof resource === "string") {
                return resource;
            } else {
                return resource.name;
            }
        };

        var queueResourceChange = function(changeOnTick, resource, quantity) {
            var resourceName = getResourceName(resource);

            if (resourceChanges[changeOnTick] === undefined) {
                resourceChanges[changeOnTick] = {};
            }

            resourceChanges[changeOnTick][resourceName] = quantity;
        };

        var processResourceChanges = function () {
            if (resourceChanges[calendar.currentTick] !== undefined) {
                for (var resourceName in resourceChanges[calendar.currentTick]) {
                    var quantity = resourceChanges[calendar.currentTick][resourceName];
                    if (quantity > 0) {
                        addResource(resourceName, quantity);
                    } else {
                        removeResource(resourceName, -quantity);
                    }
                }
            }
        };

        var tick = function () {
            processResourceChanges(this);
        };

        var getResourceQuantity = function (resource) {
            var resourceName = getResourceName(resource);

            if (resources[resourceName] !== undefined) {
                return resources[resourceName];
            } else {
                return 0;
            }
        };

        var addResource = function (resource, quantity) {
            var resourceName = getResourceName(resource);

            if (resources[resourceName] === undefined) {
                resources[resourceName] = 0;
            }

            resources[resourceName] += quantity;

            var resourceObject = FortressClicker.Resources[resourceName];

            if (resourceObject.changesTo !== undefined &&
                resourceObject.changeTime !== undefined) {
                var changeOnTick = calendar.currentTick + resourceObject.changeTime;
                queueResourceChange(changeOnTick, resourceName, -1);
                queueResourceChange(changeOnTick, resourceObject.changesTo, 1);
            }
        };

        var removeResource = function (resource, quantity) {
            var resourceName = getResourceName(resource);

            if (resources[resourceName] === undefined) {
                throw "Can't remove a resource that is not currently defined!";
            }

            resources[resourceName] -= quantity;
        };

        this.resources = resources;
        this.addResource = addResource;
        this.removeResource = removeResource;
        this.getResourceQuantity = getResourceQuantity;
        this.tick = tick;
    };
})();