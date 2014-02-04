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
'use strict';
var FortressClicker = FortressClicker || {};
FortressClicker.BuildingDefinition = (function () {
return function () {
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
var buildingDefinitions = {};
var buildingDefinition = new FortressClicker.BuildingDefinition();
buildingDefinition.name = "Builder's Hut";
buildingDefinition.isBuildable = false;
buildingDefinition.initialBuilding = true;
buildingDefinitions[buildingDefinition.name] = buildingDefinition;
buildingDefinition = new FortressClicker.BuildingDefinition();
buildingDefinition.name = "Forest";
buildingDefinition.isBuildable = false;
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
buildingDefinitions[buildingDefinition.name] = buildingDefinition;
buildingDefinition = new FortressClicker.BuildingDefinition();
buildingDefinition.name = "Open Field";
buildingDefinition.isBuildable = false;
buildingDefinition.initialBuilding = true;
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
buildingDefinitions[buildingDefinition.name] = buildingDefinition;
buildingDefinition = new FortressClicker.BuildingDefinition();
buildingDefinition.name = "Camp Kitchen";
buildingDefinition.isBuildable = false;
buildingDefinition.initialBuilding = true;
buildingDefinition.jobDefinitions = [
FortressClicker.JobDefinitions["Bake Bread"],
FortressClicker.JobDefinitions["Brew Beer"]
];
buildingDefinition.resources = [
FortressClicker.Resources["Wheat"].name,
FortressClicker.Resources.Bread.name,
FortressClicker.Resources.Beer.name
];
buildingDefinitions[buildingDefinition.name] = buildingDefinition;
buildingDefinition = new FortressClicker.BuildingDefinition();
buildingDefinition.name = "Carpenter's Workshop";
buildingDefinition.isBuildable = true;
buildingDefinition.initialBuilding = false;
buildingDefinition.buildJob = new FortressClicker.JobDefinition();
buildingDefinition.buildJob.effortRequired = 250;
buildingDefinition.buildJob.requiredResources[FortressClicker.Resources.Logs.name] = 25;
buildingDefinition.jobDefinitions = [
FortressClicker.JobDefinitions["Cut Logs into Planks"],
];
buildingDefinition.resources = [
FortressClicker.Resources.Logs.name,
FortressClicker.Resources.Planks.name
];
buildingDefinitions[buildingDefinition.name] = buildingDefinition;
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
var FortressClicker = FortressClicker || { };
FortressClicker.Dwarf = (function() {
return function(game, profession) {
this.game = game;
this.profession = profession;
this.name = new FortressClicker.NameGenerator().generate();
this.currentJob = null;
this.nourishment = 1000;
this.hydration = 1000;
this.isIdle = function() {
return this.currentJob === null;
};
this.tick = function() {
if (this.currentJob !== null && this.currentJob.status == FortressClicker.JobStatuses.Cancelled) {
this.currentJob = null;
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
this.currentJob = null;
}
}
};
};
})();
'use strict';
var FortressClicker = FortressClicker || {};
FortressClicker.Game = (function () {
return function () {
this.wealth = 0;
this.mapSize = 4096;
this.jobDefinitions = FortressClicker.JobDefinitions;
this.jobCategories = FortressClicker.JobCategories;
this.professions = FortressClicker.Professions;
this.calendar = new FortressClicker.Calendar();
this.inventory = new FortressClicker.Inventory(this.calendar);
this.buildings = {};
this.dwarves = [];
this.resources = {};
this.tick = function () {
this.calendar.tick();
this.inventory.tick();
for (var i = 0; i < this.dwarves.length; i++) {
this.dwarves[i].tick();
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
this.inventory.addResource(FortressClicker.Resources.Trees, 10);
this.inventory.addResource(FortressClicker.Resources["Wheat Seeds"], 10);
this.dwarves.push(new FortressClicker.Dwarf(this, FortressClicker.Professions.Farmer));
this.dwarves.push(new FortressClicker.Dwarf(this, FortressClicker.Professions.Farmer));
this.dwarves.push(new FortressClicker.Dwarf(this, FortressClicker.Professions.Woodcutter));
this.dwarves.push(new FortressClicker.Dwarf(this, FortressClicker.Professions.Woodcutter));
this.dwarves.push(new FortressClicker.Dwarf(this, FortressClicker.Professions.Builder));
this.dwarves.push(new FortressClicker.Dwarf(this, FortressClicker.Professions.Builder));
for (var buildingDefinitionName in FortressClicker.BuildingDefinitions) {
var buildingDefinition = FortressClicker.BuildingDefinitions[buildingDefinitionName];
if (buildingDefinition.initialBuilding) {
this.buildings[buildingDefinitionName] = new FortressClicker.Building(this, buildingDefinition);
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
'use strict';
var FortressClicker = FortressClicker || {};
FortressClicker.JobDefinitions = (function () {
var jobDefinitions = {};
var jobDefinition = new FortressClicker.JobDefinition();
jobDefinition.name = "Take Clipping";
jobDefinition.requiredLabor = FortressClicker.Labors.Horticulture;
jobDefinition.effortRequired = 25;
jobDefinition.requiredResources[FortressClicker.Resources.Trees.name] = 1;
jobDefinition.providedResources[FortressClicker.Resources["Tree Clippings"].name] = 2;
jobDefinitions[jobDefinition.name] = jobDefinition;
jobDefinition = new FortressClicker.JobDefinition();
jobDefinition.name = "Plant Tree";
jobDefinition.requiredLabor = FortressClicker.Labors.Horticulture;
jobDefinition.effortRequired = 25;
jobDefinition.requiredResources[FortressClicker.Resources["Tree Clippings"].name] = 1;
jobDefinition.providedResources[FortressClicker.Resources.Saplings.name] = 1;
jobDefinitions[jobDefinition.name] = jobDefinition;
jobDefinition = new FortressClicker.JobDefinition();
jobDefinition.name = "Fell Tree";
jobDefinition.requiredLabor = FortressClicker.Labors.Woodcutting;
jobDefinition.effortRequired = 25;
jobDefinition.requiredResources[FortressClicker.Resources.Trees.name] = 2;
jobDefinition.usedResources = {};
jobDefinition.usedResources[FortressClicker.Resources.Trees.name] = 1;
jobDefinition.providedResources[FortressClicker.Resources.Logs.name] = 1;
jobDefinitions[jobDefinition.name] = jobDefinition;
jobDefinition = new FortressClicker.JobDefinition();
jobDefinition.name = "Plant Wheat";
jobDefinition.requiredLabor = FortressClicker.Labors.Farming;
jobDefinition.effortRequired = 25;
jobDefinition.requiredResources[FortressClicker.Resources["Wheat Seeds"].name] = 1;
jobDefinition.providedResources[FortressClicker.Resources["Planted Wheat"].name] = 1;
jobDefinitions[jobDefinition.name] = jobDefinition;
jobDefinition = new FortressClicker.JobDefinition();
jobDefinition.name = "Harvest Wheat";
jobDefinition.requiredLabor = FortressClicker.Labors.Farming;
jobDefinition.effortRequired = 25;
jobDefinition.requiredResources[FortressClicker.Resources["Harvestable Wheat"].name] = 1;
jobDefinition.providedResources[FortressClicker.Resources.Wheat.name] = 1;
jobDefinition.providedResources[FortressClicker.Resources["Wheat Seeds"].name] = 2;
jobDefinitions[jobDefinition.name] = jobDefinition;
jobDefinition = new FortressClicker.JobDefinition();
jobDefinition.name = "Bake Bread";
jobDefinition.requiredLabor = FortressClicker.Labors.Cooking;
jobDefinition.effortRequired = 25;
jobDefinition.requiredResources[FortressClicker.Resources.Wheat.name] = 1;
jobDefinition.providedResources[FortressClicker.Resources.Bread.name] = 1;
jobDefinitions[jobDefinition.name] = jobDefinition;
jobDefinition = new FortressClicker.JobDefinition();
jobDefinition.name = "Brew Beer";
jobDefinition.requiredLabor = FortressClicker.Labors.Brewing;
jobDefinition.effortRequired = 25;
jobDefinition.requiredResources[FortressClicker.Resources.Wheat.name] = 1;
jobDefinition.providedResources[FortressClicker.Resources.Beer.name] = 1;
jobDefinitions[jobDefinition.name] = jobDefinition;
jobDefinition = new FortressClicker.JobDefinition();
jobDefinition.name = "Cut Logs into Planks";
jobDefinition.requiredLabor = FortressClicker.Labors.Carpentry;
jobDefinition.effortRequired = 25;
jobDefinition.requiredResources[FortressClicker.Resources.Logs.name] = 1;
jobDefinition.requiredResources[FortressClicker.Resources.Planks.name] = 1;
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
var FortressClicker = FortressClicker || { };
FortressClicker.NameGenerator = (function()
{
function NameGenerator()
{
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
this.generate = function()
{
return names[Math.floor(Math.random() * names.length)];
}
}
return NameGenerator;
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
