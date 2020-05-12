<template>
  <div id="Works">
    <div v-for="(item,index) in Works" :key="index" @click="ToContent(index)" style="float:left;">
      <Box
        :image="item.WorkImage"
        :title="item.WorkName"
        :text1="item.WorkAuthor"
        :text2="item.WorkDate"
        :width="150"
        style="float:left"
        v-if="index<CurrentPage*10&&index>=(CurrentPage-1)*10"
      ></Box>
    </div>
    <Paging @_GetCurrentPage="GetCurrentPage" :total="Works.length"></Paging>
  </div>
</template>
<script>
import Box from "components/common/Box";
import Paging from "components/common/Paging";
export default {
  components: { Box, Paging },
  data() {
    return {
      CurrentPage: 1,
      Works: []
    };
  },
  created() {
    this.GetWorks();
  },
  methods: {
    ToContent(index) {
      this.$router.push({
        path: "/content",
        query: { WorkID: this.Works[index].WorkID }
      });
    },
    GetCurrentPage(CurrentPage) {
      this.CurrentPage = CurrentPage;
    },
    GetWorks() {
      this.axios
        .get("/api/Work/Get.php", null)
        .then(res => {
          this.Works = res.data;
          console.log(res.data)
          console.log(res.data.length)
        })
        .catch(err => {
          console.error(err);
        });
    }
  }
};
</script>
<style scoped>
</style>