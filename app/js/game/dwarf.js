'use strict';

var FortressClicker = FortressClicker || { };
FortressClicker.Dwarf = (function()
{
    function Dwarf(game, profession)
    {
        this.game = game;
        this.profession = profession;
        this.name = new FortressClicker.NameGenerator().generate();
        this.currentJob = null;
        this.nourishment = 1000;
        this.hydration = 1000;

        this.labors = [ ];
        for (var labor in FortressClicker.Labors)
        {
            this.labors.push({ name: labor, experience: 0, isEnabled: false });
        }

        this.isIdle = function()
        { 
            return this.currentJob === null;
        }

        this.tick = function(game)
        {
            if (this.currentJob !== null && this.currentJob.status == FortressClicker.JobStatuses.Cancelled)
            {
                this.currentJob = null;
            }

            if (this.isIdle())
            {
                var job = this.getNextJob();
                if (job !== null)
                {
                    this.currentJob = job;
                }
            }

            if (!this.isIdle())
            {
                this.currentJob.work(this);
                if (this.currentJob.status == FortressClicker.JobStatuses.Completed)
                {
                    var labor = this.getLabor(this.currentJob.requiredLabor);
                    labor.experience++;
                    this.currentJob = null;
                }
            }
        }

        this.getNextJob = function()
        {
            for (var i = 0; i < this.game.jobQueue.length; i++)
            {
                var job = this.game.jobQueue[i];
                if (job.status == FortressClicker.JobStatuses.Pending &&
                    this.getLabor(job.requiredLabor).isEnabled)
                {
                    return job;
                }
            }

            return null;
        }

        this.getLabor = function(name)
        {
            for (var i = 0; i < this.labors.length; i++)
            {
                if (this.labors[i].name == name)
                {
                    return this.labors[i];
                }
            }
            
            return null;
        }

        this.updateLabors = function()
        {
            for (var i = 0; i < this.labors.length; i++)
            {
                var labor = this.labors[i];
                labor.isEnabled = false;
                for (var j = 0; j < this.profession.labors.length; j++)
                {
                    if (labor.name == this.profession.labors[j])
                    {
                        labor.isEnabled = true;
                    }
                }
            }
        }
        
        this.updateLabors();
    }
    
    return Dwarf;
})();