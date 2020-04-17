const fs = require('fs');

let data = JSON.parse(fs.readFileSync('../data/animal-disease-summary.json'));

let same_family = [];

data.forEach(e => {
    let arr = Object.entries(e);
    let virus = [];
    for (let i = 3; i < arr.length; i++) {
        let obj = {};
        obj.virus_name = arr[i][0];
        obj.influence = arr[i][1];
        if (obj.influence != '0') {
            virus.push(obj)
        }

    }
    e.virus = virus
})
data.forEach(e => {
    delete e.YellowFeverVirus;
    delete e.SARS;
    delete e.H5N1;
    delete e.HCPS;
    delete e.HFRS;
    delete e.SouthAmericanHemoorhagicFeverArenaviruses;
    delete e.RiftValleyFeverVirus;
    delete e.MarburgVirus;
    delete e.LassaFeverVirus;
    delete e.EbolaVirus;
    delete e.CrimeanCongoHemorrhagicFeverVirus;
    delete e.TickBorneEncephalitisVirus;
    delete e.VenezuelanEquineEncephalitisVirus;
    delete e.RabiesVirus;
    delete e.NiphaVirus;
    delete e.CercopithecineHerpesVirus;
    delete e.LymphocyticChoriomeningitisVirus;
})


/* merge genus with same family */

let family_map = new Map();
data.forEach(e => {
    let family = e.family;
    let genus = e.genus;
    if (!family_map.has(family)) {
        family_map.set(family, [{
            genus_name: genus
        }])
    } else {
        family_map.get(family).push({
            genus_name: e.genus
        })
    }
})

let all_family = Array.from(family_map)


let final = [];

all_family.forEach(e => {
    let obj = {};
    obj.family = e[0];
    let genus = e[1];
    genus.forEach(e => {
        let thisgenus = e.genus_name;
        let matchedInfo = data.filter(obj => {
            return obj.genus === thisgenus;
        })
        e.common_name = matchedInfo[0].name
        e.virus_carried = matchedInfo[0].virus;

    })
    obj.genus = genus;
    final.push(obj)
})

fs.writeFileSync('../data/family-grouped.json', JSON.stringify(final))


