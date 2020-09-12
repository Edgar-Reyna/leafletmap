const tilesProvider='	https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'

let myMap=L.map('myMap').setView([26.88655504536664,-101.42036855220796],15)

L.tileLayer(tilesProvider,{
    maxZoom:18,
}).addTo(myMap)

let marker=L.marker([26.88655504536664,-101.42036855220796]).bindPopup("<b>Edificio GAN</b>").addTo(myMap).openPopup()

//marker.bindPopup("<b>Edificio GAN</b><br>Centrado .").openPopup();

var circle = L.circle([26.88655504536664,-101.42036855220796], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 50
}).addTo(myMap);

/*let iconMarker=L.icon({
    iconUrl:'marcared.png',
    iconsize:[60,60],
    iconAncor:[30,60]
})

let marker2=L.marker([51.51,-0.09],{icon:iconMarker}).addTo(myMap)*/

myMap.doubleClickZoom.disable()

myMap.on('dblclick',e=>{
    let latLng=myMap.mouseEventToLatLng(e.originalEvent)
    //console.log(latLng)
    L.marker([latLng.lat,latLng.lng],{draggable:true}).addTo(myMap)    
})

myMap.on('click',e=>{
    var tempMarker = this;
    myMap.removeLayer(tempMarker);
})

navigator.geolocation.getCurrentPosition(
    (pos)=>{
        const {coords}=pos
        //console.log(coords)
        L.marker([coords.latitude,coords.longitude]).addTo(myMap)
    },
    (err)=>{
        console.log(err)
    },
    {
        enableHighAccuracy:true,
        timeout:5000,
        maximumAge:0
    }
)