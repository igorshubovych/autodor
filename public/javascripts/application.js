var conn = null, map = null;

$(document).ready(function() {
    conn = new CM.Tiles.CloudMade.Web({key: 'BC9A493B41014CAABB98F0471D759707'});
    map = new CM.Map('map', conn);
    map.setCenter(new CM.LatLng(51.514, -0.137), 15);
	map.addControl(new CM.LargeMapControl());
	map.addControl(new CM.ScaleControl());
	map.addControl(new CM.OverviewMapControl());
});

function createMap(lat, lon, zoom) {
	map.setCenter(new CM.LatLng(lat, lon), zoom);
}
