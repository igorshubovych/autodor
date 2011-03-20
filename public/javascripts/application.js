window.onerror = function(e) {
	//alert(e);
	console.log(e);
}

var cloudmade = null, map = null, directions = null, geocoder = null;
var CM_APIKEY = 'BC9A493B41014CAABB98F0471D759707';

var points = {
	'Kyiv': new CM.LatLng(50.433, 30.521),
	'Lviv': new CM.LatLng(49.775, 24.026, 15),
	'Kharkiv stadium': new CM.LatLng(49.980, 36.261),
	'Donetsk stadium': new CM.LatLng(48.021, 37.810),
	'Kyiv stadium': new CM.LatLng(50.433, 30.521),
	'Lviv stadium': new CM.LatLng(49.775, 24.026)
}

var markers = [], currMarker = null, routeType = null, currPos = null;
var weatherMarkers = [], isWeatherDisplayed = false;

var initMap = function() {
	if (map == null || cloudmade == null) {
		cloudmade = new CM.Tiles.CloudMade.Web({key: CM_APIKEY});
		map = new CM.Map('map', cloudmade);

		map.setCenter(points['Kyiv'], 15);
		map.addControl(new CM.LargeMapControl());
		map.addControl(new CM.ScaleControl());
		map.addControl(new CM.OverviewMapControl());
	}

	if (directions == null) {
		directions = new CM.Directions(map, 'routingPanel', CM_APIKEY);
	}

	if (geocoder == null) {
		geocoder = new CM.Geocoder(CM_APIKEY);
	}
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

	CM.Event.addListener(map, 'moveend', function() {
		updateWeather();
	});
}

var createContextMenu = function() {
	// creating context-menu
	var menu1 = [
		{'Додати чортзнаяку точку': {
			onclick: function(menuItem, menu) {
				if (currPos != null) {
					var m = createMarker(currPos.lat(), currPos.lng(), {'draggedEvent': updateRoute, 'addOverlay': true});

					if (markers.length < 2)
						markers.push(m); else
							markers.splice(markers.length - 1, 0, m);
							
					map.removeOverlay(m);

					updateMarkersUI();
					updateRoute();
				}
			},
			id: 'contextMenuItem0' 
		} }
	];

	$('#map').contextMenu(menu1, {
		theme: 'xp',
		beforeShow: function(x, y) {
			currPos = map.fromContainerPixelToLatLng(new CM.Point(x, y));
			
			if (markers.length < 1)
				$("#contextMenuItem0").html("Додати точку відправки"); else
			if (markers.length == 1)
				$("#contextMenuItem0").html("Додати кінцеву точку"); else
					$("#contextMenuItem0").html("Додати проміжну точку");
		}
	} );
}

function createMarker(lat, lon, options) {
	var ic = new CM.Icon();

	if (options['icon'] == null)
		ic.image = "http://tile.cloudmade.com/wml/latest/images/routing/route_icon_" + (markers.length + 1) + ".png"; else
			ic.image = options['icon'];

	if (options['iconSize'] == null)
		ic.iconSize = new CM.Point(23, 26); else
			ic.iconSize = options['iconSize'];

	if (options['iconAnchor'] == null)
		ic.iconAnchor = new CM.Point(10, 26); else
			ic.iconAnchor = options['iconAnchor'];

	var draggable = true;

	if (options['draggable'] != null)
		draggable = options['draggable'];

	var M = new CM.Marker(new CM.LatLng(lat, lon), {
		draggable: draggable,
		icon: ic
	});

	if (options['draggedEvent'] != null)
		CM.Event.addListener(M, 'dragend', options['draggedEvent']);

	if (options['addOverlay'])
		map.addOverlay(M);

	return M;
}

var updateRoute = function () {
	initMap();

	var keyPoints = [], m = 0;

	if (routeType == null)
		routeType = 'car';

	for (m = 0; m < markers.length; m++) {
		keyPoints.push(markers[m].getLatLng());
	}

	try {
		directions.loadFromWaypoints(keyPoints, { travelMode: routeType, draggableWaypoints: true });
	} catch (e) {
		alert(e);
	}

	for (m = 0; m < markers.length; m++) {
		markers[m] = directions.getMarker(m);
	}
}

var removeWaypoint = function(index) {
	if (index > -1 && index < markers.length && markers[index] != null) {
		markers.splice(index, 1);
	}

	updateMarkersUI();
	updateRoute();
}

var updateMarkersUI = function() {
	var m = 0;

	$(".markerList").empty();
	$(".markerItem").remove();

	for (m = 0; m < markers.length; m++) {
		var pos = markers[m].getLatLng();
		var s = pos.lat() + " ; " + pos.lng();

		var elt = '<div class="markerItem">';
		elt += '<img src="http://tile.cloudmade.com/wml/latest/images/routing/route_icon_' + (m + 1) + '.png" />&nbsp';
		elt += '<input type="text" size="18" value="' + s + '" />&nbsp;';
		elt += '<a href="#"><img src="/images/controls/remove_waypoint_hover.png" onClick="removeWaypoint(' + (m) + ');" /></a></div>';

		$(".markerList").append(elt);
	}
}

function changeRouteType(type) {
	routeType = type;
	updateRoute();
}

function doMarkerMode() {
	if (currMarker == null) {
		currMarker = createMarker(0, 0, {'draggedEvent': updateRoute, 'addOverlay': true});

		map.disableDragging();
		map.disableScrollWheelZoom();
		map.disableDoubleClickZoom();
		map.disableShiftDragZoom();
		map.disableMouseZoom();
	} else {
		if (map.containsOverlay(currMarker) == true)
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
	
		if (map.containsOverlay(currMarker))
			map.removeOverlay(currMarker);

		currMarker = null;

		$("label[for='addWaypoint']").removeClass("ui-state-active");

		updateMarkersUI();
		updateRoute();
	}
}

var mapToPoint = function(name, zoom) {
	initMap();

	map.setCenter(points[name], zoom);
}

var toggleWeather = function() {
	if (isWeatherDisplayed == false) {
		updateWeather();
		isWeatherDisplayed = true;
	} else {
		clearWeather();
		isWeatherDisplayed = false;
	}
	
	console.log('shown? ' + isWeatherDisplayed);
}

var clearWeather = function() {
	var i = 0;

	for (i = 0; i < weatherMarkers.length; i++) {
		if (map.containsOverlay(weatherMarkers[i]) == true) {
		//if (true) {
			map.removeOverlay(weatherMarkers[i]);
		}
	}

	weatherMarkers = [];
	console.log('clear.');
}

var drawWeather = function() {
	var i = 0;

	for (i = 0; i < weatherMarkers.length; i++) {
		if (map.containsOverlay(weatherMarkers[i]) == false)
			map.addOverlay(weatherMarkers[i]);
	}
	
	console.log('drawn.');
}

var updateWeather = function() {
	initMap();
	
	clearWeather();
	
	var bounds = map.getBounds();

	var _url = '/home/weather/?x1=' + bounds.getSouthWest().lat() + '&y1=' + bounds.getSouthWest().lng() + '&x2=' + bounds.getNorthEast().lat() + '&y2=' + bounds.getNorthEast().lng() + '&zoom=' + map.getZoom();
	
	console.log(_url);

	$.ajax({
		url: _url,
		success: function(data, moo) {
			var i = 0;

			for (i = 0; i < data.length; i++) {
				m = data[i];

				var M = createMarker(m['x'], m['y'], {
					'draggable': false,
					'icon': "http://www.meteoprog.ua/pictures/markers/" + m['link'],
					'iconAnchor': new CM.Point(0, 0),
					'addOverlay': false
				});

				if (map.containsOverlay(M) == false && $.inArray(M, weatherMarkers) == -1)
					weatherMarkers.push(M);
			}
		},
		dataType: 'json',
		error: function(a,b,c) {
			console.log('error: ', [a, b, c].join('::'));
		}
	});
	
	if (isWeatherDisplayed == true)
		drawWeather();
	
	console.log('up-2-date.');
}

var loadPoints = function() {
	var url =
		'http://localhost:3000/poi/car_service.kml';
	var geoxml = new CM.GeoXml(url, {local: true});


	CM.Event.addListener(geoxml, 'load', function() {
		map.zoomToBounds(geoxml.getDefaultBounds());
		map.addOverlay(geoxml);
	});
}

$(document).ready(function() {
	initMap();

	subscribeForEvents();
	createContextMenu();

	// cleaning choices
	$(".routeType input[type=radio][checked]").removeAttr("checked");
	$(".routeType input[type=radio]:first").attr("checked", "checked");
	$("#weatherControl").removeAttr("checked");

	//loadPoints();
});
