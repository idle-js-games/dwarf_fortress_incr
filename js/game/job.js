'use strict';

var FortressClicker = FortressClicker || {};
FortressClicker.Job = (function () {
    return function (jobDefinition, building) {
        this.building = building;
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

        jobDefinition.onCreate(this.building.game);

        this.work = function () {
            if (this.status == FortressClicker.JobStatuses.Pending) {
                this.building.removeJobFromQueue(this);
                this.status = FortressClicker.JobStatuses.InProgress;
            }

            this.effortSpent++;
            this.percentComplete = (this.effortSpent / this.effortRequired) * 100;

            if (this.effortSpent >= this.effortRequired) {
                this.complete();
            }
        };

        this.cancel = function () {
            if (this.status == FortressClicker.JobStatuses.Pending) {
                this.building.removeJobFromQueue(this);
            }
            this.onCancel(this.building.game);
            this.status = FortressClicker.JobStatuses.Cancelled;
        };

        this.complete = function () {
            this.onComplete(this.building.game);
            this.status = FortressClicker.JobStatuses.Completed;
        };
    };
})();