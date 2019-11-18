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
        id: 'box',
        position: this.Cesium.Cartesian3.fromDegrees(this.$route.params.coordinate[0], this.$route.params.coordinate[1]),
        box: {
            dimensions: new this.Cesium.Cartesian3(1000.0, 1000.0, 1000.0),
			material: this.Cesium.Color.RED.withAlpha(0.5),
        }
    });
    this.viewer.flyTo(this.viewer.entities);
    //创建一个点击事件
        var handler = new this.Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas);

        //设置单击事件的处理函数
        handler.setInputAction( (e) => {

            //用来获取被点击的几何
            var pick = this.viewer.scene.pick(e.position);

            //判断   确定点击的地方有创建的几何并且点击的几何id为rectangle-1
            if (this.Cesium.defined(pick)&&(pick.id._id === 'box')){
                console.log(this.$route.params.queryIfm)
            }
        }, this.Cesium.ScreenSpaceEventType.LEFT_CLICK)
  },
  methods: {}
};
</script>