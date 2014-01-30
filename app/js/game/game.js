'use strict';

var FortressClicker = FortressClicker || { };
FortressClicker.Game = (function()
{
    function Game()
    {
        this.wealth = 0;
        this.mapSize = 4096;

        this.jobDefinitions = FortressClicker.JobDefinitions;
        this.jobCategories = FortressClicker.JobCategories;
        this.professions = FortressClicker.Professions;
        this.calendar = new FortressClicker.Calendar();

        this.dwarves = [ ];
        this.resources = { };
        this.jobQueue = [ ];
        this.delayedActions = { };

        for (var resource in FortressClicker.Resources)
        {
            this.resources[resource] = { name: resource, count: 0 };
        }
        this.resources[FortressClicker.Resources.Trees].count = 10;
        this.resources[FortressClicker.Resources.WheatSeeds].count = 10;

        this.dwarves.push(new FortressClicker.Dwarf(this, FortressClicker.Professions.Farmer));
        this.dwarves.push(new FortressClicker.Dwarf(this, FortressClicker.Professions.Farmer));
        this.dwarves.push(new FortressClicker.Dwarf(this, FortressClicker.Professions.Woodcutter));
        this.dwarves.push(new FortressClicker.Dwarf(this, FortressClicker.Professions.Miner));
        this.dwarves.push(new FortressClicker.Dwarf(this, FortressClicker.Professions.Miner));
        this.dwarves.push(new FortressClicker.Dwarf(this, FortressClicker.Professions.Rancher));

        this.tick = function()
        {
            this.calendar.tick();
            this.runDelayedActions();

            for (var i = 0; i < this.dwarves.length; i++)
            {
                this.dwarves[i].tick();
            }
        };

        this.addJobToQueue = function(jobDefinition)
        {
            var job = new FortressClicker.Job(jobDefinition, this);
            this.jobQueue.push(job);
            this.updateJobQueueSummaries();
        }

        this.removeJobFromQueue = function(job)
        {
            this.jobQueue.splice(this.jobQueue.indexOf(job), 1);
            this.updateJobQueueSummaries();
        }

        // Runs the provided action in N ticks
        this.addDelayedAction = function(action, ticks)
        {
            var tickToRun = this.calendar.currentTick + ticks;
            if (this.delayedActions[tickToRun] === undefined)
            {
                this.delayedActions[tickToRun] = [ ];
            }
            this.delayedActions[tickToRun].push(action);
        }

        this.runDelayedActions = function()
        {
            var actionsToRun = this.delayedActions[this.calendar.currentTick];
            if (actionsToRun !== undefined)
            {
                for (var i = 0; i < actionsToRun.length; i++)
                {
                    actionsToRun[i]();
                }
                this.delayedActions[this.calendar.currentTick] = undefined;
            }
        }
        
        this.updateJobQueueSummaries = function()
        {
            var jobSummaries = _.reduce(
                this.jobQueue, 
                function(buckets, job) {
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
        }
    }
    
    return Game;
})();
