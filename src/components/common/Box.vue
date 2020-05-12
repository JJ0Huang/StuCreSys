<template>
  <div
    class="flex container"
    :style="{cursor:'pointer',width:width+'px', background:CurrentBackground, border:'1px solid '+ CurrentBackground}"
    @click="_click"
    @mouseover="MouseOver"
    @mouseout="MouseOut"
  >
    <div class="flex image_box">
      <!-- <img :src="image==null?require('assets/err.png'):image" /> -->
      <img v-if="image!=null&&image!=''" :src="image" />
      <img v-else :src="require('assets/err.png')" />
    </div>
    <div class="font_box" :style="{color:color}">
      <div style="font-size:15px;">
        <font>{{title==null?'Loading...':title}}</font>
      </div>
      <div :if="text1!=null">
        <font>{{text1}}</font>
      </div>
      <div :if="text2!=null">
        <font>{{text2}}</font>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    width: Number,
    image: String,
    title: String,
    text1: String,
    text2: String,
    background: { type: String, default: "#7CCD7C" },
    background_over: { type: String, default: "#FFA500" },
    color: { type: String, default: "#FFFFFF" }
  },
  data() {
    return {
      CurrentBackground: null
    };
  },
  created() {
    this.CurrentBackground = this.background;
  },
  methods: {
    _click() {
      this.$emit("_fun");
    },
    MouseOver() {
      this.CurrentBackground = this.background_over;
    },
    MouseOut() {
      this.CurrentBackground = this.background;
    }
  }
};
</script>
<style scoped>
.flex {
  display: flex;
  justify-content: center;
}
.container {
  margin: 4px;
  flex-direction: column;
}
img {
  width: 140px;
  height: 140px;
}
.image_box {
  flex-direction: row;
  padding: 6% 10% 0 10%;
  background: #ffffff;
}
.font_box {
  padding-top: 10px;
  width: 80%;
  margin-bottom: 8%;
  margin-left: 10%;
  font-size: 12px;
}
a {
  text-decoration: none;
}
</style>