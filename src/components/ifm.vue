<template>
<el-menu
  :default-active="activeIndex"
  class="el-menu-demo"
  mode="horizontal"
  @select="handleSelect"
  background-color="#545c64"
  text-color="#fff"
  active-text-color="#ffd04b">
  <el-menu-item index="ifm">基本信息</el-menu-item>
  <el-menu-item index="picture">图片</el-menu-item>
  <el-menu-item index="vedio">视频</el-menu-item>
</el-menu>
</template>

<script>
export default {
    data(){
        return {
            activeIndex: 'ifm'
        }
    }
    
}
</script>


<style>
</style>