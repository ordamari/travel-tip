console.log('Main!');

import { locService } from './services/loc.service.js'
import { mapService, getGeocode } from './services/map.service.js'



locService.getLocs()
    .then(locs => console.log('locs', locs))

window.onload = () => {
    mapService.initMap()
        .then(() => {

            mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 });
        })
        .catch(console.log('INIT MAP ERROR'));

    locService.getPosition()
        .then(pos => {
            console.log('User position is:', pos.coords);
        })
        .catch(err => {
            console.log('Cannot get user-position', err);
        })
}

document.querySelector('.btn').addEventListener('click', (ev) => {
    console.log('Aha!', ev.target);
    // mapService.panTo(29.55805,34.94821)
    // mapService.panTo(35.6895, 139.6917);
    mapService.getPosition();
})

document.querySelector('.search-place').addEventListener('click',(ev)=>{
    let place=document.querySelector('.place').value;
    mapService.getGeocode(place)
    .then(res=>{
            document.querySelector('.address').innerHTML=res.results[0].formatted_address;
            let lat=res.results[0].geometry.location.lat
            let lng=res.results[0].geometry.location.lng
            mapService.panTo(lat,lng);
            mapService.addMarker({lat,lng})
            mapService.createLocation(lat,lng,Date.now())
        });
})