<template>
  <v-app-bar
    class="app-bar"
    app
    :style="{
      paddingLeft: paddingX,
      paddingRight: paddingX,
    }"
  >
    <div style="width: 100%" class="d-flex align-center">
      <img src="/logos/header-logo.jpg" height="40" />
      <h2 class="logo-font primary--text mr-4">{{ $i18n("organicity") }}</h2>
      <v-text-field
        outlined
        color="primary"
        dense
        class="search-field rounded-lg"
        clearable
        hide-details
        prepend-inner-icon="search"
      >
        deneme
      </v-text-field>
      <v-btn color="primary" text large>Giriş Yap</v-btn>
      <v-btn color="primary" text large>Üye Ol</v-btn>
      <v-btn color="primary" icon large>
        <v-icon>shopping_cart</v-icon>
      </v-btn>
    </div>
  </v-app-bar>
</template>

<script>
import DarkThemeSwitch from "./DarkThemeSwitch.vue";
export default {
  components: { DarkThemeSwitch },
  computed: {
    paddingX() {
      let screenWidth = this.$vuetify.breakpoint.width
      if (screenWidth < 960) return 0
      else if (screenWidth < 1264) return "calc((100% - 900px) / 2)"
      else if (screenWidth < 1904) return "calc((100% - 1185px) / 2)"
      else return "calc((100% - 1785px) / 2)"
    }
  }
};
</script>

<style scoped>
/* .app-bar >>> .v-toolbar__content {
  display: block !important;
} */
.app-bar {
  z-index: 1;
}
.search-field >>> .v-input__control .v-input__slot {
}
</style>