var conn = null, map = null;

$(document).ready(function() {
    conn = new CM.Tiles.CloudMade.Web({key: 'BC9A493B41014CAABB98F0471D759707'});
    map = new CM.Map('map', conn);
    map.setCenter(new CM.LatLng(51.514, -0.137), 15);
	map.addControl(new CM.LargeMapControl());
	map.addControl(new CM.ScaleControl());
	map.addControl(new CM.OverviewMapControl());
	
	var directions = new CM.Directions(map, 'panel', '8ee2a50541944fb9bcedded5165f09d9');
	var waypoints = [new CM.LatLng(50.433, 30.521), new CM.LatLng(49.775, 24.026, 15)];
	directions.loadFromWaypoints(waypoints, {lang:"ru"});
});

function centerMap(lat, lon, zoom) {
	if (map == null)
	{
		conn = new CM.Tiles.CloudMade.Web({key: 'BC9A493B41014CAABB98F0471D759707'});
		map = new CM.Map('map', conn);
	}

	map.setCenter(new CM.LatLng(lat, lon), zoom);
}
