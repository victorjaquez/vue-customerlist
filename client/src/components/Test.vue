<template>
  <div>
    <p>{{ msg }}</p>
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
      const path =
        "https://0zrpjen2ze.execute-api.us-west-2.amazonaws.com/dev/test";
      axios
        .get(path)
        .then(response => {
          console.log(response.data);
          this.msg = response.data;
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
