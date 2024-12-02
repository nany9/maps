const tg = window.Telegram.WebApp;
tg.showAlert(tg.initDataUnsafe?.user?.first_name);
tg.LocationManager.init();


var map = L.map('map').fitWorld();

var counter = 0;

// https://static.thenounproject.com/png/462952-200.png

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 16,
    minZoom: 13
    
}).addTo(map);

var icon = L.icon({
    iconUrl: "https://static.thenounproject.com/png/462952-200.png",
    iconSize: [50, 50]
});

var marker = L.marker([63.602492, 53.880256], { icon: icon }).addTo(map);


L.Routing.control({
    waypoints: [
      L.latLng(63.602927, 53.873839),
      L.latLng(63.592490, 53.908742)
    ],
    lineOptions: {
        styles: [{color: 'blue'}]
    },
    addWaypoints: false
  }).addTo(map);

document.getElementsByClassName("leaflet-routing-alternatives-container")[0].remove();

document.getElementsByClassName("leaflet-bottom leaflet-right")[0].remove();

const geo_btn = document.getElementById("geo-div");
geo_btn.addEventListener("click", function (e){
    tg.showAlert(tg.LocationManager.isInited);

    tg.LocationManager.getLocation(function loc(value, err){
        tg.showAlert(value.latitude);
    });
});

