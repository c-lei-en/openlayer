import TileLayer from "ol/layer/Tile"
import XYZ from 'ol/source/XYZ'
import GeoJSON from 'ol/format/GeoJSON'
import VectorTile from "ol/layer/VectorTile"
import vectorSource from "ol/source/VectorTile"
import { Icon, Style, Text } from 'ol/style'

//基础地图
var maplayer = new TileLayer({
    source: new XYZ({
        url: 'http://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}'
    })
})

//道观加载

var vectorsource = new vectorSource({
    projection: 'EPSG:4326',
    format: new GeoJSON(),
    tileUrlFunction: function (tileCoord) {
        return 'http://localhost:8519/geoserver/gwc/service/tms/1.0.0/dao:daoguan@4326@geojson/' +
            (tileCoord[0] - 1) + '/' + tileCoord[1] + '/' + (Math.pow(2, tileCoord[0] - 1) + tileCoord[2]) + '.geojson';
    }

})

var vectorLayer = new VectorTile({
    extent: [101.79179100000005, 22.117118000000062, 133.68295000000012, 45.98590900000005],
    source: vectorsource
})

var mapconfig = {
    x: 117.25107421875,
    y: 32.113037109375,
    zoom: 5,
    streetmap: maplayer,
    daoguanLayer: vectorLayer
};

export default mapconfig
export function createStyleForFeature(feature){
    return style = new Style({
        image: new Icon({
            crossOrigin: 'anonymous',
            anchor: [0.5, 1],
            scale: 0.01,
            src: '../assets/point.png'
        }),
        text: new Text({
            text: feature.get('name')
        })
    });
}