'use strict';

var FortressClicker = FortressClicker || { };
FortressClicker.Game = (function()
{
    function Game()
    {
        this.tickCount = 0;
        this.wealth = 0;
        this.mapSize = 4096;

        this.jobDefinitions = FortressClicker.JobDefinitions;
        this.professions = FortressClicker.Professions;

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
            this.tickCount++;
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
        }

        this.removeJobFromQueue = function(job)
        {
            this.jobQueue.splice(this.jobQueue.indexOf(job), 1);
        }

        // Runs the provided action in N ticks
        this.addDelayedAction = function(action, ticks)
        {
            var tickToRun = this.tickCount + ticks;
            if (this.delayedActions[tickToRun] === undefined)
            {
                this.delayedActions[tickToRun] = [ ];
            }
            this.delayedActions[tickToRun].push(action);
        }

        this.runDelayedActions = function()
        {
            var actionsToRun = this.delayedActions[this.tickCount];
            if (actionsToRun !== undefined)
            {
                for (var i = 0; i < actionsToRun.length; i++)
                {
                    actionsToRun[i]();
                }
                this.delayedActions[this.tickCount] = undefined;
            }
        }
    }
    
    return Game;
})();
