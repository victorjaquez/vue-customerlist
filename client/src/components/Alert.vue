<template>
  <div>
    <b-alert variant="info" show dismissible>{{ message }}</b-alert>
    <br>
  </div>
</template>

<script>
export default {
  props: ["message"]
};
</script>
