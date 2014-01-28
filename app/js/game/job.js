'use strict';

var FortressClicker = FortressClicker || { };
FortressClicker.Job = (function()
{
    function Job(jobDefinition, game)
    {
        this.game = game;
        this.name = jobDefinition.name;
        this.percentComplete = 0;
        this.effortSpent = 0;
        this.effortRequired = jobDefinition.effortRequired;
        this.requiredLabor = jobDefinition.requiredLabor;
        this.requiredResources = jobDefinition.requiredResources;
        this.providedResources = jobDefinition.providedResources;
        this.onCancel = jobDefinition.onCancel;
        this.onComplete = jobDefinition.onComplete;
        this.customOnComplete = jobDefinition.customOnComplete;
        this.status = FortressClicker.JobStatuses.Pending;

        jobDefinition.onCreate(game);

        this.work = function(dwarf)
        {
            if (this.status == FortressClicker.JobStatuses.Pending)
            {
                this.game.removeJobFromQueue(this);
                this.status = FortressClicker.JobStatuses.InProgress;
            }
            
            this.effortSpent++;
            this.percentComplete = (this.effortSpent / this.effortRequired) * 100;
            
            if (this.effortSpent >= this.effortRequired)
            {
                this.complete();
            }
        }
        
        this.cancel = function()
        {
            if (this.status == FortressClicker.JobStatuses.Pending)
            {
                this.game.removeJobFromQueue(this);
            }
            this.onCancel(this.game);
            this.status = FortressClicker.JobStatuses.Cancelled;
        }

        this.complete = function()
        {
            this.onComplete(this.game);
            this.status = FortressClicker.JobStatuses.Completed;
        }
    }

    return Job;
})();