import { mapService } from './services/map.service.js'
import { locService } from './services/loc.service.js'


export function renderTable() {
    console.log('inside');
    var locs = mapService.getLocations();
    var htmlStr;
    locs.forEach((loc, idx) => {
        const elTbody = document.querySelector('.render-container');
        elTbody.innerHTML='';
        var name;
        locService.getName(loc.lat, loc.lng)
            .then(res => {
                console.log(res.plus_code.compound_code);
                name = res.plus_code.compound_code
                htmlStr =(` <tr>
        <td>${loc.id}</td>
        <td>${name}</td>
        <td>${loc.lat}, ${loc.lng}</td>
        <td><button data-set-lat=${loc.lat} data-set-lng=${loc.lng}>GO TO</button></td>
        <td><button data-set-idx=${idx}>X</button></td>
    </tr>`)
    elTbody.innerHTML += htmlStr;
            });
    })
    console.log(htmlStr);
}


// function createLocation(lat,lng){
//     var location={
//         id:makeId(),
//         lat,
//         lng,
//         name:''
//     }
//     return location
// }

// function setLocationName(name){
//     gLocations[gLocations.length-1].name=name;
//     saveToStorage(keyLocations,gLocations)
// }

// function setLocation(location){
//     gLocations.push(location);
// }

// function getLocations(){
//     return gLocations;
// }

// function findLocationIdxById(id){
//     return gLocations.findIndex(location=>location.id===id);
// }

// function removeLocationByIdx(locationIdx){
//     gLocations.splice(locationIdx,1);
//     saveToStorage(keyLocations,gLocations);
//     renderLocations();
// }
