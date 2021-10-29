<template>
  <v-app-bar
    class="app-bar"
    app
    :style="{
      paddingLeft: paddingX,
      paddingRight: paddingX,
    }"
  >
    <v-app-bar-nav-icon v-if="$vuetify.breakpoint.smAndDown" />
    <div
      v-if="$vuetify.breakpoint.mdAndUp"
      style="width: 100%"
      class="d-flex align-center"
    >
      <img src="/logos/header-logo.png" height="40" />
      <h2 class="logo-font primary--text mr-4">{{ $i18n("organicity") }}</h2>
      <v-text-field
        v-model="searchString"
        @focus="focusedSearch = true"
        @blur="focusedSearch = false"
        solo
        flat
        :background-color="focusedSearch ? '#dfdfdf' : '#eee'"
        color="primary"
        dense
        height="45"
        class="search-field rounded-lg rounded-r-0"
        clearable
        hide-details
        prepend-inner-icon="search"
      />
      <v-btn
        large
        depressed
        :disabled="!focusedSearch && !searchString"
        class="rounded-l-0 primary"
      >
        Ara
      </v-btn>
      <v-btn color="primary" text large>{{ $i18n("sign_in") }}</v-btn>
      <v-btn color="primary" text large>{{ $i18n("sign_up") }}</v-btn>
      <v-btn color="primary" icon large>
        <v-icon>shopping_cart</v-icon>
      </v-btn>
      <AccessabilityMenu />
    </div>
    <div
      v-else
      style="width: 100%"
      class="d-flex align-center justify-space-between"
    >
      <img src="/logos/header-logo.png" height="30" />
      <h3 class="logo-font primary--text mr-4">{{ $i18n("organicity") }}</h3>
      <div class="d-flex">
        <v-btn color="primary" icon large>
          <v-icon>shopping_cart</v-icon>
        </v-btn>
        <AccessabilityMenu />
      </div>
    </div>
    <template v-if="$vuetify.breakpoint.smAndDown" slot="extension">
      <div class="d-flex mb-2" style="width: 100%">
        <v-text-field
          v-model="searchString"
          @focus="focusedSearch = true"
          @blur="focusedSearch = false"
          solo
          flat
          :background-color="focusedSearch ? '#dfdfdf' : '#eee'"
          color="primary"
          dense
          height="45"
          class="search-field rounded-lg rounded-r-0"
          clearable
          hide-details
          prepend-inner-icon="search"
        />
        <v-btn
          large
          depressed
          :disabled="!focusedSearch && !searchString"
          class="rounded-l-0 primary"
        >
          Ara
        </v-btn>
      </div>
    </template>
  </v-app-bar>
</template>

<script>
import AccessabilityMenu from './AccessabilityMenu.vue';
import DarkThemeSwitch from "./DarkThemeSwitch.vue";
import LanguageSelector from './LanguageSelector.vue';
export default {
  components: { DarkThemeSwitch, LanguageSelector, AccessabilityMenu },
  computed: {
    paddingX() {
      let screenWidth = this.$vuetify.breakpoint.width
      if (screenWidth < 960) return 0
      else if (screenWidth < 1264) return "calc((100% - 900px) / 2)"
      else if (screenWidth < 1904) return "calc((100% - 1185px) / 2)"
      else return "calc((100% - 1785px) / 2)"
    }
  },
  data() {
    return {
      focusedSearch: false,
      searchString: ""
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