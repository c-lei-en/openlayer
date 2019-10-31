import TileLayer from "ol/layer/Tile"
import OSM from 'ol/source/OSM'
import { Style, Text, Fill, Icon, Circle } from 'ol/style'


var streetmap = new TileLayer({
    source: new OSM()
})



export var mapconfig = {
    x: 114.065,
    y: 22.549,
    zoom: 3,
    streetmap: streetmap
};
export function createStyle(feature) {
    return new Style({
        image: new Icon({
            scale: 0.01,
            src: "http://47.98.245.7:2019/point.png"
        }),

        text: new Text({
            // font 字体
            text: feature.get('name'),
            offsetY: -15,
            textAlign: "left",
            fill: new Fill({
                color: "white"
            }),
            backgroundFill: new Fill({
                color: "#0a3866"
            }),
            padding: [3, 3, 3, 3]
        })
    });
}
