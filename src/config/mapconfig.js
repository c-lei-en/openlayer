import TileLayer from "ol/layer/Tile"
import TileArcGISRest from 'ol/source/TileArcGISRest'
import OSM from 'ol/source/OSM'
import {Style , Text, Circle, Fill} from 'ol/style'


let maptype = 0;

var streetmap = function () {
  var maplayer = null;
  switch (maptype) {
    case 0:
      maplayer = new TileLayer({
        source: new OSM()
      })
      break;
    case 1:
      maplayer = new TileLayer({
        source: new TileArcGISRest({
          url: 'https://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer'
        })
      })
      break;
  }
  return [maplayer]
}



export var mapconfig = {
    x: 114.065,
    y: 22.549,
    zoom: 3,
    streetmap: streetmap
  };
export function createStyle(feature) {
    return new Style({
        image: new Circle({
          radius: 5,
          fill: new Fill({
            color: "yellow"
          })
        }),

        text: new Text({
          // font 字体
          text: feature.get('name'),
          offsetX: 15,
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
