<template>
  <div id="manager">
    <div class="selector">
      <span>请选择模块：</span>
      <el-select v-model="mode" placeholder="请选择" style="width:100px;">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-button type="success" style="margin-left:20px;" @click="SubmitContent">提交</el-button>
    </div>
    <div class="information" v-if="mode!='About'">
      <div class="box">
        <span>标题：</span>
        <input type="text" placeholder="请输入" v-model="title" />
      </div>
      <div class="box">
        <span>作者：</span>
        <input type="text" placeholder="请输入" v-model="author" />
      </div>
    </div>
    <div class="iamgebox" v-if="mode!='About'">
      <div class="box1">
        <span>
          封面
          <font style="font-size:9px">(请您尽量选择方图)：</font>
        </span>
      </div>
      <div class="box1">
        <img
          :src="tempsrc==null?require('assets/err.png'):tempsrc"
          style="height:140px;width:140px;"
        />
      </div>
      <div class="box1">
        <a href="javascript:;" class="file">
          选择文件
          <input type="file" accept=".jpg, .jpeg, .png" @change="ChooseImage" />
        </a>
      </div>
    </div>
    <Editor style="float:left;" @change="change"></Editor>
  </div>
</template>
<script>
import Editor from "components/common/Editor";
import Utils from "utils/util.js";
export default {
  components: { Editor },
  data() {
    return {
      title: null,
      author: null,
      text: null,
      mode: null,
      tempsrc: null,

      options: [
        { label: "作品集", value: "Work" },
        { label: "分享会", value: "Share" },
        { label: "关于", value: "About" }
      ]
    };
  },
  methods: {
    change(text) {
      console.log(text);
      this.text = text;
    },
    SubmitContent() {
      if (
        this.title != null &&
        this.author != null &&
        this.text != null &&
        this.mode != null
      ) {
        let time = Utils.Today();
        this.axios
          .post(
            "/api/" + this.mode + "/Add.php",
            this.qs.stringify({
              ID: time,
              Title: this.title,
              Image: this.tempsrc,
              Author: this.author,
              Text: this.text,
              Date: new Date()
            })
          )
          .then(res => {
            console.log(res);
            if (this.mode == "Work") {
              this.$router.push("/");
            } else {
              this.$router.push("/" + this.mode.toLowerCase());
            }
          })
          .catch(err => {
            console.error(err);
          });
      } else if (this.mode == "About" && this.text != null) {
        this.axios
          .post(
            "/api/About/Update.php",
            this.qs.stringify({
              AboutText: this.text,
              AboutDate: new Date()
            })
          )
          .then(res => {
            console.log(res);
            this.$router.push("/" + this.mode.toLowerCase());
          })
          .catch(err => {
            console.error(err);
          });
      } else {
        this.$message("您还有信息未填写哦~");
      }
    },
    ChooseImage(e) {
      let callback = res => {
        console.log(res);
        this.tempsrc = res;
      };
      Utils.ChooseImage(e, callback);
    }
  }
};
</script>
<style scoped>
span {
  color: #999999;
  font-family: "SimHei";
}
.selector {
  height: 50px;
  width: 290px;
  margin-bottom: 10px;
  float: right;
}
.information {
  width: 510px;
  height: 50px;
  float: left;
  margin-bottom: 20px;
}
.information input {
  width: 140px;
  height: 25px;
  padding: 0px 10px;
  outline: 1px solid #999999;
}
.box {
  float: left;
  margin-left: 20px;
  height: 50px;
  line-height: 40px;
}
.iamgebox {
  width: 800px;
  text-align: center;
  float: left;
  padding-left: 10px;
  margin-bottom: 20px;
}
.iamgebox .box1 {
  margin: 0px 10px;
  height: 160px;
  line-height: 160px;
  float: left;
}
.file {
    position: relative;
    display: inline-block;
    background: #D0EEFF;
    border: 1px solid #99D3F5;
    border-radius: 4px;
    padding: 4px 12px;
    overflow: hidden;
    color: #1E88C7;
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
    background: #AADFFD;
    border-color: #78C3F3;
    color: #004974;
    text-decoration: none;
}
</style>
