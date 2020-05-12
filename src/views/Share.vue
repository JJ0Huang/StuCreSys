<template>
  <div id="share">
    <div v-for="(item,index) in Shares" :key="index" @click="ToContent(index)" style="float:left;">
      <Box
        :image="item.ShareImage"
        :title="item.ShareName"
        :text1="item.ShareAuthor"
        :text2="item.ShareDate"
        :width="150"
        style="float:left"
        v-if="index<CurrentPage*10&&index>=(CurrentPage-1)*10"
      ></Box>
    </div>
    <Paging @_GetCurrentPage="GetCurrentPage" :total="Shares.length"></Paging>
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
      Shares: []
    };
  },
  created() {
    this.GetShares();
  },
  methods: {
    ToContent(index) {
      this.$router.push({
        path: "/content",
        query: { ShareID: this.Shares[index].ShareID }
      });
    },
    GetCurrentPage(CurrentPage) {
      this.CurrentPage = CurrentPage;
    },
    GetShares() {
      this.axios
        .get("/api/Share/Get.php", null)
        .then(res => {
          this.Shares = res.data;
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