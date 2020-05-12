<template>
  <div id="container">
    <Top @_change="change"></Top>
    <SwiperTop></SwiperTop>
    <!-- 导航栏 -->
    <div id="tarbar">
      <router-link
        v-for="(item,index) in urls"
        :key="index"
        :to="{path:item.path,query:item.query}"
      >
        <span v-if="index==3">
          <span v-if="IsManager=='true'" class="tarbar_item">{{item.text}}</span>
        </span>
        <span v-else-if="index==4">
          <span v-if="IsManager=='true'" class="tarbar_item">{{item.text}}</span>
        </span>
        <span v-else class="tarbar_item">{{item.text}}</span>
      </router-link>
    </div>
    <!-- 主要组件内容 -->
    <div id="main" style="float:left;">
      <router-view></router-view>
    </div>
    <Bottom style="float:left;"></Bottom>
  </div>
</template>

<script>
import SwiperTop from "components/content/SwiperTop";
import Top from "components/content/Top";
import Bottom from "components/content/Bottom";
import Utils from "utils/util.js"
export default {
  components: { SwiperTop, Top, Bottom },
  created(){
    this.IsManager=Utils.GetCookie("IsManager")
  },
  data() {
    return {
      IsManager: 'false',
      urls: [
        { text: "作品集", path: "/" },
        { text: "分享会", path: "/share" },
        { text: "关于", path: "/about" },
        { text: "管理员模式", path: "/manager" },
        { text: "广告位管理", path: "/advertisement" },
      ]
    };
  },
  methods:{
    change(val){
      this.IsManager=val;
      this.$router.push("/");
    }
  }
};
</script>

<style scoped>
* {
  font-family: "SimHei";
}
#container {
  width: 1000px;
  position: relative;
  left: 50%;
  margin-left: -500px;
}
#tarbar {
  width: 800px;
  border-top: 1px solid #f0f0f0;
  padding: 10px 0px;
  position: relative;
  left: 50%;
  margin-left: -400px;
}
a {
  text-decoration: none;
}
.tarbar_item {
  background: #3cb371;
  color: #ffffff;
  padding: 7px 10px;
  font-size: 15px;
  border-left: 1px solid #ffffff;
}
#main {
  width: 800px;
  border-left: 1px solid #f0f0f0;
  border-right: 1px solid #f0f0f0;
  position: relative;
  left: 50%;
  margin-left: -430px;
  padding: 30px;
}
.main_color {
  background: #3cb371;
}
</style>