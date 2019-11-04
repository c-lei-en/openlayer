<template>
  <div v-show="showOrDis">
    <el-tabs v-model="activeName" @tab-click="handleSelect">
      <el-tab-pane label="基本信息" index="ifm">{{information}}</el-tab-pane>
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
    featureName: String,
    apiName: String
  },
  data() {
    return {
      activeName: "ifm",
      information: "",
      ifmName: "",
      pointName: "",
      showOrDis: false
    };
  },
  watch: {
    apiName: function(newVal) {
      this.ifmName = newVal;
    },
    featureName: function(newVal) {
      this.pointName = newVal;
      this.getIfm();
    },
    openOrClose: function(newVal) {
      this.showOrDis = newVal;
    }
    
  },
  methods: {
    handleSelect() {},
    getIfm() {
      if (this.ifmName == "mountain") {
        GetMountainifm(this.pointName).then(response => {
          this.information = response.data.result.information;
        });
      } else if (this.ifmName == "daoguan") {
        GetPalace(this.pointName).then(response => {
          this.information = response.data.result.information;
        });
      }
    }
  }
};
</script>

 <style lang="less" scope>
.el-tabs {
  background-color: #545c64;
}
</style>
