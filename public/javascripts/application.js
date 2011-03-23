window.onerror = function(e) {
	//alert(e);
	console.log(e);
}

var cloudmade = null, map = null;
var directions = null, geocoder = null;
var webcams = null;
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

var layers = {
	gas: { data: null, shown: false, icon: null },
	carService: { data: null, shown: false, icon: null },
	webCams: { data: null, shown: false, icon: null },
	hotels: { data: null, shown: false,  icon: null },
	weather: { data: null, shown: false, icon: null}
};

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
	
	if (webcams == null) {
		webcamstravel.easymap.load(map, function(instance, params) {
			webcams = instance;
		}, { showwebcams: false });
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

	if (options['icon'] == null) {
		ic.image = "http://tile.cloudmade.com/wml/latest/images/routing/route_icon_" + (markers.length + 1) + ".png";
	} else {
		ic.image = options['icon'];
	}
	
	if (options['iconSize'] == null) {
		ic.iconSize = new CM.Point(23, 26);
	} else {
		ic.iconSize = options['iconSize'];
	}
	
	if (options['iconAnchor'] == null) {
		ic.iconAnchor = new CM.Point(10, 26);
	} else {
		ic.iconAnchor = options['iconAnchor'];
	}
	
	var draggable = true;

	if (options['draggable'] != null) {
		if (options['draggable'] == 'false' || options['draggable'] == false) {
			draggable = false;
		}
	}
	
	var M = new CM.Marker(new CM.LatLng(lat, lon), {
		draggable: draggable,
		icon: ic
	});
	
	if (options['draggedEvent'] != null) {
		CM.Event.addListener(M, 'dragend', options['draggedEvent']);
	}
	
	if (options['addOverlay']) {
		map.addOverlay(M);
	}
	
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
	
	if (markers.length > 1)
		$("#printRoute").show();
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
	if (map.containsOverlay(weatherLayer) == true) {
		isWeatherShown = false;
		
		map.removeOverlay(weatherLayer);
	} else {
		isWeatherShown = true;
		
		updateWeather();
	}
	
	console.log('shown? ' + map.containsOverlay(weatherLayer));
}

var updateWeather = function() {
	initMap();
	
	var weather = layers['weather'];
	
	if (weather['shown'] == false)
		return;
	
	if (weather['shown'] && map.containsOverlay(weather['data']) == true)
		map.removeOverlay(weather['data']);
	
	var bounds = map.getBounds();

	var _url = '/home/weather/?x1=' + bounds.getSouthWest().lat() + '&y1=' + bounds.getSouthWest().lng() + '&x2=' + bounds.getNorthEast().lat() + '&y2=' + bounds.getNorthEast().lng() + '&zoom=' + map.getZoom();
	
	weather['data'] = new CM.GeoXml(_url, { 'local': true });
	
	if (weather['shown'])
		map.addOverlay(weather['data']);
		
	layers['weather'] = weather;
	
	console.log(_url, 'weather layer is updated');
}

var loadObjects = function(layerName) {
	layers[layerName]['data'] = new CM.GeoXml('/poi/' + layerName + '.kml', {local: true});

	CM.Event.addListener(layers[layerName]['data'], 'load', function() {
		map.addOverlay(layers[layerName]['data']);
	});
}

var switchLayer = function(layerName) {
	layer = layers[layerName];

	if (layerName == 'gas' || layerName == 'carService') {
		if (layer['data'] == null) {
			loadObjects(layerName);
		} else if (layer['shown']) {
			map.removeOverlay(layer['data']);
		} else {
			map.addOverlay(layer['data']);
		}
		layer['shown'] = !layer['shown'];
	} else if (layerName == 'weather') {
		if (map.containsOverlay(layer['data']) == true) {
			layer['shown'] = false;

			map.removeOverlay(layer['data']);
		} else {
			layer['shown'] = true;

			updateWeather();
		}
	} else if (layerName == 'webCams') {
		if (layer['shown'] == true) {
			layer['shown'] = false;

			webcams.hideWebcams();
		} else {
			layer['shown'] = true;

			webcams.showWebcams();
		}
	}
}

var pointMapToBound = function(a, b, c, d) {
	map.zoomToBounds(new CM.LatLngBounds(new CM.LatLng(a, b), new CM.LatLng(c, d)));
}

var geoSearch = function() {
	initMap();
	
	$(".searchResults").empty();
	
	geocoder.getLocations($("#searchQuery").val() + ",Ukraine", function(response) {
			if (response == null || response.features == null) {
				console.log('no valid response given');
				
				return;
			}
				
			for (var i = 0; i < response.features.length; i++) {
				var bbox = response.features[i].bounds;
				var name = response.features[i].properties.name;
				
				if (name == null)
					name = "назва невідома";
				
				var a = bbox[0][0];
				var b = bbox[0][1];
				var c = bbox[1][0]
				var d = bbox[1][1];
				
				var elt = "<div class='searchResultItem' onclick='pointMapToBound(" + a + "," + b + "," + c + "," + d + ", 10);'>";
				elt += "<a href='#' onclick='return false;'>" + name + "</a>";
				elt += "</div>";
				
				$(".searchResults").append(elt);
			}
		}, {
			boundsOnly: true, 
			bounds: new CM.LatLngBounds(new CM.LatLng(52.375359, 40.218079), new CM.LatLng(44.390411, 22.128811)), 
			resultsNumber: 10 
		});
}

var printRoute = function() {
	var hwnd = window.open();
	var mapStr = "http://staticmaps.cloudmade.com/" + CM_APIKEY + "/staticmap?";
	var a = map.getCenter().lat(), b = map.getCenter().lng(), c = map.getZoom();
	
	mapStr += "center=" + a + "," + b + "&zoom=" + c + "&format=jpg&size=500x500";
	
	self.focus();
	hwnd.document.open();
	hwnd.document.write($("#routingPanel").html());
	hwnd.document.write("<br /><img src='" + mapStr + "' />");
	hwnd.document.close();
	hwnd.print();
	hwnd.close();
}

$(document).ready(function() {
	initMap();

	subscribeForEvents();
	createContextMenu();

	// cleaning choices
	$(":radio[checked], :checkbox[checked]").removeAttr("checked");
	$(".routeType input[type=radio]:first").attr("checked", "checked");
});
