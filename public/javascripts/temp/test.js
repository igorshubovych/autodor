/**
 * Created by kuzyakiev (oleg.kudrenko@gmail.com)
 * Date of file create : 03.03.11 17:21
 */
function addCity(city){
    var name;
    var lonlat;
    switch( city.toLowerCase() ){
        case "kiev":
            name = "Спорткомплекс Олимпийский, ул. Саксаганского, 1, Киев";
            lonlat = new OpenLayers.LonLat(30.520662,50.435493).transform(epsg4326, map.getProjectionObject());
            break;
        case "kharkiv":
            name = "ОСК Металлист, ул. Плехановской, 65, Харьков";
            lonlat = new OpenLayers.LonLat(36.261666676667,49.980833343333).transform(epsg4326, map.getProjectionObject());
            break;
        case "donetsk":
            name = "Донбасс Арена, ул. Челюскинцев, 189е, Донецк";
            lonlat = new OpenLayers.LonLat(37.806064,48.021604).transform(epsg4326, map.getProjectionObject());
            break;
        case "lviv":
            name = "Арена-Львов, ул. Стрыйская, Львов";
            lonlat = new OpenLayers.LonLat(24.014184,49.780254).transform(epsg4326, map.getProjectionObject());
            break;
    }

    var key = -1;
    for (var wpKey in MyFirstRoute.Waypoints){
        console.log(typeof(MyFirstRoute.Waypoints[wpKey].lonlat));
        if (typeof(MyFirstRoute.Waypoints[wpKey].lonlat) == "undefined" && key == -1){
            key = wpKey;
        }
    }
    console.log("key is:"+key);
    if (key == -1 || key==wpKey){
        waypointAdd();
    }

    var wp = MyFirstRoute.Waypoints[key];
    var id = wp.position;
    MyFirstRoute.updateWaypoint(id, lonlat, name);
    $("li.waypoint[waypointnr='" + wp.position + "'] input[name='via_text']").attr("value", name);
    map.updateSize();
        

}