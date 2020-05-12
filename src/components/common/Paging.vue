<template>
  <div>
    <div class="pages">
      <el-pagination background layout="prev, pager, next" :total="total==null?1:total" @current-change="GetCurrentPage"></el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  props:{
    total:Number
  },
  methods:{
    GetCurrentPage(CurrentPage){
      this.$emit('_GetCurrentPage',CurrentPage)
    }
  }
};
</script>
<style scoped>
.pages{
  margin-top: 30px;
  width: 800px;
  height: 60px;
  float: left;
  text-align: center;
}
</style>