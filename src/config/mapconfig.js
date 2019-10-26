import TileLayer from "ol/layer/Tile"
import TileArcGISRest from 'ol/source/TileArcGISRest'
import OSM from 'ol/source/OSM'
import vectorTile from "ol/layer/VectorTile"
import vectorSource from "ol/source/VectorTile"
import format from "ol/format/GeoJSON"


let maptype = 0;

var streetmap = function(){
    var maplayer = null;
    switch(maptype){
        case 0 : 
            maplayer = new TileLayer({
                source : new OSM()
            })
            break;
        case 1 :
            maplayer = new TileLayer({
                source : new TileArcGISRest({
                    url : 'https://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer'
                })
            })
            break;
    }
    return [maplayer]
}

var mapconfig = {
    x : 114.065,
    y : 22.549,
    zoom : 3,
    streetmap : streetmap
};

export default mapconfig