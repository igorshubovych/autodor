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

var markers = [], currMarker = null, directions = null, routeType = null, currPos = null;

function updateRoute() {
	initMap();
	
	if (markers.length > 1) {
		var keyPoints = [];
		var m = null;

		for (m = 0; m < markers.length; m++) {
			keyPoints.push(markers[m].getLatLng());
			map.removeOverlay(markers[m]);
		}

		if (directions == null) {
			directions = new CM.Directions(map, 'routingPanel', CM_APIKEY);
		}

		if (routeType == null)
			routeType = 'car';

		directions.loadFromWaypoints(keyPoints, { travelMode: routeType, draggableWaypoints: true });
		
		for (m = 0; m < markers.length; m++) {
			markers[m] = directions.getMarker(m);
		}
	}
}

function changeRouteType(type) {
	routeType = type;
	updateRoute();
}

function createMarker(lat, lon, draggedEvent) {
	var ic = new CM.Icon();
		
	ic.image = 'http://tile.cloudmade.com/wml/latest/images/routing/route_icon_' + (markers.length + 1) + ".png";
	ic.iconSize = new CM.Point(23, 26);
	ic.iconAnchor = new CM.Point(10, 26);
	
	var M = new CM.Marker(new CM.LatLng(lat, lon), {
		draggable: true,
		icon: ic
	});

	if (draggedEvent != null)
		CM.Event.addListener(M, 'dragend', draggedEvent);

	map.addOverlay(M);
	
	return M;
}

function doMarkerMode() {
	if (currMarker == null) {
		currMarker = createMarker(0, 0, updateRoute);

		map.disableDragging();
		map.disableScrollWheelZoom();
		map.disableDoubleClickZoom();
		map.disableShiftDragZoom();
		map.disableMouseZoom();
	} else {
		map.removeOverlay(currMarker);

		map.enableDragging();
		map.enableScrollWheelZoom();
		map.enableDoubleClickZoom();
		map.enableShiftDragZoom();
		map.enableMouseZoom();

		currMarker = null;
	}
}

function doLeaveMarkerAlone() {
	if (currMarker != null) {
		map.enableDragging();
		map.enableScrollWheelZoom();
		map.enableDoubleClickZoom();
		map.enableShiftDragZoom();
		map.enableMouseZoom();
		markers.push(currMarker);
		currMarker = null;

		$("label[for='addWaypoint']").toggleClass("ui-state-active");

		updateRoute();
	}
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

var subscribeForEvents = function() {
	// subscribing 2 mouse events 4 marker handling
	$("#addWaypoint").click(function() {
		doMarkerMode();

		return false;
	});

	$("#map").click(function() {
		doLeaveMarkerAlone();

		return false;
	});

	$("#map").mousemove(function(e) {
		var pos = map.fromContainerPixelToLatLng(new CM.Point(e.clientX - $(this).offset().left, e.clientY - $(this).offset().top));

		if (currMarker != null) {
			currMarker.setLatLng(pos);
		}
	});
}

var createContextMenu = function() {
	// creating context-menu
	var menu1 = [
		{'Add point': function(menuItem, menu) {
			if (currPos != null) {
				var m = createMarker(currPos.lat(), currPos.lng(), updateRoute);

				markers.push(m);

				updateRoute();
			}
		} }
	];

	$('#map').contextMenu(menu1, {
		theme: 'xp',
		beforeShow: function(x, y) {
			currPos = map.fromContainerPixelToLatLng(new CM.Point(x, y));
		}
	} );
}

$(document).ready(function() {
	initMap();

	subscribeForEvents();
	createContextMenu();

	// cleaning choices
	$(".routeType input[type=radio][checked]").removeAttr("checked");
	$(".routeType input[type=radio]:first").attr("checked", "checked");
});
