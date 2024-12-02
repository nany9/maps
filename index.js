const tg = window.Telegram.WebApp;
tg.showAlert(tg.initDataUnsafe?.user?.first_name);
tg.LocationManager.init();


var map = L.map('map').setView([63.5917327057322, 53.90797957093808], 13);

var counter = 0;

// https://static.thenounproject.com/png/462952-200.png

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 16,
    minZoom: 13
    
}).addTo(map);






// L.Routing.control({
//     waypoints: [
//       L.latLng(63.602927, 53.873839),
//       L.latLng(63.592490, 53.908742)
//     ],
//     lineOptions: {
//         styles: [{color: 'blue'}]
//     },
//     addWaypoints: false
//   }).addTo(map);

document.getElementsByClassName("leaflet-routing-alternatives-container")[0].remove();

document.getElementsByClassName("leaflet-bottom leaflet-right")[0].remove();

const geo_btn = document.getElementById("geo-div");
const debug = document.getElementById("debug-text");
geo_btn.addEventListener("click", function (e){
    tg.showAlert(tg.LocationManager.isInited);

    tg.LocationManager.getLocation(function loc(value){
        
        debug.textContent = value.latitude + ',' + value.longitude;
        var icon = L.icon({
            iconUrl: "https://cdn-icons-png.flaticon.com/512/2527/2527411.png",
            iconSize: [50, 50]
        });
        var marker = L.marker([value.latitude, value.longitude], { icon: icon }).addTo(map);
    });
});

