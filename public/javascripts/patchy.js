var parseJSON = function(s) {
	var res = "";
	
	return JSON.parse(s, function(k, v) {
		
	});
}

CM.Geocoder.prototype.retrieve = function(query, successHandler, errorHandler) {
	var url = "http://geocoding.cloudmade.com/" + this.key + "/geocoding/v2/find.js?";
	
	if (query instanceof Array) {
		url += query.join('&');
	} else
	if (typeof query == 'string') {
		url += query;
	} else {
		var arr = [];
		
		for (k in query) {
			arr.push(k + '=' + query[k]);
		}
		
		url += arr.join('&');
	}
	
	/*$.ajax({
		url: url, 
		//dataType: 'json',
		success: successHandler,
		error: errorHandler
	});*/
}

CM.LatLngBounds.prototype.toString = function() {
	var a = this.getNorthEast(), b = this.getSouthWest();
	
	return [a.lat(), a.lng(), b.lat(), b.lng()].join(',');
}
