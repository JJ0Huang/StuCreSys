<template>
  <div class="about">
    <!-- <input id="ttt" type="file" name="file" accept=".jpg, .jpeg, .png" @change="test" /> -->
    <div v-html="text"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      text: "<p>Loading</p>",
    };
  },
  created() {
    this.GetText();
  },
  methods: {
    GetText() {
      this.axios
        .get("/api/About/Get.php", null)
        .then(res => {
          console.log(res.data);
          this.text = res.data[0].AboutText;
        })
        .catch(err => {
          console.error(err);
        });
    }
  }
};
</script>
