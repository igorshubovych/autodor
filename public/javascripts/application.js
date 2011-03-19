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
	if (markers.length > 1) {
		var keyPoints = [];
		var m = null;
		
		for (m = 0; m < markers.length; m++) {
			keyPoints.push(markers[m].getLatLng());
		}
		
		if (directions == null) {
			directions = new CM.Directions(map, 'routingPanel', CM_APIKEY);
		}
		
		if (routeType == null)
			routeType = 'car';
			
		directions.loadFromWaypoints(keyPoints, { travelMode: routeType });
	}
}

function changeRouteType(type) {
	routeType = type;
	updateRoute();
}

function doMarkerMode() {
	if (currMarker == null) {
		currMarker = new CM.Marker(new CM.LatLng(0, 0), {
			draggable: true
		});
		
		CM.Event.addListener(currMarker, 'dragend', updateRoute);
		
		map.addOverlay(currMarker);
		
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

$(document).ready(function() {
	initMap();
	
	// subscribing 2 mouse events 4 marker handling
	$(".addMarker").click(function() {
		doMarkerMode();
		
		if (currMarker == null)
			$(this).text("Add point"); else
				$(this).text("Cancel adding point");
				
		return false;
	});
	
	$("#map").click(function() {
		doLeaveMarkerAlone();
		
		$(".addMarker").text("Add point");
		
		return false;
	});
	
	$("#map").mousemove(function(e) {
		var pos = map.fromContainerPixelToLatLng(new CM.Point(e.clientX - $(this).offset().left, e.clientY - $(this).offset().top));
				
		if (currMarker != null) {
			currMarker.setLatLng(pos);
		}
	});
	
	// creating context-menu
	var menu1 = [ 
		{'Add point': function(menuItem, menu) { 
			if (currPos != null) {
				var m = new CM.Marker(currPos, {
					draggable: true
				});
				
				CM.Event.addListener(m, 'dragend', updateRoute);
				
				map.addOverlay(m);
				
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
	
	// cleaning choices
	alert($("#routingTab > input[type=radio][checked]").removeAttr("checked");
	$("#routingTab > input[type=radio] :first").attr("checked", "checked");

	// jq-ui setup
	$("#tabs").tabs();
	$(".routeType").buttonset();
	$(".addMarker").button().text("Add point");
});
