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
import mycharts from "../config/mycharts";
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
      if (value === "Q") {
        this.oe = new ADLayer(mycharts.option, this.map, echarts);
        this.oe.render();
        this.map.render();
      } else if (value === "H") {
        // oe.clear();
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