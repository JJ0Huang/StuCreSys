<template>
  <div class="container">
    <div class="box" v-for="(item,index) in 3" :key="index">
      <img :src="tempsrc[index]" alt />
      <span>广告位{{index+1}}</span>
      <span>
        <a href="javascript:;" class="file">
          选择文件
          <input
            v-if="tempsrc[index]==null"
            type="file"
            accept=".jpg, .jpeg, .png"
            @change="ChooseImage($event,index)"
          />
          <input
            v-if="tempsrc[index]!=null"
            type="file"
            accept=".jpg, .jpeg, .png"
            @change="UpdateImage($event,index)"
          />
        </a>
      </span>
    </div>
    <div class="urls">
      <span>
        <label>显示链接名称：</label>
        <el-input v-model="NewFriend.FriendText"></el-input>
      </span>
      <span>
        <label>网址：</label>
        <el-input v-model="NewFriend.FriendUrl"></el-input>
      </span>
      <el-button @click="AddUrl()">添加链接</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      img: [],
      tempsrc: [],
      NewFriend: {}
    };
  },
  created() {
    this.GetImages();
  },
  methods: {
    GetImages() {
      this.axios
        .get("/api/Advertisement/Get.php", null)
        .then(res => {
          for (let i = 0; i < res.data.length; i++) {
            this.$set(this.tempsrc, i, res.data[i].AdvertisementImage);
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    ChooseImage(e, index) {
      console.log(e);
      console.log(index);
      let callback = res => {
        console.log(res);
        this.$set(this.tempsrc, index, res);
        this.axios
          .post(
            "/api/Advertisement/Add.php",
            this.qs.stringify({
              AdvertisementID: String(index),
              AdvertisementImage: res
            })
          )
          .then(res => {
            console.log(res);
            window.location.reload();
          })
          .catch(err => {
            console.error(err);
          });
      };
      this.Utils.ChooseImage(e, callback);
    },
    UpdateImage(e, index) {
      console.log(e);
      console.log(index);
      let callback = res => {
        console.log(res);
        this.$set(this.tempsrc, index, res);
        this.axios
          .post(
            "/api/Advertisement/Update.php",
            this.qs.stringify({
              AdvertisementID: String(index),
              AdvertisementImage: res
            })
          )
          .then(res => {
            console.log(res);
            window.location.reload();
          })
          .catch(err => {
            console.error(err);
          });
      };
      this.Utils.ChooseImage(e, callback);
    },
    AddUrl() {
      this.axios
        .post(
          "/api/Friend/Add.php",
          this.qs.stringify({
            FriendText: this.NewFriend.FriendText,
            FriendUrl: this.NewFriend.FriendUrl
          })
        )
        .then(res => {
          console.log(res);
          window.location.reload();
        })
        .catch(err => {
          console.error(err);
        });
    }
  }
};
</script>
<style scoped>
.box {
  width: 800px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 20px;
}
.box span {
  width: 800px;
  text-align: center;
}
img {
  width: 800px;
  height: 150px;
  background: #ffffff;
}
.urls {
  width: 800px;
  height: 40px;
  line-height: 40px;
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.urls span {
  width: 350px;
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.urls .el-input {
  width: 200px;
}
.file {
  position: relative;
  display: inline-block;
  background: #d0eeff;
  border: 1px solid #99d3f5;
  border-radius: 4px;
  padding: 4px 12px;
  overflow: hidden;
  color: #1e88c7;
  text-decoration: none;
  text-indent: 0;
  line-height: 20px;
}
.file input {
  position: absolute;
  font-size: 100px;
  right: 0;
  top: 0;
  opacity: 0;
}
.file:hover {
  background: #aadffd;
  border-color: #78c3f3;
  color: #004974;
  text-decoration: none;
}
</style>