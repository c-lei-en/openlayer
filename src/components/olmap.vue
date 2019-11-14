<template>
  <div class="d">
    <menus id="menus" @test="echeck"></menus>
    <ifm id="ifmItem" :featureName="featureName" :coordinate="coordinateCesium" :apiName="apiName" @closeOverlay="CloseOverlay"></ifm>
    <div id="map" ref="rootmap"></div>
  </div>
</template>

<script>
import menus from "./menu.vue";
import ifm from "./ifm.vue";
import "ol/ol.css";
import { Map, View } from "ol";
import Overlay from "ol/Overlay";
import vectorSource from "ol/source/Vector";
import vectorLayer from "ol/layer/Vector";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { fromLonLat } from "ol/proj";
import { click } from "ol/events/condition";
import Select from "ol/interaction/Select";
import { mapconfig, createStyle } from "../config/mapconfig";
import hancharts from "../config/hanCharts";
import tangcharts from "../config/tangCharts";
import songcharts from "../config/songCharts";
import yuancharts from "../config/yuanCharts";
import mingcharts from "../config/mingCharts";
import qingcharts from "../config/qingCharts";
import { GetMountain, GetDaoguan } from "@/api/request";
import ADLayer from "@/config/openlayer_echarts";
import echarts from "echarts";
export default {
  components: {
    menus,
    ifm
  },
  data() {
    return {
      oe: null,
      map: null,
      mountainArr: [],
      daoguanArr: [],
      mountainlayer: "",
      daoguanlayer: "",
      overLay: "",
      select: null,
      selectClick: "",
      apiName: "",
      featureName: "",
      openOrClose: false,
      coordinateCesium: []
    };
  },
  mounted() {
    var mapcontainer = this.$refs.rootmap;
    this.overLay = new Overlay({
      element: document.getElementById("ifmItem"),
      autoPan: true,
      autoPanAnimation: {
        duration: 200
      }
    });
    let overLay = this.overLay;
    this.map = new Map({
      target: mapcontainer,
      view: new View({
        center: [mapconfig.x, mapconfig.y],
        minZoom: 0,
        maxZoom: 21,
        zoom: 5,
        projection: "EPSG:4326",
        wrapX: true
      }),
      layers: [mapconfig.hybridmap, mapconfig.textmap],
      overlays: [overLay]
    });
    let mountainArr = this.mountainArr;
    let daoguanArr = this.daoguanArr;
    let map = this.map;
    let mountainlayer = this.mountainlayer;
    let daoguanlayer = this.daoguanlayer;
    GetMountain().then(function(respose) {
      respose.data.features.forEach(el => {
        var name = el.attributes.Name;
        var lon = el.geometry.x;
        var lat = el.geometry.y;

        var point = new Feature({
          geometry: new Point(new fromLonLat([lon, lat], "EPSG:4326")),
          name: name
        });
        point.setStyle(createStyle(point, "http://47.98.245.7:9999/point.png"));
        mountainArr.push(point);
      });
      var mountainSource = new vectorSource({
        features: mountainArr
      });

      mountainlayer = new vectorLayer({
        source: mountainSource,
        name: "mountain"
      });

      map.addLayer(mountainlayer);
    });

    GetDaoguan().then(function(respose) {
      respose.data.features.forEach(el => {
        var name = el.attributes.name;
        var lon = el.geometry.x;
        var lat = el.geometry.y;

        var point = new Feature({
          geometry: new Point(new fromLonLat([lon, lat], "EPSG:4326")),
          name: name
        });

        point.setStyle(createStyle(point, "http://47.98.245.7:9999/point.png"));

        daoguanArr.push(point);
      });
      var daoguanSource = new vectorSource({
        features: daoguanArr
      });

      daoguanlayer = new vectorLayer({
        source: daoguanSource,
        name: "daoguan"
      });

      map.addLayer(daoguanlayer);
    });

    this.selectClick = new Select({
      condition: click,
      style: function(feature) {
        return createStyle(feature, "http://47.98.245.7:9999/point.png");
      }
    });
    this.map.on("click", e => {
      this.selectFeatures();
    });
  },
  methods: {
    CloseOverlay: function(value) {
      this.overLay.setPosition(value);
      this.apiName = "";
      this.featureName = "";
    },
    echeck: function(value) {
      if (value === "H") {
        try {
          this.oe.clear();
        } catch (error) {}
        this.oe = new ADLayer(hancharts.option, this.map, echarts);
        this.oe.render();
        this.map.render();
      } else if (value === "T") {
        try {
          this.oe.clear();
        } catch (error) {}
        this.oe = new ADLayer(tangcharts.option, this.map, echarts);
        this.oe.render();
        this.map.render();
      } else if (value === "S") {
        try {
          this.oe.clear();
        } catch (error) {}
        this.oe = new ADLayer(songcharts.option, this.map, echarts);
        this.oe.render();
        this.map.render();
      } else if (value === "Y") {
        try {
          this.oe.clear();
        } catch (error) {}
        this.oe = new ADLayer(yuancharts.option, this.map, echarts);
        this.oe.render();
        this.map.render();
      } else if (value === "M") {
        try {
          this.oe.clear();
        } catch (error) {}
        this.oe = new ADLayer(mingcharts.option, this.map, echarts);
        this.oe.render();
        this.map.render();
      } else if (value === "Q") {
        try {
          this.oe.clear();
        } catch (error) {}
        this.oe = new ADLayer(qingcharts.option, this.map, echarts);
        this.oe.render();
        this.map.render();
      } else if (value == "C") {
        try {
          this.oe.clear();
        } catch (e) {}
      }
    },
    getLayer: function(feature, map) {
      var layers = map.getLayers();
      for (var i = 0; i < layers.array_.length; i++) {
        var source = layers.array_[i].getSource();
        if (source instanceof vectorSource) {
          var features = source.getFeatures();
          if (features.length > 0) {
            for (var j = 0; j < features.length; j++) {
              if (features[j] === feature) {
                return layers.array_[i].values_.name;
              }
            }
          }
        }
      }
      return null;
    },
    /**
     * 进行要素图层的选择
     * 将所选要素的name获取并且返回到featureName
     */
    selectFeatures: function() {
      if (this.select !== null) {
        this.map.removeInteraction(this.select);
        this.select.features_.array_ = [];
      }
      this.select = this.selectClick;
      this.map.addInteraction(this.select);
      this.select.on("select", e => {
        if (e.target.getFeatures().array_.length > 0) {
          this.apiName = this.getLayer(
            e.target.getFeatures().array_[0],
            this.map
          );
          let coordinate = [
            e.mapBrowserEvent.coordinate[0],
            e.mapBrowserEvent.coordinate[1]
          ];
          this.coordinateCesium = coordinate;
          this.overLay.setPosition(coordinate);
          this.overLay.setOffset([-200, -330]);
          this.featureName = e.target.getFeatures().array_[0].values_.name;
        }
      });
    }
  }
};
</script>
<style>
.d {
  height: 100%;
}
#map {
  height: 100%;
}
#menus {
  position: fixed;
  top: 10px;
  right: 10px;
  z-index: 1000;
}
.el-tabs {
  background-color: #545c64;
  height: 300px;
  width: 400px;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>