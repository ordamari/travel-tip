
export const mapService = {
    initMap,
    addMarker,
    panTo,
    getLocations,
    getGeocode,
    panTo
}

var gLocations=[];

var map

export function initMap(lat = 29.55805, lng = 34.94821) {
    return _connectGoogleApi()
        .then(() => {
            console.log('google available');
            map = new google.maps.Map(
                document.querySelector('#map'), {
                center: { lat, lng },
                zoom: 15
            })

            var infoWindow = new google.maps.InfoWindow(
                { content: 'Click the map to get Lat/Lng!', position: {lat,lng} });
            infoWindow.open(map);

            map.addListener('click', function (mapsMouseEvent) {
                console.log('click');
                // Close the current InfoWindow.
                infoWindow.close();

                // Create a new InfoWindow.
                let timestemp= Date.now();
                gLocations.push(createLocation(lat,lng,timestemp));
                console.log(gLocations);
                infoWindow = new google.maps.InfoWindow({ position: mapsMouseEvent.latLng });
                infoWindow.setContent(mapsMouseEvent.latLng.toString());
                infoWindow.open(map);
            });
        })
}

function createLocation(lat,lng,createAte){
    var location={
        lat,
        lng,
        createAte
    }
    return location
}



export function getLocations(){
    return gLocations;
}


function addMarker(loc) {
    var marker = new google.maps.Marker({
        position: loc,
        map: map,
        title: 'Hello World!'
    });
    return marker;
}

export function panTo(lat, lng) {
    var laLatLng = new google.maps.LatLng(lat, lng);
    console.log("panTo -> laLatLng", laLatLng) 
    map.panTo(laLatLng);
}


function _connectGoogleApi() {
    if (window.google) return Promise.resolve()
    const API_KEY = 'AIzaSyB0GFpf1xOP_iLzHNeqn5GFUugk38cbc6Y'; //TODO: Enter your API Key
    var elGoogleApi = document.createElement('script');
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;
    elGoogleApi.async = true;
    document.body.append(elGoogleApi);

    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve;
        elGoogleApi.onerror = () => reject('Google script failed to load')
    })
}

export function getGeocode(place) {
    const API_KEY = 'AIzaSyB0GFpf1xOP_iLzHNeqn5GFUugk38cbc6Y';
    var prmRes = axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${place}&key=${API_KEY}`);
    return prmRes.then(res => {
        return res.data
    })
}

// export function getGeocode() {
//     const API_KEY = 'AIzaSyB0GFpf1xOP_iLzHNeqn5GFUugk38cbc6Y';
//     var prmRes = axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=${API_KEY}`);
//     return prmRes.then(res => {
//         return res.data
//     })
// }





