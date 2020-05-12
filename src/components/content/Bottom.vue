<template>
  <div class="bottom main_color">
    <div class="url_block">
      <span style="float:left">友情链接：</span>
      <div class="box" v-for="(item,index) in friends" :key="index">
        <a :href="item.FriendUrl">{{item.FriendText}}</a>
        <i
          v-if="IsManager=='true'"
          @mouseover="MouseOver(index)"
          @mouseout="MouseOut(index)"
          @click="DeleteUrl(index)"
          :style="{cursor: 'pointer',color:color[index]}"
          class="el-icon-error"
        ></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      friends: [],
      IsManager: "false",
      color: ["white"]
    };
  },
  created() {
    this.IsManager = this.Utils.GetCookie("IsManager");
    this.GetFriends();
  },
  methods: {
    GetFriends() {
      this.axios
        .get("/api/Friend/Get.php", null)
        .then(res => {
          console.log(res.data);
          this.friends = res.data;
        })
        .catch(err => {
          console.error(err);
        });
    },
    MouseOver(index) {
      this.$set(this.color, index, "red");
    },
    MouseOut(index) {
      this.$set(this.color, index, "white");
    },
    DeleteUrl(index) {
      this.$confirm("确定删除此链接吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let target = this.friends[index];
          this.axios
            .post(
              "/api/Friend/Delete.php",
              this.qs.stringify({
                FriendUrl: target.FriendUrl
              })
            )
            .then(res => {
              console.log(res);
              window.location.reload();
            })
            .catch(err => {
              console.error(err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>

<style scoped>
* {
  line-height: 40px;
}
.bottom {
  height: 100px;
  width: 1000px;
  margin-top: 30px;
}
.url_block {
  float: left;
  color: #ffffff;
  padding-left: 15px;
}
.box {
  height: 40px;
  float: left;
  margin: 0px 15px;
}
.addurl {
  width: 80px;
  height: 24px;
  line-height: 24px;
  background: #ffffff;
  padding: 5px 20px;
  color: #3cb371;
  font-size: 13px;
  border-radius: 12px;
  cursor: pointer;
}
</style>