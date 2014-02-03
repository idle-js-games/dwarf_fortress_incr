'use strict';

var FortressClicker = FortressClicker || {};
FortressClicker.Building = (function () {
    return function (game, buildingDefinition) {
        this.game = game;
        this.name = buildingDefinition.name;
        this.resources = buildingDefinition.resources;
        this.jobDefinitions = buildingDefinition.jobDefinitions;
        this.jobQueue = [];

        this.tick = function() {
            
        };

        this.addJobToQueue = function (jobDefinition) {
            var job = new FortressClicker.Job(jobDefinition, this);
            this.jobQueue.push(job);
            this.updateJobQueueSummaries();
        };

        this.removeJobFromQueue = function (job) {
            this.jobQueue.splice(this.jobQueue.indexOf(job), 1);
            this.updateJobQueueSummaries();
        };

        this.updateJobQueueSummaries = function () {
            var jobSummaries = _.reduce(
                this.jobQueue,
                function (buckets, job) {
                    var bucket = buckets[buckets.length - 1];

                    // Create a new bucket if needed.
                    if (!bucket || bucket.name != job.name) {
                        bucket = {
                            name: job.name,
                            jobs: []
                        };
                        buckets.push(bucket);
                    }

                    // Add the job to the correct bucket
                    bucket.jobs.push(job);
                    return buckets;
                },
                [] // The starting buckets
            );

            this.jobQueueSummaries = jobSummaries;
        };
    };
})();