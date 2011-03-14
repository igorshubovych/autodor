// Init DB Projection
Proj4js.defs["EPSG:28406"] = "+proj=tmerc +lat_0=0 +lon_0=33 +k=1 +x_0=6500000 +y_0=0 +ellps=krass +units=m +no_defs";
var Autodor = {

    // Global Initialisation
    init: function (map) {

    },
    //translate
    translate: function (str) {
        return this.Translation.getTranslation(str);
    }
};

Autodor.Layers = {
    init: function() {
        
    }
}


Autodor.Weather = {

    //zIndex: 9000,
    map:        null,
    layer:      null,
    selectControl: null,

    feature:    null,
    popup:      null,

    initLayer: function() {

        var layer = new OpenLayers.Layer.Vector("Weather", {
            strategies: [new OpenLayers.Strategy.ZBBOX({resFactor: 1.1})],
            protocol: new OpenLayers.Protocol.HTTP({
                url: "/weather/",
                format: new OpenLayers.Format.DataJson()
            })
        });
        map.addLayer(layer);
        this.selectControl = new OpenLayers.Control.SelectFeature(layer);
        map.addControl(this.selectControl);
        this.selectControl.activate();
        layer.setVisibility(false);
        //layer.setZIndex(this.zIndex);
        //layer.refresh();
      /*  layer.events.on({
            'featureselected': this.onWeatherSelect,
            'featureunselected': this.onWeatherUnselect
        });*/

        this.layer = layer;
    },

    destroyLayer: function() {
        this.layer.destroy();
        this.layer = null;
    },

    init: function(map){
        if (this.map == null) {
            this.map = map;
            this.initLayer();
        }
    },

    toogle: function () {
        this.layer.setVisibility(this.layer.getVisibility());
    },

    onWeatherSelect: function(event) {

/*
        feature = event.feature;
        popup = new OpenLayers.Popup.FramedCloud("weatherPopup",
             feature.geometry.getBounds().getCenterLonLat(),
             new OpenLayers.Size(100,100),
             "<h2>"+feature.attributes.title + "</h2>" +
             feature.attributes.description,
             null, true, closeWeatherPopup);
        console.log(popup);
        popup.div.style.zIndex = this.zIndex+1;
        this.popup = popup;
        this.feature = feature;
        feature.popup = popup;
        popup.feature = feature;
        map.addPopup(popup);
*/
        /*feature = event.feature;
        console.log(feature.atPoint());
        console.log(event);
        var pos = this.map.getPixelFromLonLat();
        console.log(mpos);
        console.log(e);


        $("#jpopup .content").html("<h2>"+feature.attributes.title+"</h2>"+"<div class='description'>"+feature.attributes.description +"</div>");
        $("#jpopup").css( {top:pos.y-15, left: pos.x+27} );
        $("#jpopup").show();*/


    },

    onWeatherUnselect: function(event) {

    },
    click: function(element) {
        if (this.layer == null) this.initLayer();
        this.layer.setVisibility(element.checked);
    }

};

Autodor.ObjectList = {

    map:        null,
    layers:     {},

    features:   null,
    popups:     null,

    initLayers: function() {

        var filename = "/object/list";
        var json_data;

        eval("json_data = " + $.ajax({
            url: filename,
            async: false
        }).responseText );


        //$('<ul></ul>').appendTo('#object_list');

        for( var key in json_data.list ){
            var object_one = json_data.list[key];
            var id = object_one.sysname;
            if (object_one.getter != 'zbbox') {
                continue;
            }
            $('<li><img src="'+object_one.legend.src+'"/><input type="checkbox" name="'+id+'" id="'+id+'" value="'+key+'" /><label for="'+id+'">'+object_one.name+'</label></li>').appendTo('#object_list ul');

            object_list[key] = object_one;

            var layer = new OpenLayers.Layer.Vector(id, {
                strategies: [new OpenLayers.Strategy.ZBBOX({resFactor: 1.1})],
                protocol: new OpenLayers.Protocol.HTTP({
                    url: object_one.filename,
                    format: new OpenLayers.Format.DataJson({
                        //externalProjection: epsg900913,
                        //internalProjection: map.displayProjection,
                        extractStyles: false,
                        defaultStyle: {
                            'externalGraphic': object_one.legend.src,
                            'graphicWidth': 20,
                            'graphicHeight': 20,
                            'graphicXOffset': -10,
                            'graphicYOffset': -10
                        }

                    })
                }) ,
                projection: "EPSG:28406"
            });
            this.map.addLayer(layer);
            var selectControl = new OpenLayers.Control.SelectFeature(layer);
            this.map.addControl(selectControl);
            selectControl.activate();
            layer.setVisibility(false);

            this.layers[id] = layer;
            $("#"+id).change(function () {
                Autodor.ObjectList.click(this.id, ($(this).attr("checked"))?true:false);
            });
        }
    },

    init: function(map){
        if (this.map == null) {
            this.map = map;
            this.initLayers();
        }
    },

    toogle: function (id) {
        this.layers[id].setVisibility(!this.layers[id].getVisibility());
    },

    click: function(id,visibility) {
        this.layers[id].setVisibility(visibility);
    }

};

Autodor.Translation = {
    // arrays with texts
    original: null,
    translated: null,

    init: function(obj) {
        this.original = obj.original;
        this.translated = obj.translated;
    },
    getTranslation: function(str) {
        for (var i = 0, l = this.original.length; i < l; i++) {
            if (this.original[i] == str) {
                return this.translated[i];
            }
        }
        return str;
    }
}

Autodor.RoutingForm = {

    optionsMethodSelector: '#options input[name="method"]',
    routingModificator: function () {
        console.log($(this.optionsMethodSelector));
        var field = $(this.optionsMethodSelector);
        for (var i=0; i < field.length; i++) {
            if (field[i].checked) {
                return field[i].value;
            }
        }

        return false;
    }
}

Autodor.Routing = {

    map:null,
    locale: null,

    routeLayer: null,

    apiKey: 'BC9A493B41014CAABB98F0471D759707',
    routeInstructions: '#route_instructions_inner',

    init: function(map, locale) {
        this.locale = locale;
        var vectors = new OpenLayers.Layer.Vector("RoutingPath");
        this.routeLayer = vectors;
		map.addLayer(vectors);
        this.map = map;
    },


    getRoute: function(points) {
        this.clearRoute();
        var url = 'http://routes.cloudmade.com/'+this.apiKey+'/api/0.3/';
        var routingPoints = [];
        var transitPoints = [];
        var script = document.createElement('script');
        var pathPoint ='';
        script.type = 'text/javascript';
        for (var i = 0, l = points.length - 1; i<=l; i++) {
            var p = points[i].lonlat.clone().transform(epsg900913, epsg4326);

            pathPoint = p.lat + ',' + p.lon;
            routingPoints.push(pathPoint);
            if (i != 0 && i!=l) {
                transitPoints.push(pathPoint);
            }
        }
        url += routingPoints[0] 
                + ((routingPoints.length > 2)?(',[' + transitPoints.join(',') + '],'):',')
                + routingPoints[routingPoints.length -1];
        var modificator = Autodor.RoutingForm.routingModificator();
        if (modificator == 'shortest') {
            modificator = '/' + modificator;
        } else {
            modificator = '';
        }
        url += "/car" + modificator +".js?callback=Autodor.Routing.renderRoute";
        url += "&units=km&translation=common&lang="+ this.locale;
        console.log(url);
        script.src = url;
        document.getElementsByTagName('head')[0].appendChild(script);

    },

    renderRoute: function(response) {
        
        var points = [];
        console.log(response.route_geometry.length);
        for (var i = 0; i < response.route_geometry.length; i++) {
            var point = new OpenLayers.Geometry.Point(
                    response.route_geometry[i][1],
                    response.route_geometry[i][0]);
            points.push(point.transform(epsg4326, map.getProjectionObject()));
        }
        console.log('routing converted');
        var geometry = new OpenLayers.Geometry.LineString(points);
        var feature = new OpenLayers.Feature.Vector(geometry, null, {
            strokeColor: "#0033ff",
            strokeOpacity: 0.7,
            strokeWidth: 5
        });
        //this.routeLayer.removeAllFeatures();
        this.routeLayer.addFeatures(feature);

        var routing_data = '<ul>';
        for (var i = 0; i < response.route_instructions.length; i++) {
            routing_data += '<li>' + response.route_instructions[i][0] + ' ' + response.route_instructions[i][4] + '</li>';
        }
        routing_data +="<ul>";

        $(this.routeInstructions).html(routing_data);

    },

    clearRoute: function() {
        this.routeLayer.removeAllFeatures();
        $(this.routeInstructions).html('');

    }
}
