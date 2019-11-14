<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
import register from "./components/register.vue";
export default {
  name: "app"
};
</script>

<style>
html,body,#cesiumContainer{
  width: 100%;
  height: 100%;
  position: absolute;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100%;
  height: 100%;
}
.cesium-widget-credits{ display:none} /**  隐藏版权信息 **/
	  .cesium-viewer .cesium-widget-credits{ display:none }

@import '/node_modules/cesium/Source/Widgets/widgets.css';
</style>