var mymap = L.map('mapid').setView([40.505, -0.09], 2);
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoiZGV2c3BhY2VzaGlwIiwiYSI6ImNqcHVoMWMydDAxbnYzeGxvMXQxcDZ3ZGsifQ.4AUjyUquNHWIKS3ttyogrQ'
}).addTo(mymap);