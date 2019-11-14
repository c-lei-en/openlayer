<template>
    <div id="cesiumContainer">
  </div>
</template>
<script>
export default {
  name: "cesiumViewer",
  data() {
    return {
        viewer: null
    };
  },
  mounted() {
    this.viewer = new this.Cesium.Viewer("cesiumContainer", {
      selectionIndicator: false,
      infoBox: false,
      //使用全球地形
      terrainProvider: this.Cesium.createWorldTerrain()
    });
    // 光照阴影
    this.viewer.scene.globe.enableLighting = true;
    // 水体纹理
    var terrainProvider = this.Cesium.createWorldTerrain({
      requestWaterMask: true
    });
    this.viewer.terrainProvider = terrainProvider;

    let imgElement = document.getElementById('img');

    let box = this.viewer.entities.add({
        name: 'box',
        position: this.Cesium.Cartesian3.fromDegrees(this.$route.params.coordinate[0], this.$route.params.coordinate[1]),
        box: {
            dimensions: new this.Cesium.Cartesian3(10.0, 10.0, 10.0),
			material: this.Cesium.Color.RED.withAlpha(0.5),
        }
    });
    this.viewer.zoomTo(this.viewer.entities);
  },
  methods: {}
};
</script>