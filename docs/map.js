const tilesProvider='	https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'

let myMap=L.map('myMap').setView([26.88655504536664,-101.42036855220796],16)

L.tileLayer(tilesProvider,{
    maxZoom:18,
}).addTo(myMap)

navigator.geolocation.getCurrentPosition(
    (pos)=>{
        const {coords}=pos;
       
        L.marker([coords.latitude,coords.longitude]).addTo(myMap);

        myMap.locate({setView: true, maxZoom: 16});

        var circle = L.circle([coords.latitude,coords.longitude], {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.5,
            radius: 20
        }).addTo(myMap);

        
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

myMap.doubleClickZoom.disable()

myMap.on('dblclick',e=>{
    let latLng=myMap.mouseEventToLatLng(e.originalEvent)
    //console.log(latLng)
    L.marker([latLng.lat,latLng.lng],{draggable:true}).addTo(myMap)    
})
