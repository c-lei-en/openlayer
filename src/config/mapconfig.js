import TileLayer from "ol/layer/Tile";
import WMTS from "ol/source/WMTS";
import { get } from "ol/proj";
import { getTopLeft } from "ol/extent";
import WMTSTileGrid from "ol/tilegrid/WMTS";
import {
  Style,
  Text,
  Fill,
  Icon,
  Circle
} from 'ol/style'

var projection = get("EPSG:4326");
var projectionExtent = projection.getExtent();

var resolutions = [
  1.40625,
  0.703125,
  0.3515625,
  0.17578125,
  0.087890625,
  0.0439453125,
  0.02197265625,
  0.010986328125,
  0.0054931640625,
  0.00274658203125,
  0.001373291015625,
  0.0006866455078125,
  0.00034332275390625,
  0.000171661376953125,
  0.0000858306884765625,
  0.00004291534423828125,
  0.000021457672119140625,
  0.000010728836059570312,
  0.000005364418029785156,
  0.000002682209014892578,
  0.000001341104507446289
];
var matrixIds = [
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20
];

var hybridmap = new TileLayer({
  source: new WMTS({
    url: 'http://t0.tianditu.gov.cn/img_c/wmts?tk=c0b9cb30599dd11c468c8aaa2fc1863a',
    layer: "img",
    style: "default",
    matrixSet: "c",
    format: "tiles",
    wrapX: true, //地图缩小后，防止在一个页面出现多个一样的地图
    tileGrid: new WMTSTileGrid({
      origin: getTopLeft(projectionExtent),
      resolutions: resolutions.slice(0, 15), //slice方法不清楚的请百度
      matrixIds: matrixIds.slice(0, 15)
    })
  }),
  maxResolution: resolutions[0],
  minResolution: resolutions[21]
})

var textmap = new TileLayer({
  source: new WMTS({
    url: 'http://t0.tianditu.gov.cn/cia_c/wmts?tk=c0b9cb30599dd11c468c8aaa2fc1863a',
    layer: "cia",
    style: "default",
    matrixSet: "c",
    format: "tiles",
    wrapX: true, //地图缩小后，防止在一个页面出现多个一样的地图
    tileGrid: new WMTSTileGrid({
      origin: getTopLeft(projectionExtent),
      resolutions: resolutions.slice(0, 15), //slice方法不清楚的请百度
      matrixIds: matrixIds.slice(0, 15)
    })
  }),
  maxResolution: resolutions[0],
  minResolution: resolutions[21]
})

export var mapconfig = {
  x: 114.065,
  y: 22.549,
  zoom: 3,
  hybridmap: hybridmap,
  textmap: textmap
};
export function createStyle(feature, src) {
  return new Style({
    image: new Icon({
      scale: 0.01,
      src: src
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
