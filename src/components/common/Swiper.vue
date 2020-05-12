<template>
  <div class="block">
    <el-carousel height="150px">
      <el-carousel-item v-for="(item,index) in images" :key="index">
        <img :src="item==null?require('assets/err.png'):item">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  props:{
    images:Array
  },
  methods:{
    
  }
}
</script>

<style scoped>
img{
  width:100%;
  height: 100%;
}
</style>