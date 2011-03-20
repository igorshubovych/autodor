var parseJSON = function(s) {
	var res = "";
	
	return JSON.parse(s, function(k, v) {
		
	});
}

CM.Map.prototype.containsOverlay = function(overlay) {
	var i = 0;
	
	if (this._overlays == null)
		return false;
		
	for (i = 0; i < this._overlays.length; i++) {
		if (this._overlays[i] == overlay)
			return true;
	}
	
	return false;
}

CM.LatLngBounds.prototype.toString = function() {
	var a = this.getNorthEast(), b = this.getSouthWest();
	
	return [a.lat(), a.lng(), b.lat(), b.lng()].join(',');
}
