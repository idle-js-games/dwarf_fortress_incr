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
