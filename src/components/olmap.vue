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
import mapconfig from "../config/mapconfig";
import hancharts from "../config/hanCharts";
import tangcharts from "../config/tangCharts";
import songcharts from "../config/songCharts";
import yuancharts from "../config/yuanCharts";
import mingcharts from "../config/mingCharts";
import qingcharts from "../config/qingCharts";
import ADLayer from "openlayers_echart";
import echarts from "echarts";
export default {
  components: {
    menus
  },
  data() {
    return {
      oe: null,
      map: null
    };
  },
  mounted() {
    var mapcontainer = this.$refs.rootmap;
    this.map = new Map({
      target: mapcontainer,
      layers: mapconfig.streetmap(),
      view: new View({
        projection: "EPSG:4326",
        center: [mapconfig.x, mapconfig.y],
        zoom: mapconfig.zoom
      })
    });
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
      }else if (value === "S") {
        try {
        this.oe.clear();
        } catch (error) {}
        this.oe = new ADLayer(songcharts.option, this.map, echarts);
        this.oe.render();
        this.map.render();
      }else if (value === "Y") {
        try {
        this.oe.clear();
        } catch (error) {}
        this.oe = new ADLayer(yuancharts.option, this.map, echarts);
        this.oe.render();
        this.map.render();
      }else if (value === "M") {
        try {
        this.oe.clear();
        } catch (error) {}
        this.oe = new ADLayer(mingcharts.option, this.map, echarts);
        this.oe.render();
        this.map.render();
      }else if (value === "Q") {
        try {
        this.oe.clear();
        } catch (error) {}
        this.oe = new ADLayer(qingcharts.option, this.map, echarts);
        this.oe.render();
        this.map.render();
      }
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
</style>