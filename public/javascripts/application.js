var cloudmade = null, map = null;
var CM_APIKEY = 'BC9A493B41014CAABB98F0471D759707';

var points = {
	'Kyiv': new CM.LatLng(50.433, 30.521),
	'Lviv': new CM.LatLng(49.775, 24.026, 15),
	'Kharkiv stadium': new CM.LatLng(49.980, 36.261),
	'Donetsk stadium': new CM.LatLng(48.021, 37.810),
	'Kyiv stadium': new CM.LatLng(50.433, 30.521),
	'Lviv stadium': new CM.LatLng(49.775, 24.026)
}

var initMap = function() {
	if (map == null) {
		cloudmade = new CM.Tiles.CloudMade.Web({key: CM_APIKEY});
		map = new CM.Map('map', cloudmade);
		map.setCenter(points['Kyiv'], 15);
		map.addControl(new CM.LargeMapControl());
		map.addControl(new CM.ScaleControl());
		map.addControl(new CM.OverviewMapControl());
	}
}

var centerMap = function(lat, lon, zoom) {
	initMap();
	map.setCenter(new CM.LatLng(lat, lon), zoom);
}

var mapToPoint = function(name, zoom) {
	initMap();
	map.setCenter(points[name], zoom);
}

$(document).ready(function() {
	//$("#tabs").tabs();
    initMap();
	
	var directions = new CM.Directions(map, 'panel', CM_APIKEY);
	var waypoints = [points['Kyiv'], points['Lviv']];
	//directions.loadFromWaypoints(waypoints, {lang:"ru"});	
});