<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="closeOverlay">
      <el-tab-pane label="基本信息" name="ifm">{{information}}</el-tab-pane>
      <el-tab-pane label="图片" name="picture">
        <el-carousel :interval="5000" arrow="always">
          <el-carousel-item v-for="item in 3" :key="item">
            <img />
          </el-carousel-item>
        </el-carousel>
      </el-tab-pane>
      <el-tab-pane label="视频" name="vedio">{{}}</el-tab-pane>
      <el-tab-pane label="关闭"></el-tab-pane>
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
      imgArr: []
    };
  },
  watch: {
    apiName: function(newVal) {
      this.ifmName = newVal;
    },
    featureName: function(newVal) {
      this.pointName = newVal;
      this.getIfm();
    }
  },
  methods: {
    getIfm() {
      if (this.ifmName == "mountain") {
        GetMountainifm(this.pointName).then(response => {
          this.information = response.data.result.information;
          this.activeName = "ifm";
        });
      } else if (this.ifmName == "daoguan") {
        GetPalace(this.pointName).then(response => {
          this.information = response.data.result.information;
          this.activeName = "ifm";
        });
      }
    },
    closeOverlay(tab) {
      if (tab.label == "关闭") {
        this.$emit("closeOverlay", undefined);
      }
    }
  }
};
</script>
