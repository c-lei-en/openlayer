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
* {
  padding: 0;
  margin: 0;
}
html,
body {
  height: 100%;
}
#app {
  height: 100%;
}
</style>