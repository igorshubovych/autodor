/**
 * Created by JetBrains PhpStorm.
 * User: яя
 * Date: 18.01.11
 * Time: 3:18
 * To change this template use File | Settings | File Templates.
 */

/* текстируем добавление с помощью ajax'a объектов и событий*/

// Needed only for interaction, not for the display.
            function onPopupClose(evt) {
                console.log("onPopupClose");
                // 'this' is the popup.
                selectControl.unselect(this.feature);
            }
            function onFeatureSelect(evt) {
                console.log("onFeatureSelect");
                feature = evt.feature;
                popup = new OpenLayers.Popup.FramedCloud("featurePopup",
                                         feature.geometry.getBounds().getCenterLonLat(),
                                         new OpenLayers.Size(100,100),
                                         "<h2>"+feature.attributes.title + "</h2>" +
                                         feature.attributes.description,
                                         null, true, onPopupClose);
                feature.popup = popup;
                popup.feature = feature;
                map.addPopup(popup);
            }
            function onFeatureUnselect(evt) {
                console.log("onFeatureUnselect");
                feature = evt.feature;
                if (feature.popup) {
                    popup.feature = null;
                    map.removePopup(feature.popup);
                    feature.popup.destroy();
                    feature.popup = null;
                }
            }

function getBBoxZoomToStr(){
    var lefttop = new OpenLayers.LonLat(map.getExtent().left, map.getExtent().top).transform(epsg900913,epsg4326);
    var rightbottom = new OpenLayers.LonLat(map.getExtent().right, map.getExtent().bottom).transform(epsg900913,epsg4326);
    var zoom = map.getZoom();
    var q = "bbox="+lefttop.lon+","+lefttop.lat+","+rightbottom.lon+","+rightbottom.lat+"&zoom="+zoom;
    return q;
}

function addMarkers(object_one,$key){
    (function($){

        var filename =  object_one.filename;
        var regex = '\\?'; /* Нет, ну не маразм?! Почему блять не срабатывает \? */
        filename += '';//;( (filename.search(regex) === -1) ? "?" : "&" ) + getBBoxZoomToStr();

        var custom_data;

        eval("custom_data = " + $.ajax({
            url: filename,
            async: false
        }).responseText );

        console.log(object_one);
        markers[$key] = new OpenLayers.Layer.Markers("object_"+object_one.sysname);

        for( var key in custom_data.list ){
            var markerok = custom_data.list[key];
            add( markerok['lon'],markerok['lat'], markerok );
        }

        map.addLayer(markers[$key]);
        markers[$key].setZIndex(1500+$key);


        function add(lon, lat, markerok /* name, description*/) {
            var base_url = 'http://www.openlayers.org/dev/img/marker.png';
            var url = base_url;
            if ( object_one.image.src != undefined ){ url = object_one.image.src }
            var width = ( object_one.image.width !== undefined ) ? object_one.image.width : 32;
            var height = ( object_one.image.height !== undefined ) ? object_one.image.height : 32;

            var sz = new OpenLayers.Size(width, height);
            var calculateOffset = function(size) {
                                return new OpenLayers.Pixel(-(size.w/2), -size.h);
                             };
            var icon = new OpenLayers.Icon(url, sz, null, calculateOffset);
            marker = new OpenLayers.Marker(new OpenLayers.LonLat(lon, lat).transform(epsg4326, map.getProjectionObject()), icon);


            marker.events.register('mousedown', marker, function(evt) {


                (function($){
                    console.log(markerok);
                    $("#jpopup .content").html("<h2>"+markerok.name+"</h2>"+"<div class='description'>"+markerok.description +"</div>");
                    $("#jpopup").css( {top:evt.clientY-15, left: evt.clientX+27} );
                    $("#jpopup").show();
                })(jQuery)

                OpenLayers.Event.stop(evt);
            });

            markers[$key].addMarker(marker);

        }
    })(jQuery)
}

function getObjectsList(){
    (function($){
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
            if (object_one.getter == 'zbbox') {
                continue;
            }
            $('<li><img src="'+object_one.legend.src+'"/><input type="checkbox" name="'+id+'" id="'+id+'" value="'+key+'" /><label for="'+id+'">'+object_one.name+'</label></li>').appendTo('#object_list ul');

            object_list[key] = object_one;
            
            $("#"+id).change(function () {
                        if ($(this).attr("checked")) {                            
                            addMarkers(object_list[$("#"+this.id).val()],$("#"+this.id).val());

                        } else {
                            markers[$("#"+this.id).val()].clearMarkers();
                            markers[$("#"+this.id).val()].destroy();
                        }
                    });
        }
        
    })(jQuery)
}



function getSituationsList(){
    (function($){
        var filename = "/situation/list";
        var json_data;

        eval("json_data = " + $.ajax({
            url: filename,
            async: false
        }).responseText );


        //$('<ul></ul>').appendTo('#situation_list');

        for( var key in json_data.list ){
            var object_one = json_data.list[key];
            var id = object_one.sysname;
            $('<li><img src="'+object_one.legend.src+'"/><input type="checkbox" name="'+id+'" id="'+id+'" value="'+key+'" /><label for="'+id+'">'+object_one.name+'</label></li>').appendTo('#situation_list ul');

            situation_list[key] = object_one;

            $("#"+id).change(function () {
                        if ($(this).attr("checked")) {
                            addMarkers(situation_list[$("#"+this.id).val()],$("#"+this.id).val());

                        } else {
                            markers[$("#"+this.id).val()].clearMarkers();
                            markers[$("#"+this.id).val()].destroy();
                        }
                    });
        }

    })(jQuery)
}