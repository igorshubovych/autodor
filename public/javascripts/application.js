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

var markerIcons = {
	'start': createIcon('markers/start.png'),
	'end': createIcon('markers/end.png')
}

var keyPoints = [];

function createIcon(image) {
	if (image != null) {
		var icon = new CM.Icon();
	
		icon.image = image;
		//icon.iconSize = new CM.Size();
		//icon.iconAnchor = new CM.Point();
		
		return icon;
	}
	
	return null;
}

var initMap = function() {
	if (map == null || cloudmade == null) {
		cloudmade = new CM.Tiles.CloudMade.Web({key: CM_APIKEY});
		map = new CM.Map('map', cloudmade);
		map.setCenter(points['Kyiv'], 15);
		map.addControl(new CM.LargeMapControl());
		map.addControl(new CM.ScaleControl());
		map.addControl(new CM.OverviewMapControl());
	}
}

var mapToPoint = function(name, zoom) {
	initMap();
	map.setCenter(points[name], zoom);
}

function addMarker(icon, title) {
	initMap();
	
	var marker = new CM.Marker(map.getCenter(), {
		title: title,
		//icon: icon,
		draggable: true
	});
	
	map.addOverlay(marker);
	
	keyPoints.push(marker);
}

$(document).ready(function() {
	initMap();
	
	var M = new CM.Marker(map.getCenter(), {
		draggable: true
	});
	
	map.addOverlay(M);
	
	$("#map").mousemove(function movement(e) {
		$(".moo").text();
		M.setLatLng(map.fromDivPixelToLatLng(e.clientX, e.clientY));
	});
	
	//var directions = new CM.Directions(map, 'panel', CM_APIKEY);
	//var waypoints = [points['Kyiv'], points['Lviv']];	
});
