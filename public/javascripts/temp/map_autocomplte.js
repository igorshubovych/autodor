(function($) {
    $(function() {
        var filename = "/in/cities.json";
        var autocomplite_key= "#route_via .waypoint input";

        var json_data;

        eval("json_data = " + $.ajax({
            url: filename,
            async: false
        }).responseText );


		$( autocomplite_key ).autocomplete({
			minLength: 1,
			source: json_data,
			focus: function( event, ui ) {
				$( event.target ).val( ui.item.value );
				return false;
			},
			select: function( event, ui ) {
				$( event.target ).val( ui.item.value );
				/* тупо перемещение*/
				/*map.setCenter(new OpenLayers.LonLat(ui.item.lon, ui.item.lat), 6);/****/
				map.panTo(new OpenLayers.LonLat(ui.item.lon, ui.item.lat).transform(epsg4326, map.getProjectionObject()));
				return false;
			}
		})
		.data( "autocomplete" )._renderItem = function( ul, item ) {
			return $( "<li></li>" )
				.data( "item.autocomplete", item )
				.append( "<a>" + item.label + /*"<br>" + item.desc +*/ "</a>" )
				.appendTo( ul );
		};

    }) /*end on load*/

})(jQuery)
