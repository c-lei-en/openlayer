<template>
  <div class="d">
    <menus id="menus" @test="echeck"></menus>
    <div id="map" ref="rootmap"></div>
  </div>
</template>

<script>
import menus from "./menu.vue";
import "ol/ol.css";
import { Map, View } from "ol";
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
import ADLayer from "openlayers_echart";
import echarts from "echarts";
export default {
  components: {
    menus
  },
  data() {
    return {
      oe: null,
      map: null,
      mountainArr: [],
      daoguanArr: [],
      mountainlayer: "",
      daoguanlayer: "",
      select: null,
      selectClick: "",
      featureName: ""
    };
  },
  mounted() {
    var mapcontainer = this.$refs.rootmap;
    this.map = new Map({
      target: mapcontainer,
      view: new View({
        center: [mapconfig.x, mapconfig.y],
        minZoom: 0,
        maxZoom: 15,
        zoom: 5,
        projection: "EPSG:4326",
        wrapX: false
      }),
      layers: [mapconfig.streetmap]
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
        source: mountainSource
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
        source: daoguanSource
      });

      map.addLayer(daoguanlayer);
    });

    this.selectClick = new Select({
      condition: click,
      style: function(feature) {
        return createStyle(feature, "http://47.98.245.7:9999/point.png");
      }
    });
    this.selectFeatures();
  },
  methods: {
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
      }
    },
    /**
     * 进行要素图层的选择
     * 将所选要素的name获取并且返回到featureName
     */
    selectFeatures: function() {
      this.select = this.selectClick;
      this.map.addInteraction(this.select);
      this.select.on("select", function(e) {
        if (e.target.getFeatures().array_.length > 0) {
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
  z-index: 50;
}
#ifm{
  position: fixed;
  top: 100px;
  right: 100px;
  height: 50%;
  z-index: 100;
}
</style>