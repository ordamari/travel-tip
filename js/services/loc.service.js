import {storage} from './storage-service.js'

export const locService = {
    getId: getId,
    getName: getName,
    getLocs: getLocs,
    getPosition: getPosition,
    getAt: getAt,
}

var locs = [{ lat: 11.22, lng: 22.11 }]

function getLocs() {
    var savedLoc = storage.loadFromStorage('locations');
    return new Promise((resolve, reject) => {
        if(savedLoc !== null) resolve (savedLoc); 
        setTimeout(() => {
            resolve(locs);
        }, 2000)
    });
}


function getPosition() {
    console.log('Getting Pos');
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

function getId() {
    return axios.get('http://www.filltext.com/?rows=10&id={index}&pretty=true')
        .then(res => res.data)
}

function getName(lat, lang) {
    const API_KEY = 'AIzaSyB0GFpf1xOP_iLzHNeqn5GFUugk38cbc6Y';
    return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lang}&location_type=ROOFTOP&result_type=street_address&key=${API_KEY}`)
        .then(res => res.data)
}

function getAt(Time){
return Time;
}
