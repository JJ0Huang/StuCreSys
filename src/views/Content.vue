<template>
  <div class="container">
    <div class="title">{{Content.Title==null?'标题':Content.Title}}</div>
    <div class="box" style="font-size:14px;">作者：{{Content.Author==null?'无名氏':Content.Author}}</div>
    <div class="box">{{Content.Date==null?'no time':Content.Date}}</div>
    <div class="content" v-html="Content.Text" v-if="Content.Text!=null"></div>
    <div v-else>Loading...</div>
    <div v-if="IsManager=='true'" class="delete" @mouseover="MouseOver()" @mouseout="MouseOut()" @click="DeleteContent()">
      <img v-if="mode==1" :src="require('assets/delete1.png')" style="cursor: pointer;"/>
      <img v-if="mode==2" :src="require('assets/delete2.png')" style="cursor: pointer;"/>
    </div>
  </div>
</template>
<script>
import Utils from "utils/util.js"
export default {
  data() {
    return {
      Content: {},
      mode: 1,
      IsManager:"false"
    };
  },
  created() {
    this.IsManager=Utils.GetCookie("IsManager")
    if (this.$route.query.WorkID != null)
      this.GetWork(this.$route.query.WorkID);
    if (this.$route.query.ShareID != null)
      this.GetShare(this.$route.query.ShareID);
  },
  methods: {
    GetShare(ShareID) {
      this.axios
        .post(
          "/api/Share/GetByID.php",
          this.qs.stringify({
            ShareID: ShareID
          })
        )
        .then(res => {
          console.log(res.data);
          this.$set(this.Content, "Title", res.data.ShareName);
          this.$set(this.Content, "Author", res.data.ShareAuthor);
          this.$set(this.Content, "Text", res.data.ShareText);
          this.$set(this.Content, "Date", res.data.ShareDate);
        })
        .catch(err => {
          console.error(err);
        });
    },
    GetWork(WorkID) {
      this.axios
        .post(
          "/api/Work/GetByID.php",
          this.qs.stringify({
            WorkID: WorkID
          })
        )
        .then(res => {
          console.log(res.data);
          this.$set(this.Content, "Title", res.data.WorkName);
          this.$set(this.Content, "Author", res.data.WorkAuthor);
          this.$set(this.Content, "Text", res.data.WorkText);
          this.$set(this.Content, "Date", res.data.WorkDate);
        })
        .catch(err => {
          console.error(err);
        });
    },
    DeleteWork(WorkID) {
      this.axios
        .post(
          "/api/Work/Delete.php",
          this.qs.stringify({
            WorkID: WorkID
          })
        )
        .then(res => {
          console.log(res);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.$router.push('/')
        })
        .catch(err => {
          console.error(err);
        });
    },
    DeleteShare(ShareID) {
      this.axios
        .post(
          "/api/Share/Delete.php",
          this.qs.stringify({
            ShareID: ShareID
          })
        )
        .then(res => {
          console.log(res);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.$router.push('/share')
        })
        .catch(err => {
          console.error(err);
        });
    },
    DeleteContent() {
      this.$confirm("确定删除此文章吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          if (this.$route.query.WorkID != null) {
            this.DeleteWork(this.$route.query.WorkID);
          }
          if (this.$route.query.ShareID != null) {
            this.DeleteShare(this.$route.query.ShareID);
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    MouseOver() {
      this.mode = 2;
    },
    MouseOut() {
      this.mode = 1;
    }
  }
};
</script>
<style scoped>
.container {
  width: 800px;
  line-height: 40px;
  color: #666666;
  min-height: 80vh;
}
.title {
  text-align: center;
  font-size: 26px;
  color: #333333;
  margin-bottom: 15px;
}
.box {
  text-align: center;
  font-size: 12px;
  margin-top: -20px;
}
.delete {
  position: fixed;
  bottom: 10px;
  left: calc(50% + 370px);
}
img {
  width: 50px;
}
</style>