<template>
  <div id="swiper_top">
    <Swiper :images="iamges"></Swiper>
  </div>
</template>

<script>
import Swiper from '../common/Swiper'
export default {
  components:{Swiper},
  data(){
    return{
      iamges:[{},{},{}]
    }
  },
  created(){
    this.GetImages();
  },
  methods:{
    GetImages() {
      this.axios
        .get("/api/Advertisement/Get.php", null)
        .then(res => {
          for (let i = 0; i < res.data.length; i++) {
            this.$set(this.iamges, i, res.data[i].AdvertisementImage);
            // console.log(res.data[i].AdvertisementImage);
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
  }
}
</script>

<style scoped>
#swiper_top{
  width: 800px;
  position: relative;
  left: 50%;
  margin-left: -400px;
}
</style>