<template>
  <v-app-bar class="app-bar" app>
    <DarkThemeSwitch />
  </v-app-bar>
</template>

<script>
import DarkThemeSwitch from "./DarkThemeSwitch.vue";
export default {
  components: { DarkThemeSwitch },
};
</script>

<style scoped>
/* .app-bar >>> .v-toolbar__content {
  display: block !important;
} */
.app-bar {
  z-index: 1;
}
</style>