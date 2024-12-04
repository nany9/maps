const tg = window.Telegram.WebApp;
tg.disableVerticalSwipes();
//tg.showAlert(tg.initDataUnsafe?.user?.first_name);
tg.LocationManager.init();


var map = L.map('map').setView([63.5917327057322, 53.90797957093808], 13);




function addMarker(value){

    var icon = L.icon({
        iconUrl: "https://cdn-icons-png.flaticon.com/512/2527/2527411.png",
        iconSize: [24, 24]
    });
    var marker = L.marker([value.latitude, value.longitude], { icon: icon }).addTo(map);
    map.setView([value.latitude, value.longitude], 16);
}

function changeAddressText(text){
    const data = JSON.parse(text)["address"]
    const street = data["road"].replace('улица', '');
    d_add.textContent = `${street} ${data["house_number"]} (${data["town"]})`
}

function getAddress(v){
    url = `https://nominatim.openstreetmap.org/reverse.php?lat=${v.latitude}&lon=${v.longitude}&zoom=18&format=jsonv2`;

fetch(url)
.then(response => response.text())
.then(text => changeAddressText(text))

}




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

// document.getElementsByClassName("leaflet-routing-alternatives-container")[0].remove();

document.getElementsByClassName("leaflet-bottom leaflet-right")[0].remove();

const geo_btn = document.getElementById("geo-div");
const debug = document.getElementById("debug-text");
const d_add = document.getElementById("debug-address");
geo_btn.addEventListener("click", function (e){
    //tg.showAlert(tg.LocationManager.isInited);
    map.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
           layer.remove();
        }
      });

    tg.LocationManager.getLocation(function loc(value){
        getAddress(value);
        debug.textContent = value.latitude + ',' + value.longitude;
        addMarker(value);
        
    });
});

