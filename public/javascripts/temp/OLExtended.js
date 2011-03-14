// Whatever Json format
OpenLayers.Format.DataJson = OpenLayers.Class(OpenLayers.Format.Text, {

    /**
     * APIMethod: read
     * Data in Json
     *
     * Parameters:
     * data - {String}
     *
     * Returns:
     * An Array of <OpenLayers.Feature.Vector>s
     */
    read: function(text) {
       // var lines = text.split('\n');
        var dataArray = eval('(' + text + ')');
        var columns;
        var features = [];
        // length - 1 to allow for trailing new line

        for (var i = 0, l = dataArray.length; i < l; i++) {

            var dataObj = dataArray[i];

            var geometry = new OpenLayers.Geometry.Point(0,0);
            var attributes = {};
            var style = this.defaultStyle ?
                OpenLayers.Util.applyDefaults({}, this.defaultStyle) :
                null;
            var icon, iconSize, iconOffset, overflow;
            var set = false;

            if (dataObj.point != undefined) {
                var coords = dataObj.point;
                geometry.y = parseFloat(coords[0]);
                geometry.x = parseFloat(coords[1]);
                set = true;
            }

            if (dataObj.lon != undefined) {
                geometry.x = parseFloat(dataObj.lon);
                set = true;
            }

            if (dataObj.lat != undefined) {
                geometry.y = parseFloat(dataObj.lat);
                set = true;
            }

            if (dataObj.attributes != undefined) {
                attributes = dataObj.attributes;
                // title
                // description
                // overflow
                // extra_something
            }


            if (dataObj.style != undefined) {
                style = dataObj.style;
                // externalGraphic
                // graphicWidth
                // graphicHeight
                // graphicXOffset
                // graphicYOffset
            }


            if (set) {
              if (this.internalProjection && this.externalProjection) {
                  geometry.transform(this.externalProjection,
                                     this.internalProjection);
              }
              console.log('old ' + geometry);
              //console.log(geometry.clone().transform(WGS84, epsg900913));
              console.log('new ' + geometry.clone().transform(new OpenLayers.Projection("EPSG:28406"), WGS84));

              var feature = new OpenLayers.Feature.Vector(geometry, attributes, style);
              features.push(feature);
            }
        }

        return features;
    },

    CLASS_NAME: "OpenLayers.Format.DataJson"
});

// Custom Strategy to get extended BBOX working
OpenLayers.Strategy.ZBBOX = OpenLayers.Class(OpenLayers.Strategy.BBOX, {

        /**
     * Method: calculateBounds
     *
     * Parameters:
     * mapBounds - {<OpenLayers.Bounds>} the current map extent, will be
     *      retrieved from the map object if not provided
     */
    calculateBounds: function(mapBounds) {
        if(!mapBounds) {
            mapBounds = this.getMapBounds();
        }
        var center = mapBounds.getCenterLonLat();
        var dataWidth = mapBounds.getWidth() * this.ratio;
        var dataHeight = mapBounds.getHeight() * this.ratio;
        this.bounds = new OpenLayers.ZBounds(
            center.lon - (dataWidth / 2),
            center.lat - (dataHeight / 2),
            center.lon + (dataWidth / 2),
            center.lat + (dataHeight / 2),
            this.layer.map.getZoom()
        );
    },

    CLASS_NAME: "OpenLayers.Format.ZBBOX"
});


// Extended Bound which acts for ZBBOX
OpenLayers.ZBounds =  OpenLayers.Class(OpenLayers.Bounds, {

    zoom: null,

    /**
     * Constructor: OpenLayers.Bounds
     * Construct a new bounds object.
     *
     * Parameters:
     * left - {Number} The left bounds of the box.  Note that for width
     *        calculations, this is assumed to be less than the right value.
     * bottom - {Number} The bottom bounds of the box.  Note that for height
     *          calculations, this is assumed to be more than the top value.
     * right - {Number} The right bounds.
     * top - {Number} The top bounds.
     */
    initialize: function(left, bottom, right, top, zoom) {
        if (left != null) {
            this.left = OpenLayers.Util.toFloat(left);
        }
        if (bottom != null) {
            this.bottom = OpenLayers.Util.toFloat(bottom);
        }
        if (right != null) {
            this.right = OpenLayers.Util.toFloat(right);
        }
        if (top != null) {
            this.top = OpenLayers.Util.toFloat(top);
        }
        if (zoom != null) {
            this.zoom = zoom;
        }
    },

    /**
     * Method: clone
     * Create a cloned instance of this bounds.
     *
     * Returns:
     * {<OpenLayers.Bounds>} A fresh copy of the bounds
     */
    clone:function() {
        return new OpenLayers.ZBounds(this.left, this.bottom,
                                     this.right, this.top, this.zoom);
    },

    /**
     * Method: equals
     * Test a two bounds for equivalence.
     *
     * Parameters:
     * bounds - {<OpenLayers.Bounds>}
     *
     * Returns:
     * {Boolean} The passed-in bounds object has the same left,
     *           right, top, bottom components as this.  Note that if bounds
     *           passed in is null, returns false.
     */
    equals:function(bounds) {
        var equals = false;
        if (bounds != null) {
            equals = ((this.left == bounds.left) &&
                      (this.right == bounds.right) &&
                      (this.top == bounds.top) &&
                      (this.bottom == bounds.bottom) &&
                      (this.zoom == bounds.zoom));
        }
        return equals;
    },

    /**
     * APIMethod: toString
     *
     * Returns:
     * {String} String representation of bounds object.
     *          (ex.<i>"left-bottom=(5,42) right-top=(10,45)"</i>)
     */
    toString:function() {
        return ( "left-bottom=(" + this.left + "," + this.bottom + ")"
                 + " right-top=(" + this.right + "," + this.top + ")" + " Zoom:" + this.zoom );
    },

    /**
     * APIMethod: toArray
     *
     * Parameters:
     * reverseAxisOrder - {Boolean} Should we reverse the axis order?
     *
     * Returns:
     * {Array} array of left, bottom, right, top
     */
    toArray: function(reverseAxisOrder) {
        if (reverseAxisOrder === true) {
            return [this.bottom, this.left, this.top, this.right, this.zoom];
        } else {
            return [this.left, this.bottom, this.right, this.top, this.zoom];
        }
    },

    CLASS_NAME: "OpenLayers.ZBounds"
});
