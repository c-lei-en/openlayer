<template>
  <div>
    <el-button @click="drawer = true" type="primary" style="margin-left: 16px;">菜单</el-button>
    <el-drawer
      title="选择朝代"
      :visible.sync="drawer"
      :direction="direction"
      :modal="false"
      size="100%"
      style="height : 50%;width:15%;over-flow-x:hidden"
    >
      <el-button
        type="primary"
        size="medium"
        style="width : 100%; text-align : center"
        v-for="dynasty in dynasty"
        :key="dynasty.id"
        @click="test(dynasty.name,dynasty.id)"
        plain
      >{{dynasty.name}}</el-button>
    </el-drawer>
    <el-card class="box-card" v-if="disPlay" style="position: fixed;left: 0;top: 50%;height : 50%;width:15%;overflow-y: auto;
  overflow-x: hidden;">
      <div slot="header" class="clearfix">
        <span>{{this.title}}</span>
      </div>
      <div class="text item">{{this.information}}</div>
    </el-card>
  </div>
</template>

<script>
import { GetDynasty } from "@/api/request";
export default {
  data() {
    return {
      information: "",
      title: "",
      disPlay: false,
      drawer: false,
      direction: "rtl",
      dynasty: [
        {
          id: "H",
          name: "汉"
        },
        {
          id: "T",
          name: "唐"
        },
        {
          id: "S",
          name: "宋"
        },
        {
          id: "Y",
          name: "元"
        },
        {
          id: "M",
          name: "明"
        },
        {
          id: "Q",
          name: "清"
        }
      ]
    };
  },
  watch: {
    drawer(newValue) {
      if (newValue == false) {
        this.disPlay = false;
        this.$emit("test", "C");
      }
    }
  },
  methods: {
    test(name, params) {
      GetDynasty(name).then(response => {
        this.information = response.data.result.ifm;
      });
      this.title = name;
      this.disPlay = true;
      this.$emit("test", params);
    }
  }
};
</script>
<style scoped>
.el-button {
  margin-left: 0;
}
</style>