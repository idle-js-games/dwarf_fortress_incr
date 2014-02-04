'use strict';
var FortressClicker = FortressClicker || {};
FortressClicker.Building = (function () {
return function (game, buildingDefinition) {
this.game = game;
this.name = buildingDefinition.name;
this.resources = buildingDefinition.resources;
this.isVisible = buildingDefinition.isVisible;
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
'use strict';
var FortressClicker = FortressClicker || {};
FortressClicker.BuildingDefinition = (function () {
return function () {
this.isVisible = true;
this.isBuilt = false;
this.requiredResources = {};
this.canBuild = function() {
for (var requiredResource in this.requiredResources) {
if (game.inventory.getResourceQuantity(requiredResource) < this.requiredResources[requiredResource]) {
return false;
}
}
return true;
};
};
})();
'use strict';
var FortressClicker = FortressClicker || {};
FortressClicker.BuildingDefinitions = (function () {
var buildingDefinitions = [];
var buildingDefinition = new FortressClicker.BuildingDefinition();
buildingDefinition.name = "Builder's Hut";
buildingDefinition.isVisible = false;
buildingDefinition.initialBuilding = true;
buildingDefinitions.push(buildingDefinition);
buildingDefinition = new FortressClicker.BuildingDefinition();
buildingDefinition.name = "Forest";
buildingDefinition.initialBuilding = true;
buildingDefinition.jobDefinitions = [
FortressClicker.JobDefinitions["Take Clipping"],
FortressClicker.JobDefinitions["Plant Tree"],
FortressClicker.JobDefinitions["Fell Tree"],
];
buildingDefinition.resources = [
FortressClicker.Resources["Tree Clippings"].name,
FortressClicker.Resources.Saplings.name,
FortressClicker.Resources.Trees.name,
FortressClicker.Resources.Logs.name
];
buildingDefinitions.push(buildingDefinition);
buildingDefinition = new FortressClicker.BuildingDefinition();
buildingDefinition.name = "Farmer's Hut";
buildingDefinition.buildJob = new FortressClicker.JobDefinition();
buildingDefinition.buildJob.name = "Build " + buildingDefinition.name;
buildingDefinition.buildJob.requiredLabor = FortressClicker.Labors.Construction;
buildingDefinition.buildJob.skill = FortressClicker.Skills.Builder;
buildingDefinition.buildJob.effortRequired = 25;
buildingDefinition.buildJob.requiredResources[FortressClicker.Resources.Logs.name] = 25;
buildingDefinition.buildJob.providedBuilding = buildingDefinition;
buildingDefinition.jobDefinitions = [
FortressClicker.JobDefinitions["Plant Wheat"],
FortressClicker.JobDefinitions["Harvest Wheat"]
];
buildingDefinition.resources = [
FortressClicker.Resources["Wheat Seeds"].name,
FortressClicker.Resources["Planted Wheat"].name,
FortressClicker.Resources["Harvestable Wheat"].name,
FortressClicker.Resources["Wheat"].name
];
buildingDefinitions.push(buildingDefinition);
buildingDefinition = new FortressClicker.BuildingDefinition();
buildingDefinition.name = "Camp Kitchen";
buildingDefinition.buildJob = new FortressClicker.JobDefinition();
buildingDefinition.buildJob.name = "Build " + buildingDefinition.name;
buildingDefinition.buildJob.requiredLabor = FortressClicker.Labors.Construction;
buildingDefinition.buildJob.skill = FortressClicker.Skills.Builder;
buildingDefinition.buildJob.effortRequired = 25;
buildingDefinition.buildJob.requiredResources[FortressClicker.Resources.Logs.name] = 25;
buildingDefinition.buildJob.providedBuilding = buildingDefinition;
buildingDefinition.jobDefinitions = [
FortressClicker.JobDefinitions["Bake Bread"],
FortressClicker.JobDefinitions["Brew Beer"]
];
buildingDefinition.resources = [
FortressClicker.Resources["Wheat"].name,
FortressClicker.Resources.Bread.name,
FortressClicker.Resources.Beer.name
];
buildingDefinitions.push(buildingDefinition);
buildingDefinition = new FortressClicker.BuildingDefinition();
buildingDefinition.name = "Carpenter's Workshop";
buildingDefinition.buildJob = new FortressClicker.JobDefinition();
buildingDefinition.buildJob.name = "Build " + buildingDefinition.name;
buildingDefinition.buildJob.requiredLabor = FortressClicker.Labors.Construction;
buildingDefinition.buildJob.skill = FortressClicker.Skills.Builder;
buildingDefinition.buildJob.effortRequired = 25;
buildingDefinition.buildJob.requiredResources[FortressClicker.Resources.Logs.name] = 25;
buildingDefinition.buildJob.providedBuilding = buildingDefinition;
buildingDefinition.jobDefinitions = [
FortressClicker.JobDefinitions["Cut Logs into Planks"],
];
buildingDefinition.resources = [
FortressClicker.Resources.Logs.name,
FortressClicker.Resources.Planks.name
];
buildingDefinitions.push(buildingDefinition);
return buildingDefinitions;
})();
'use strict';
var FortressClicker = FortressClicker || {};
FortressClicker.Calendar = (function () {
return function() {
var startingYear = 200;
var daysPerMonth = 28;
var monthsPerSeason = 3;
var seasonsPerYear = 4;
var ticksPerDay = 120;
var ticksPerMonth = ticksPerDay * daysPerMonth;
var ticksPerSeason = ticksPerMonth * monthsPerSeason;
var ticksPerYear = ticksPerSeason * seasonsPerYear;
var seasons =
[
"Spring",
"Summer",
"Autumn",
"Winter"
];
var seasonParts =
[
"Early",
"Mid",
"Late"
];
var months =
[
"Granite",
"Slate",
"Felsite",
"Hematite",
"Malachite",
"Galena",
"Limestone",
"Sandstone",
"Timber",
"Moonstone",
"Opal",
"Obsidian"
];
this.currentTick = 0;
this.currentDate = "";
this.tick = function() {
this.currentTick++;
this.currentDate = getDateString(this.currentTick);
};
var getDateString = function(ticks) {
var year = startingYear + Math.floor(ticks / ticksPerYear);
var season = seasons[Math.floor((ticks % ticksPerYear) / ticksPerSeason)];
var monthIndex = Math.floor((ticks % ticksPerSeason) / ticksPerMonth);
var month = months[monthIndex];
var seasonPart = seasonParts[monthIndex % 3];
var day = Math.floor((ticks % ticksPerMonth) / ticksPerDay) + 1;
return day + getDaySuffix(day) + " " + month + ", " + year + ", " + seasonPart + " " + season;
};
var getDaySuffix = function(day) {
var ones = day % 10;
var tens = Math.floor(day / 10) % 10;
if (tens === 1) {
return "th";
} else if (ones === 1) {
return "st";
} else if (ones === 2) {
return "nd";
} else if (ones === 3) {
return "rd";
} else {
return "th";
}
};
};
})();
'use strict';
var FortressClicker = FortressClicker || {};
FortressClicker.Dwarf = (function () {
return function (game, name, profession) {
this.game = game;
this.profession = profession;
this.name = name;
this.currentJob = null;
this.nourishment = 1000;
this.hydration = 1000;
this.skills = {};
this.isIdle = function () {
return this.currentJob === null;
};
this.isHungry = function () {
return this.nourishment < 100;
};
this.isThirsty = function() {
return this.hydration < 100;
};
this.tick = function () {
if (this.currentJob !== null && this.currentJob.status == FortressClicker.JobStatuses.Cancelled) {
this.currentJob = null;
}
if (this.isIdle() && this.isThirsty()) {
var drinkingJob = this.createDrinkingJob();
if (drinkingJob !== null) {
this.currentJob = drinkingJob;
}
}
if (this.isIdle() && this.isHungry()) {
var eatingJob = this.createEatingJob();
if (eatingJob !== null) {
this.currentJob = eatingJob;
}
}
if (this.isIdle()) {
var job = this.game.getNextJob(this);
if (job !== null) {
this.currentJob = job;
}
}
if (!this.isIdle()) {
this.currentJob.work(this);
if (this.currentJob.status == FortressClicker.JobStatuses.Completed) {
if (this.currentJob.skill !== undefined) {
if (this.skills[this.currentJob.skill] === undefined) {
this.skills[this.currentJob.skill] = 0;
}
this.skills[this.currentJob.skill]++;
}
this.currentJob = null;
}
}
this.nourishment = Math.max(0, this.nourishment - 1);
this.hydration = Math.max(0, this.hydration - 1);
};
this.createEatingJob = function () {
var bestAvailableFoodResource =
_.chain(FortressClicker.Resources)
.filter(function (resource) { return resource.nourishment > 0; })
.sortBy(function (resource) { return -resource.nourishment; })
.filter(function (resource) { return game.inventory.getResourceQuantity(resource) > 0; })
.first()
.value();
if (bestAvailableFoodResource !== undefined && bestAvailableFoodResource !== null) {
var eatingJobDefinition = new FortressClicker.JobDefinition();
eatingJobDefinition.name = "Eating " + bestAvailableFoodResource.name;
eatingJobDefinition.effortRequired = 50;
eatingJobDefinition.isCancelable = false;
eatingJobDefinition.usedResources[bestAvailableFoodResource.name] = 1;
eatingJobDefinition.providedNourishment = bestAvailableFoodResource.nourishment;
return new FortressClicker.Job(eatingJobDefinition, this.game.buildings[0]);
}
return null;
};
this.createDrinkingJob = function() {
var bestAvailableDrinkResource =
_.chain(FortressClicker.Resources)
.filter(function (resource) { return resource.hydration > 0; })
.sortBy(function (resource) { return -resource.hydration; })
.filter(function (resource) { return game.inventory.getResourceQuantity(resource) > 0; })
.first()
.value();
if (bestAvailableDrinkResource !== undefined && bestAvailableDrinkResource !== null) {
var drinkingJobDefinition = new FortressClicker.JobDefinition();
drinkingJobDefinition.name = "Drinking " + bestAvailableDrinkResource.name;
drinkingJobDefinition.effortRequired = 50;
drinkingJobDefinition.isCancelable = false;
drinkingJobDefinition.usedResources[bestAvailableDrinkResource.name] = 1;
drinkingJobDefinition.providedHydration = bestAvailableDrinkResource.hydration;
return new FortressClicker.Job(drinkingJobDefinition, this.game.buildings[0]);
}
return null;
};
};
})();
'use strict';
var FortressClicker = FortressClicker || {};
FortressClicker.Game = (function () {
return function () {
this.wealth = 0;
this.jobDefinitions = FortressClicker.JobDefinitions;
this.jobCategories = FortressClicker.JobCategories;
this.buildingDefinitions = FortressClicker.BuildingDefinitions;
this.professions = FortressClicker.Professions;
this.skillLevels = FortressClicker.SkillLevels;
this.calendar = new FortressClicker.Calendar();
this.inventory = new FortressClicker.Inventory(this.calendar);
this.buildings = [];
this.dwarves = [];
this.tick = function () {
if (!this.isPaused) {
this.calendar.tick();
this.inventory.tick();
for (var i = 0; i < this.dwarves.length; i++) {
this.dwarves[i].tick();
}
}
};
this.getNextJob = function (dwarf) {
for (var buildingName in this.buildings) {
var building = this.buildings[buildingName];
for (var i = 0; i < building.jobQueue.length; i++) {
var job = building.jobQueue[i];
if (job.status == FortressClicker.JobStatuses.Pending &&
dwarf.profession.labors.indexOf(job.requiredLabor) > -1) {
return job;
}
}
};
return null;
};
this.addBuilding = function(buildingDefinition) {
this.buildings.push(new FortressClicker.Building(this, buildingDefinition));
buildingDefinition.isBuilt = true;
};
this.inventory.addResource(FortressClicker.Resources.Trees, 500);
this.inventory.addResource(FortressClicker.Resources.Logs, 500);
this.inventory.addResource(FortressClicker.Resources["Wheat Seeds"], 25);
var dwarfNames = new FortressClicker.NameGenerator().generate(6);
this.dwarves.push(new FortressClicker.Dwarf(this, dwarfNames[0], FortressClicker.Professions.Farmer));
this.dwarves.push(new FortressClicker.Dwarf(this, dwarfNames[1], FortressClicker.Professions.Farmer));
this.dwarves.push(new FortressClicker.Dwarf(this, dwarfNames[2], FortressClicker.Professions.Woodcutter));
this.dwarves.push(new FortressClicker.Dwarf(this, dwarfNames[3], FortressClicker.Professions.Woodcutter));
this.dwarves.push(new FortressClicker.Dwarf(this, dwarfNames[4], FortressClicker.Professions.Woodcutter));
this.dwarves.push(new FortressClicker.Dwarf(this, dwarfNames[5], FortressClicker.Professions.Builder));
for (var i = 0; i < this.buildingDefinitions.length; i++) {
var buildingDefinition = this.buildingDefinitions[i];
if (buildingDefinition.initialBuilding) {
this.addBuilding(buildingDefinition);
}
}
};
})();
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
this.usedResources = jobDefinition.usedResources;
this.providedResources = jobDefinition.providedResources;
this.providedBuilding = jobDefinition.providedBuilding;
this.providedNourishment = jobDefinition.providedNourishment;
this.providedHydration = jobDefinition.providedHydration;
this.status = FortressClicker.JobStatuses.Pending;
this.skill = jobDefinition.skill;
this.isCancelable = true;
for (var usedResource in this.usedResources) {
this.building.game.inventory.removeResource(usedResource, this.usedResources[usedResource]);
}
if (this.providedBuilding !== undefined) {
this.providedBuilding.isBuilt = true;
}
this.work = function (dwarf) {
if (this.status == FortressClicker.JobStatuses.Pending) {
this.building.removeJobFromQueue(this);
this.status = FortressClicker.JobStatuses.InProgress;
}
var dwarfSkillLevel = FortressClicker.SkillLevels.getLevel(dwarf.skills[this.skill] || 0).number;
var adjustedEffort = 1 + 1 * (dwarfSkillLevel / 10);
this.effortSpent += adjustedEffort;
this.percentComplete = (this.effortSpent / this.effortRequired) * 100;
if (this.effortSpent >= this.effortRequired) {
this.complete(dwarf);
}
};
this.cancel = function () {
if (this.status == FortressClicker.JobStatuses.Pending) {
this.building.removeJobFromQueue(this);
}
for (var usedResource in this.usedResources) {
this.building.game.inventory.addResource(usedResource, this.usedResources[usedResource]);
}
if (this.providedBuilding !== undefined) {
this.providedBuilding.isBuilt = false;
}
this.status = FortressClicker.JobStatuses.Cancelled;
};
this.complete = function (dwarf) {
for (var providedResource in this.providedResources) {
this.building.game.inventory.addResource(providedResource, this.providedResources[providedResource]);
}
if (this.providedBuilding !== undefined) {
this.building.game.addBuilding(this.providedBuilding);
this.providedBuilding.isBuilt = true;
}
if (this.providedNourishment !== undefined) {
dwarf.nourishment += this.providedNourishment;
}
if (this.providedHydration !== undefined) {
dwarf.hydration += this.providedHydration;
}
this.status = FortressClicker.JobStatuses.Completed;
};
};
})();
'use strict';
var FortressClicker = FortressClicker || { };
FortressClicker.JobCategories =
{
Agriculture: "Agriculture",
Wood: "Wood",
Stone: "Stone",
Metal: "Metal",
Cloth: "Cloth",
Gem: "Gem",
MiscCrafting: "Misc Crafting",
};
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
'use strict';
var FortressClicker = FortressClicker || {};
FortressClicker.JobDefinitions = (function () {
var jobDefinitions = {};
var jobDefinition = new FortressClicker.JobDefinition();
jobDefinition.name = "Take Clipping";
jobDefinition.requiredLabor = FortressClicker.Labors.Horticulture;
jobDefinition.skill = FortressClicker.Skills.Forester;
jobDefinition.effortRequired = 25;
jobDefinition.requiredResources[FortressClicker.Resources.Trees.name] = 1;
jobDefinition.providedResources[FortressClicker.Resources["Tree Clippings"].name] = 2;
jobDefinitions[jobDefinition.name] = jobDefinition;
jobDefinition = new FortressClicker.JobDefinition();
jobDefinition.name = "Plant Tree";
jobDefinition.requiredLabor = FortressClicker.Labors.Horticulture;
jobDefinition.skill = FortressClicker.Skills.Forester;
jobDefinition.effortRequired = 25;
jobDefinition.requiredResources[FortressClicker.Resources["Tree Clippings"].name] = 1;
jobDefinition.providedResources[FortressClicker.Resources.Saplings.name] = 1;
jobDefinitions[jobDefinition.name] = jobDefinition;
jobDefinition = new FortressClicker.JobDefinition();
jobDefinition.name = "Fell Tree";
jobDefinition.requiredLabor = FortressClicker.Labors.Woodcutting;
jobDefinition.skill = FortressClicker.Skills.Lumberjack;
jobDefinition.effortRequired = 25;
jobDefinition.requiredResources[FortressClicker.Resources.Trees.name] = 2;
jobDefinition.usedResources = {};
jobDefinition.usedResources[FortressClicker.Resources.Trees.name] = 1;
jobDefinition.providedResources[FortressClicker.Resources.Logs.name] = 1;
jobDefinitions[jobDefinition.name] = jobDefinition;
jobDefinition = new FortressClicker.JobDefinition();
jobDefinition.name = "Plant Wheat";
jobDefinition.requiredLabor = FortressClicker.Labors.Farming;
jobDefinition.skill = FortressClicker.Skills.Farmer;
jobDefinition.effortRequired = 25;
jobDefinition.requiredResources[FortressClicker.Resources["Wheat Seeds"].name] = 1;
jobDefinition.providedResources[FortressClicker.Resources["Planted Wheat"].name] = 1;
jobDefinitions[jobDefinition.name] = jobDefinition;
jobDefinition = new FortressClicker.JobDefinition();
jobDefinition.name = "Harvest Wheat";
jobDefinition.requiredLabor = FortressClicker.Labors.Farming;
jobDefinition.skill = FortressClicker.Skills.Farmer;
jobDefinition.effortRequired = 25;
jobDefinition.requiredResources[FortressClicker.Resources["Harvestable Wheat"].name] = 1;
jobDefinition.providedResources[FortressClicker.Resources.Wheat.name] = 1;
jobDefinition.providedResources[FortressClicker.Resources["Wheat Seeds"].name] = 2;
jobDefinitions[jobDefinition.name] = jobDefinition;
jobDefinition = new FortressClicker.JobDefinition();
jobDefinition.name = "Bake Bread";
jobDefinition.requiredLabor = FortressClicker.Labors.Cooking;
jobDefinition.skill = FortressClicker.Skills.Cook;
jobDefinition.effortRequired = 25;
jobDefinition.requiredResources[FortressClicker.Resources.Wheat.name] = 1;
jobDefinition.providedResources[FortressClicker.Resources.Bread.name] = 1;
jobDefinitions[jobDefinition.name] = jobDefinition;
jobDefinition = new FortressClicker.JobDefinition();
jobDefinition.name = "Brew Beer";
jobDefinition.requiredLabor = FortressClicker.Labors.Brewing;
jobDefinition.skill = FortressClicker.Skills.Brewer;
jobDefinition.effortRequired = 25;
jobDefinition.requiredResources[FortressClicker.Resources.Wheat.name] = 1;
jobDefinition.providedResources[FortressClicker.Resources.Beer.name] = 1;
jobDefinitions[jobDefinition.name] = jobDefinition;
jobDefinition = new FortressClicker.JobDefinition();
jobDefinition.name = "Cut Logs into Planks";
jobDefinition.requiredLabor = FortressClicker.Labors.Carpentry;
jobDefinition.skill = FortressClicker.Skills.Carpenter;
jobDefinition.effortRequired = 25;
jobDefinition.requiredResources[FortressClicker.Resources.Logs.name] = 1;
jobDefinition.providedResources[FortressClicker.Resources.Planks.name] = 1;
jobDefinitions[jobDefinition.name] = jobDefinition;
return jobDefinitions;
})();
'use strict';
var FortressClicker = FortressClicker || { };
FortressClicker.JobStatuses = (function()
{
return {
Pending: "Pending",
InProgress: "In Progress",
Completed: "Completed",
};
})();
'use strict';
var FortressClicker = FortressClicker || { };
FortressClicker.Labors = (function()
{
return {
Mining: "Mining",
Masonry: "Masonry",
Stonecarving: "Stonecarving",
Woodcutting: "Woodcutting",
Carpentry: "Carpentry",
Woodcarving: "Woodcarving",
Horticulture: "Horticulture",
Farming: "Farming",
Cooking: "Cooking",
Brewing: "Brewing",
Smelting: "Smelting",
Blacksmithing: "Blacksmithing",
Metalworking: "Metalworking",
WeaponCrafting: "WeaponCrafting",
ArmorCrafting: "ArmorCrafting",
Gemcutting: "Gemcutting",
JewelryMaking: "JewelryMaking",
Weaving: "Weaving",
Tailoring: "Tailoring",
Pottery: "Pottery",
Leatherworking: "Leatherworking",
Bonecarving: "Bonecarving",
AnimalHusbandry: "AnimalHusbandry",
Butchery: "Butchery",
Architecture: "Architecture",
Construction: "Construction",
};
})();
'use strict';
var FortressClicker = FortressClicker || {};
FortressClicker.NameGenerator = (function () {
return function () {
var names = [
"Alaric", "Aldin", "Alfginnar", "Algrim", "Alrik", "Arik", "Argam",
"Arngrim", "Asabelle", "Azram", "Baldrick", "Balik", "Balin", "Balzud",
"Baragor", "Bardin", "Barik", "Barin", "Belegar", "Belegol", "Belegond",
"Bhatran", "Birgit", "Borgo", "Borin", "Borri", "Brand", "Brodrika",
"Brokki", "Brondi", "Bronn", "Budrik", "Burlok", "Dadrin", "Daled",
"Dammin", "Dared", "Darek", "Dertain", "Dimgol", "Dimrond", "Dimzad",
"Dorin", "Dorri", "Drakki", "Drokki", "Drong", "Drumin", "Dumin",
"Dunhilda", "Durak", "Duregar", "Durgim", "Durim", "Durin", "Durrag",
"Falagrim", "Faragrim", "Fimbur", "Finn", "Flakki", "Fodrin", "Fregar",
"Furgil", "Gadrin", "Garik", "Garil", "Garin", "Garag", "Gharth",
"Gimli", "Gomrund", "Gorazin", "Gorek", "Gorin", "Gorem", "Gorm",
"Gorrin", "Gotrek", "Gottri", "Grim", "Grimbul", "Grimdal", "Grimli",
"Grimnir", "Grimwold", "Grodrik", "Grogan", "Grogril", "Grom", "Grond",
"Groth", "Grum", "Grumdi", "Grun", "Grundi", "Grung", "Grunni",
"Guddi", "Gudrun", "Gumli", "Gundrik", "Gurni", "Gurtrud", "Guttri",
"Gwenelyn", "Haakon", "Hadrin", "Haki", "Harek", "Haragin", "Harakaz",
"Heganbor", "Helgar", "Hergar", "Herger", "Hilda", "Hrungnor", "Holgar",
"Horgar", "Hugen", "Hurgin", "Janek", "Kadrin", "Katalin", "Kazi",
"Kazador", "Kazarik", "Ketil", "Kimril", "Korgan", "Kragg", "Krudd",
"Krung", "Kurgan", "Kurgaz", "Logan", "Logazor", "Loki", "Lokri",
"Lothor", "Lunn", "Magnund", "Morag", "Mordin", "Mordred", "Morek",
"Morgrim", "Morngrim", "Mundri", "Okri", "Oldor", "Orek", "Orgri",
"Othos", "Ragni", "Ragnar", "Ranulf", "Rarek", "Rorek", "Rukh",
"Sigrid", "Sindri", "Skag", "Skaggi", "Skaldor", "Skalf", "Skalli",
"Skorri", "Skuddi", "Smakki", "Snaddri", "Snarri", "Snorri", "Storri",
"Strom", "Stromni", "Thialfi", "Thingrim", "Thorbal", "Thorek", "Thori",
"Thorin", "Thorlek", "Thorgrim", "Throbbi", "Throbin", "Thrung", "Trygg",
"Ulfar", "Ulrik", "Ulther", "Urist", "Yorri",
];
this.generate = function (count) {
var generatedNames = [];
while (generatedNames.length < count) {
var name = names[Math.floor(Math.random() * names.length)];
if (generatedNames.indexOf(name) === -1) {
generatedNames.push(name);
}
}
return generatedNames;
};
};
})();
'use strict';
var FortressClicker = FortressClicker || {};
FortressClicker.Nobles = (function () {
return function() {
};
})();
'use strict';
var FortressClicker = FortressClicker || { };
FortressClicker.Professions = (function()
{
return {
Miner:
{
name: "Miner",
labors:
[
FortressClicker.Labors.Mining,
FortressClicker.Labors.Masonry,
FortressClicker.Labors.Stonecarving,
],
},
Woodcutter:
{
name: "Woodcutter",
labors:
[
FortressClicker.Labors.Woodcutting,
FortressClicker.Labors.Carpentry,
FortressClicker.Labors.Woodcarving,
],
},
Farmer:
{
name: "Farmer",
labors:
[
FortressClicker.Labors.Horticulture,
FortressClicker.Labors.Farming,
FortressClicker.Labors.Cooking,
FortressClicker.Labors.Brewing,
FortressClicker.Labors.Weaving,
FortressClicker.Labors.Tailoring,
],
},
Rancher:
{
name: "Rancher",
labors:
[
FortressClicker.Labors.Leatherworking,
FortressClicker.Labors.AnimalHusbandry,
FortressClicker.Labors.Butchery,
FortressClicker.Labors.Cooking,
],
},
Builder:
{
name: "Builder",
labors:
[
FortressClicker.Labors.Architecture,
FortressClicker.Labors.Construction,
],
},
Blacksmith:
{
name: "Blacksmith",
labors:
[
FortressClicker.Labors.Smelting,
FortressClicker.Labors.Blacksmithing,
FortressClicker.Labors.Metalworking,
FortressClicker.Labors.WeaponCrafting,
FortressClicker.Labors.ArmorCrafting,
],
},
Jeweler:
{
name: "Jeweler",
labors:
[
FortressClicker.Labors.Gemcutting,
FortressClicker.Labors.JewelryMaking,
],
},
};
})();
'use strict';
var FortressClicker = FortressClicker || {};
FortressClicker.Resources = (function () {
var resources = {};
resources.Saplings = { name: "Saplings" };
resources["Tree Clippings"] = { name: "Tree Clippings" };
resources.Trees = { name: "Trees" };
resources.Logs = { name: "Logs", isBuildingMaterial: true };
resources["Wheat Seeds"] = { name: "Wheat Seeds" };
resources["Harvestable Wheat"] = { name: "Harvestable Wheat" };
resources["Planted Wheat"] = { name: "Planted Wheat" };
resources.Wheat = { name: "Wheat" };
resources.Bread = { name: "Bread", nourishment: 1000 };
resources.Beer = { name: "Beer", hydration: 1000 };
resources.Planks = { name: "Planks" };
// Growth
resources.Saplings.changesTo = resources.Trees;
resources.Saplings.changeTime = 100;
resources["Planted Wheat"].changesTo = resources["Harvestable Wheat"];
resources["Planted Wheat"].changeTime = 100;
return resources;
})();
'use strict';
var FortressClicker = FortressClicker || {};
FortressClicker.SkillLevels = (function () {
var levels = [
{ number: -5, name: "Dabbling", minimum: 0, },
{ number: -4, name: "Novice", minimum: 50, },
{ number: -3, name: "Adequate", minimum: 110, },
{ number: -2, name: "Competent", minimum: 180, },
{ number: -1, name: "Skilled", minimum: 260, },
{ number: 0, name: "Proficient", minimum: 350, },
{ number: 1, name: "Talented", minimum: 450, },
{ number: 2, name: "Adept", minimum: 560, },
{ number: 3, name: "Expert", minimum: 680, },
{ number: 4, name: "Professional", minimum: 810, },
{ number: 5, name: "Accomplished", minimum: 950, },
{ number: 6, name: "Great", minimum: 1100, },
{ number: 7, name: "Master", minimum: 1260, },
{ number: 8, name: "High Master", minimum: 1430, },
{ number: 9, name: "Grand Master", minimum: 1610, },
{ number: 10, name: "Legendary", minimum: 1800, },
{ number: 11, name: "Legendary", minimum: 2000, },
{ number: 12, name: "Legendary", minimum: 2210, },
{ number: 13, name: "Legendary", minimum: 2430, },
{ number: 14, name: "Legendary", minimum: 2660, },
{ number: 15, name: "Legendary", minimum: 2900, },
];
return {
getLevel: function (experience) {
for (var i = levels.length - 1; i > -1; i--) {
if (experience >= levels[i].minimum) {
return levels[i];
}
}
}
};
})();
'use strict';
var FortressClicker = FortressClicker || {};
FortressClicker.Skills = (function () {
return {
Farmer: "Farmer",
Forester: "Forester",
Lumberjack: "Lumberjack",
Carpenter: "Carpenter",
Cook: "Cook",
Brewer: "Brewer",
Miner: "Miner",
Builder: "Builder",
};
})();
