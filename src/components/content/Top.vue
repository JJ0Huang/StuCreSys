<template>
  <div id="top" class="main_color">
    <span class="title">广州中医药大学——医工融合创新创业平台</span>
    <div class="user_box1">
      <span
        v-if="IsManager=='false'||IsManager==null"
        style="cursor: pointer;"
        @click="ToLogin()"
      >管理员登录</span>
      <span v-if="IsManager=='true'" style="cursor: pointer;" @click="ToDown()">注销</span>
    </div>
  </div>
</template>

<script>
import Utils from "utils/util.js";
export default {
  data() {
    return {
      IsManager: "false",
      psw: null
    };
  },
  created() {
    this.Init();
    this.GetPassword();
  },
  methods: {
    Init() {
      this.IsManager = Utils.GetCookie("IsManager");
      console.log(Utils.GetCookie("IsManager"));
    },
    GetPassword() {
      this.axios
        .get("/api/Manager/Get.php", null)
        .then(res => {
          this.psw = res.data[0].Password;
        })
        .catch(err => {
          console.error(err);
        });
    },
    ToLogin() {
      this.$prompt("请输入密码", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(({ value }) => {
          if (value == this.psw && this.psw != null) {
            Utils.SetCookie("IsManager", "true", 1);
            this.IsManager = Utils.GetCookie("IsManager");
            this.$message("登录成功");
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          } else {
            this.$message("密码错误");
          }
        })
        .catch(() => {
          this.$message("error");
        });
    },
    ToDown() {
      Utils.SetCookie("IsManager", "false", 1);
      this.IsManager = "false";
      if (
        this.$route.path == "/manager" ||
        this.$route.path == "/advertisement"
      ) {
        setTimeout(() => {
          this.$router.push("/");
          window.location.reload();
        }, 300);
      } else {
        setTimeout(() => {
          window.location.reload();
        }, 300);
      }
    }
  }
};
</script>

<style scoped>
* {
  line-height: 40px;
  font-family: "SimHei";
}
#top {
  height: 40px;
  width: 1000px;
  background: #3cb371;
  text-align: center;
  color: #ffffff;
}
.title {
  margin-right: -100px;
}
.user_box1 {
  width: 100px;
  float: right;
  padding-right: 15px;
}
</style>