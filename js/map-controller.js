

var gLocations=[]
if(loadFromStorage(keyLocations)) gLocations=loadFromStorage(keyLocations);


function createLocation(lat,lng){
    var location={
        id:makeId(),
        lat,
        lng,
        name:''
    }
    return location
}

function setLocationName(name){
    gLocations[gLocations.length-1].name=name;
    saveToStorage(keyLocations,gLocations)
}

function setLocation(location){
    gLocations.push(location);
}

function getLocations(){
    return gLocations;
}

function findLocationIdxById(id){
    return gLocations.findIndex(location=>location.id===id);
}

function removeLocationByIdx(locationIdx){
    gLocations.splice(locationIdx,1);
    saveToStorage(keyLocations,gLocations);
    renderLocations();
}

export function addClickEvents(){
    document.querySelector('.search-place').addEventListener('click',onGetPlace)
}