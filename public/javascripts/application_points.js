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
var geocoder = null;
var webcams = null;
var CM_APIKEY = 'BC9A493B41014CAABB98F0471D759707';

var currMarker = null, currPos = null;

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

		map.setCenter(new CM.LatLng(48.136767,31.003418), 6);
		
		map.addControl(new CM.LargeMapControl());
		map.addControl(new CM.ScaleControl());
		map.addControl(new CM.OverviewMapControl());
		map.addControl(new CompassCtl());
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
	CM.Event.addListener(map, 'moveend', function() {
		updateWeather();
	});
}

var createContextMenu = function() {
	// creating context-menu
	var menu1 = [
		{ 'moofoo': {
			onclick: function(menuItem, menu) {
				if (currPos != null && currMarker == null) {
					currMarker = createMarker(currPos.lat(), currPos.lng(), {'draggedEvent': updateMarkersUI, 'moveEvent': updateMarkersUI, 'addOverlay': true});
				} else 
				if (currPos != null && currMarker != null) {
					currMarker.setLatLng(currPos);
				}
				
				updateMarkersUI();
			},
			id: 'contextMenuItem0' 
		} }
	];

	$('#map').contextMenu(menu1, {
		theme: 'xp',
		beforeShow: function(x, y) {
			currPos = map.fromContainerPixelToLatLng(new CM.Point(x, y));
			
			if (currMarker == null)
				$("#contextMenuItem0").html($("#create_point_here").html()); else
					$("#contextMenuItem0").html($("#move_point_here").html());

			updateMarkersUI();
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
		ic.image = "http://tile.cloudmade.com/wml/latest/images/routing/route_icon_1.png";
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

	if (options['moveEvent'] != null) {
		CM.Event.addListener(M, 'move', options['moveEvent']);
	}
	
	if (options['addOverlay']) {
		map.addOverlay(M);
	}
	
	return M;
}

var updateMarkersUI = function() {
	// Update lat and lon fields here
	if (currMarker != null) {
		currPos = currMarker.getLatLng();

		$("#new_point #point_lat").val(currPos.lat());
		$("#new_point #point_lon").val(currPos.lng());
	} else {
		$("#new_point #point_lat, #new_point #point_lon").val("");

	}
}

function doMarkerMode() {
	if (currMarker == null) {
		currMarker = createMarker(0, 0, {'draggedEvent': updateMarkersUI, 'moveEvent': updateMarkersUI, 'addOverlay': true});

		map.disableDragging();
		map.disableScrollWheelZoom();
		map.disableDoubleClickZoom();
		map.disableShiftDragZoom();
		map.disableMouseZoom();
	} else {
		map.enableDragging();
		map.enableScrollWheelZoom();
		map.enableDoubleClickZoom();
		map.enableShiftDragZoom();
		map.enableMouseZoom();
	}
}

function doLeaveMarkerAlone() {
	if (currMarker != null) {
		map.enableDragging();
		map.enableScrollWheelZoom();
		map.enableDoubleClickZoom();
		map.enableShiftDragZoom();
		map.enableMouseZoom();

		updateMarkersUI();
	}
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
	layer['data'] = new CM.GeoXml('/point/' + layerName + '.kml', {local: true, defaultIcon: layer['icon']});
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
