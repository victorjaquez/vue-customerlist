<template>
  <div class="containter">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Test",
  data() {
    return {
      msg: ""
    };
  },
  methods: {
    getMessage() {
      axios
        .get("https://0zrpjen2ze.execute-api.us-west-2.amazonaws.com/dev/test")
        .then(res => {
          console.log(res.data);
          this.msg = res.data;
        })
        .catch(error => {
          console.error(error);
        });
    }
  },
  created() {
    this.getMessage();
  }
};
</script>
