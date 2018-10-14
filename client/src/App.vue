<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
#app {
  margin-top: 10px;
  padding: 0px;
}
h1 {
  font-weight: 200;
}
i {
  padding: 4px;
}
.btn-sm {
  padding: 5px;
}
#contacted {
  max-width: 100px;
}

@media only screen and (min-device-width: 175px) and (max-device-width: 820px) and (-webkit-min-device-pixel-ratio: 3) {
  #edit-delete {
    white-space: nowrap;
  }
}
</style>
