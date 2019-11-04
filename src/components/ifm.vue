<template>
  <div v-show="showOrDis">
    <el-tabs v-model="activeName" @tab-click="handleSelect">
      <el-tab-pane label="基本信息" index="ifm">{{}}</el-tab-pane>
      <el-tab-pane label="图片" index="picture">{{}}</el-tab-pane>
      <el-tab-pane label="视频" index="vedio">{{}}</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { GetMountainifm, GetPalace, GetDynasty } from "@/api/request";
export default {
  props: {
    openOrClose: Boolean,
    featureName: String
  },
  data() {
    return {
      activeName: "ifm",
      information: "",
      showOrDis: false
    };
  },
  watch: {
    featureName: function(newVal) {
      //   GetMountainifm(newVal).then()
    },
    openOrClose: function(newVal) {
      this.showOrDis = newVal;
    }
  },
  methods: {
    handleSelect() {}
  }
};
</script>


<style>
</style>