'use strict';

var FortressClicker = FortressClicker || { };
FortressClicker.JobDefinition = (function()
{
    function JobDefinition()
    {
        this.name;
        this.category;
        this.requiredLabor;
        this.effortRequired;
        this.requiredResources;
        this.providedResources;
        this.customOnComplete;

        this.canCreate = function(game)
        {
            for (var i = 0; i < this.requiredResources.length; i++)
            {
                var requiredResource = this.requiredResources[i];
                if (game.resources[requiredResource.name].count < requiredResource.quantity)
                {
                    return false;
                }
            }
            
            return true;
        }

        this.onCreate = function(game)
        {
            for (var i = 0; i < this.requiredResources.length; i++)
            {
                var requiredResource = this.requiredResources[i]; 
                game.resources[requiredResource.name].count -= requiredResource.quantity;
            }
        }

        this.onCancel = function(game)
        {
            for (var i = 0; i < this.requiredResources.length; i++)
            {
                var requiredResource = this.requiredResources[i]; 
                game.resources[requiredResource.name].count += requiredResource.quantity;
            }
        }

        this.onComplete = function(game)
        {
            for (var i = 0; i < this.providedResources.length; i++)
            {
                var providedResource = this.providedResources[i]; 
                game.resources[this.providedResources[i].name].count += providedResource.quantity;
            }
            
            if (this.customOnComplete !== undefined)
            {
                this.customOnComplete(game);
            }
        }
    }

    return JobDefinition;
})();