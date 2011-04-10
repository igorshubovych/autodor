var IEmode = (navigator.appName.indexOf("Microsoft") > -1);

function moolog(msg) {
	if (IEmode) {
		return;
	} else {
		console.log(msg);
	}
}

window.onerror = function(e) {
	//alert(e);
	moolog(e);
}

var cloudmade = null, map = null;
var directions = null, geocoder = null;
var webcams = null;
var CM_APIKEY = 'BC9A493B41014CAABB98F0471D759707';

var points = {
	'Ukraine': new CM.LatLng(48.136767,31.003418),
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
	hotel: { data: null, shown: false,  icon: null },
	monument: { data: null, shown: false,  icon: null },
	weather: { data: null, shown: false, icon: null},
	roadCondition: { data: null, shown: false, icon: null}
};

var initMap = function() {
	var curr_lang = $('[curr_lang]').attr('curr_lang');
	
	if (map == null || cloudmade == null) {
		if (curr_lang != 'en') {
			cloudmade = new CM.Tiles.CloudMade.Web({key: CM_APIKEY});
		} else {
			cloudmade = new CM.Tiles.Base({
				tileUrlTemplate: 'http://tile.osmosnimki.ru/kosmo-en/#{zoom}/#{x}/#{y}.png',
				title: 'moofoo map',
				copyright: '&copy; 2010 Космоснимки.Ру'
			});
		}
		
		map = new CM.Map('map', cloudmade);

		var CompassCtl = function() {};
		
		CompassCtl.prototype = {
			initialize: function(map, pos) {
				var elt = document.createElement('img');
				
				elt.src = '/images/controls/compass.png';
				
				map.getContainer().appendChild(elt);
				
				return elt;
			},
			
			getDefaultPosition: function() {
				return new CM.ControlPosition(CM.BOTTOM_RIGHT, new CM.Size(0, 20));
			}
		}

		map.setCenter(points['Ukraine'], 6);
		
		map.addControl(new CM.LargeMapControl());
		map.addControl(new CM.ScaleControl());
		map.addControl(new CM.OverviewMapControl());
		map.addControl(new CompassCtl());
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

var initIcons = function() {
	var icon = new CM.Icon();
	icon.image  = "/images/objects/gas.gif";
	icon.iconSize = new CM.Size(24, 24);
	icon.iconAnchor = new CM.Point(16, 32);
	layers['gas']['icon'] = icon;
	
	icon = new CM.Icon(icon);
	icon.image  = "/images/objects/car_service.gif";
	layers['carService']['icon'] = icon;
	
	icon = new CM.Icon(icon);
	icon.image  = "/images/objects/incidents.gif";
	layers['roadCondition']['icon'] = icon;
	
	icon = new CM.Icon(icon);
	icon.image  = "/images/objects/monument.gif";
	layers['monument']['icon'] = icon;
	
	icon = new CM.Icon(icon);
	icon.image  = "/images/objects/hotel.gif";
	layers['hotel']['icon'] = icon;
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
		{ 'moofoo': {
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
				$("#contextMenuItem0").html($("#add_start_point").html()); else
			if (markers.length == 1)
				$("#contextMenuItem0").html($("#add_end_point").html()); else
					$("#contextMenuItem0").html($("#add_point").html());
		}
	} );
}

function updateSearchInputs() {
	$("#searchQuery, .searchQuery").autocomplete({
		minLength: 1,
		source: cities
	});

	$(".searchQuery").keyup(function(evt) {
		if (evt.keyCode == 13) {
			findAndPasteMarker(evt.srcElement || evt.target);
		}
	});
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
	
	// кастиль для IE =)
	if (ic.iconSize.x && ic.iconSize.y) {
		ic.iconSize.width = ic.iconSize.x;
		ic.iconSize.height = ic.iconSize.y;
	}

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
	
	$(".searchResults").empty();
	
	var keyPoints = [], m = 0;

	if (routeType == null)
		routeType = 'car';

	for (m = 0; m < markers.length; m++) {
		for (z = 0; z < markers.length; z++)
			if (m != z && markers[z].getLatLng().lat() == markers[m].getLatLng().lat() && markers[z].getLatLng().lng() == markers[m].getLatLng().lng())
				markers.splice(z, 1);
				
		keyPoints.push(markers[m].getLatLng());
	}
	
	var curr_lang = $('[curr_lang]').attr('curr_lang');

	try {
		directions.loadFromWaypoints(keyPoints, { travelMode: routeType, draggableWaypoints: true, lang: curr_lang });
	} catch (e) {
		alert(e);
	}

	for (m = 0; m < markers.length; m++) {
		if (map.containsOverlay(markers[m]))
			map.removeOverlay(markers[m]);
			
		markers[m] = directions.getMarker(m);
		CM.Event.addListener(markers[m], 'dragend', updateRoute);
	}
	
	updateMarkersUI();
}

var removeWaypoint = function(index) {
	if (index > -1 && index < markers.length && markers[index] != null) {
		markers.splice(index, 1);
	}

	//updateMarkersUI();
	updateRoute();
}

var initMarkerList = function() {
	$(".markerList").empty();
	$(".markerItem").remove();
	$("#printRoute, #clearRoute").hide();
	
	for (m = 0; m < 2; m++) {
		var elt = '<div class="markerItem">';
		elt += '<img src="http://tile.cloudmade.com/wml/latest/images/routing/route_icon_' + (m + 1) + '.png" />&nbsp';
		elt += '<input class="searchQuery" id="marker_' + m + '" type="text" size="18" />&nbsp;';
		elt += '<a href="#"><img src="/images/controls/remove_waypoint_hover.png" onClick="removeWaypoint(' + (m) + ');" /></a></div>';
		
		$(".markerList").append(elt);
	}
	
	updateSearchInputs();
}

var findAndPasteMarker = function(elt) {
	if (elt == null) {
		moolog('can not add location basing on empty elt');
		return;
	}
		
	var moo = new Function("data", "if (data == null || data.features == null || data.features[0] == null || data.features[0].centroid == null) { moolog('data not found'); return; } else { var m = createMarker(data.features[0].centroid.coordinates[0], data.features[0].centroid.coordinates[1], {'draggedEvent': updateRoute}); if (markers.length < 2) markers.push(m); else markers.splice(markers.length - 1, 0, m); updateRoute(); }");
		
	geocoder.getLocations(elt.value, moo,
	{ 
		'distance': 'closest',
		//'around': '', 
		'objectType': 'city,town',
		'results': '1'
	});
}

var clearRoute = function() {
	while (markers.length > 0) {
		removeWaypoint(0);
	}
		
	initMarkerList();
}

var updateMarkersUI = function() {
	if (markers.length < 2)
		return;
		
	$(".markerList").empty();
	$(".markerItem").remove();
	$("#printRoute, #clearRoute").hide();
	
	for (m = 0; m < markers.length; m++) {
		var pos = markers[m].getLatLng();
		//var k = (m == markers.length - 1) ?  m + 1 : m;
		var k = m;
		
		var elt = '<div class="markerItem">';
		elt += '<img src="http://tile.cloudmade.com/wml/latest/images/routing/route_icon_' + (k + 1) + '.png" />&nbsp';
		elt += '<input class="searchQuery" id="marker_' + k + '" type="text" size="18" />&nbsp;';
		elt += '<a href="#"><img src="/images/controls/remove_waypoint_hover.png" onClick="removeWaypoint(' + (k) + ');" /></a>';
		elt += '</div>';
		
		var moo = new Function("data", "if (data == null || data.features == null) $('#marker_" + k + "').val(jQuery.trim($('#title_unknown').html())); else $('#marker_" + k + "').val(jQuery.trim(data.features[0].properties.name));");
		
		geocoder.getLocations(new CM.LatLng(pos.lat(), pos.lng()), moo, 
		{ 
				'distance': 'closest', 
				//'objectType': 'road',
				'objectType': 'city,town',
				'results': '1'
		});

		$(".markerList").append(elt);
	}
	
	var elt = '<div class="markerItem">';
	elt += '<img src="http://tile.cloudmade.com/wml/latest/images/routing/route_icon_' + (markers.length + 1) + '.png" />&nbsp';
	elt += '<input class="searchQuery" id="marker_' + (markers.length) + '" type="text" size="18" />&nbsp;';
	//elt += '<a href="#"><img src="/images/controls/remove_waypoint_hover.png" onClick="if (markers[' + (markers.length - 2) + '] != null) { map.removeOverlay(markers[' + (markers.length - 2) + ']); markers[' + (markers.length - 2) + '] = null; } $(\'#marker_' + (markers.length - 1) + '\').val(null);" /></a></div>';
	elt += '<a href="#"><img src="/images/controls/remove_waypoint_hover.png" onClick="removeWaypoint(' + (markers.length) + ');" /></a></div>';
	
	$(".markerItem").last().before(elt);
	
	updateSearchInputs();

	if (markers.length > 1)
		$("#printRoute, #clearRoute").show();
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
	
	moolog('shown? ' + map.containsOverlay(weatherLayer));
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
	
	moolog(_url, 'weather layer is updated');
}

var loadObjects = function(layerName) {
	var layer = layers[layerName];
	layer['data'] = new CM.GeoXml('/points/query.kml?object_type=' + layerName, {local: true, defaultIcon: layer['icon']});
	CM.Event.addListener(layer['data'], 'load', function() {
		map.addOverlay(layers[layerName]['data']);
	});
}

var switchLayer = function(layerName) {
	layer = layers[layerName];
 	if (layerName == 'weather') {
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
	} else 	{
		if (layer['data'] == null) {
			loadObjects(layerName);
		} else if (layer['shown']) {
			map.removeOverlay(layer['data']);
		} else {
			map.addOverlay(layer['data']);
		}
		layer['shown'] = !layer['shown'];
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
				moolog('no valid response given');
				
				return;
			}
				
			for (var i = 0; i < response.features.length; i++) {
				var bbox = response.features[i].bounds;
				var name = response.features[i].properties.name;
				
				if (name == null)
					name = $("#title_unknown").html();
				
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
		
	$(".searchResults").show();
}

var printRoute = function() {
	if (markers.length < 2)
		return;
		
	var hwnd = window.open();
	var mapStr = "http://staticmaps.cloudmade.com/" + CM_APIKEY + "/staticmap?";
	var a = map.getCenter().lat(), b = map.getCenter().lng(), c = map.getZoom();
	
	var tmpPoints = [], tmpMarkers = [];
	
	for (i = 0; i < directions.getNumRoutes(); i++) {
		var route = directions.getRoute(i);
		
		for (t = 0; t < route.getNumSteps(); t++) {
			var step = route.getStep(t);
			
			tmpPoints.push(step.getLatLng().lat() + "," + step.getLatLng().lng());
		}
	}
	
	//for (i = 0; i < markers.length; i++) {
		//tmpMarkers.push("marker=size:mid|label=" + String.fromCharCode('A'.charCodeAt(0) + i) + "|" + markers[i].getLatLng().lat() + "," + markers[i].getLatLng().lng());
	//}
	
	//mapStr += "format=jpg&size=500x500&zoom=" + c + "&center=" + a + "," + b; // + "&path=" + tmpPoints.join('|');// + "&" + tmpMarkers.join('&') + "&" + "&zoom=" + c + "&format=jpg&size=500x500";*/
	
	mapStr += "center=" + [a, b].join(',') + "&zoom=" + c + "&format=jpg&size=500x500";
	
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
	initIcons();
	subscribeForEvents();
	createContextMenu();
	
	$("#map, .wml-container").addClass("rounded");
	$(".menu, #routingPanel, .lang, .lang ul, .lang ul li").addClass("gradiented");

	// cleaning choices
	// Loading Ukraine borders
	var ukraineBorders1 = new CM.GeoXml('/geo/borders.kml', {local: true});
	CM.Event.addListener(ukraineBorders1, 'load', function() {
		map.addOverlay(ukraineBorders1);
	});
});
