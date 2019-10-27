<template>
  <div id="menu">
    <el-button @click="drawer = true" type="primary" style="margin-left: 16px;">菜单</el-button>
    <el-drawer title="选择朝代" :visible.sync="drawer" :direction="direction" :modal='false' size="100%" style="height : 50%;width:15%;over-flow-x:hidden">
      <!-- <div> -->
        <el-button type="primary" size="medium" style="width : 100%; text-align : center" @click="test('H')" plain>汉</el-button>
        <br />
        <el-button type="primary" size="medium" style="width : 100%; text-align : center" @click="test('T')" plain>唐</el-button>
        <br />
        <el-button type="primary" size="medium" style="width : 100%; text-align : center" @click="test('S')" plain>宋</el-button>
        <br />
        <el-button type="primary" size="medium" style="width : 100%; text-align : center" @click="test('Y')" plain>元</el-button>
        <br />
        <el-button type="primary" size="medium" style="width : 100%; text-align : center" @click="test('M')" plain>明</el-button>
        <br />
        <el-button type="primary" size="medium" style="width : 100%; text-align : center" @click="test('Q')" plain>清</el-button>
        <el-drawer :append-to-body="true"></el-drawer>
      <!-- </div> -->
    </el-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      direction : 'rtl',
    };
  },
  methods: {
    test(params) {
      this.$emit('test', params)
    }
  }
};
</script>
