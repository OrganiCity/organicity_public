<template>
  <v-app-bar
    class="app-bar"
    app
    clipped-left
    :style="{
      paddingLeft: paddingX,
      paddingRight: paddingX,
      zIndex: 2,
    }"
  >
    <v-app-bar-nav-icon v-if="$vuetify.breakpoint.smAndDown" @click="$emit('openSideBar')" />
    <!-- Desktop -->
    <div v-if="$vuetify.breakpoint.mdAndUp" style="width: 100%" class="d-flex align-center">
      <router-link to="/"><img src="/logos/header-logo.png" height="40" /></router-link>
      <router-link to="/" class="text-decoration-none">
        <h2 class="logo-font primary--text mr-4">{{ $i18n("organicity") }}</h2>
      </router-link>
      <SearchField />
      <template v-if="$store.getters['auth/loggedIn']">
        <AccountMenu />
      </template>
      <template v-else>
        <v-btn
          @click="
            setAuthTab(0);
            authModalShown = true;
          "
          color="primary"
          text
          large
        >
          {{ $i18n("sign_in") }}
        </v-btn>
        <v-btn
          @click="
            setAuthTab(1);
            authModalShown = true;
          "
          color="primary"
          text
          large
        >
          {{ $i18n("sign_up") }}
        </v-btn>
      </template>
      <v-btn color="primary" icon large>
        <v-icon>shopping_cart</v-icon>
      </v-btn>
      <AccessabilityMenu />
    </div>
    <!-- Mobile -->
    <div v-else style="width: 100%" class="d-flex align-center">
      <div class="d-flex mx-auto">
        <router-link to="/"><img src="/logos/header-logo.png" height="30" /></router-link>
        <router-link to="/" class="text-decoration-none">
          <h3 class="logo-font primary--text mr-4">{{ $i18n("organicity") }}</h3>
        </router-link>
      </div>
      <div class="d-flex">
        <v-btn color="primary" icon large>
          <v-icon>shopping_cart</v-icon>
        </v-btn>
        <AccessabilityMenu />
      </div>
    </div>
    <template v-if="$vuetify.breakpoint.smAndDown" slot="extension">
      <div class="d-flex mb-2" style="width: 100%">
        <SearchField />
      </div>
    </template>
    <AuthModal :value="authModalShown" :open-tab="defaultAuthTab" @tab-change="setAuthTab" @input="authModalShown = false" />
  </v-app-bar>
</template>

<script>
import AccountMenu from "../display/AccountMenu.vue";
import AuthModal from "../display/AuthModal.vue";
import AccessabilityMenu from "./AccessabilityMenu.vue";
import DarkThemeSwitch from "./DarkThemeSwitch.vue";
import LanguageSelector from "./LanguageSelector.vue";
import SearchField from "./SearchField.vue";
export default {
  components: { DarkThemeSwitch, LanguageSelector, AccessabilityMenu, AuthModal, AccountMenu, SearchField },
  computed: {
    paddingX() {
      let screenWidth = this.$vuetify.breakpoint.width;
      if (screenWidth < 960) return 0;
      else if (screenWidth < 1264) return "calc((100% - 900px) / 2)";
      else if (screenWidth < 1904) return "calc((100% - 1185px) / 2)";
      else return "calc((100% - 1785px) / 2)";
    },
  },
  data() {
    return {
      authModalShown: false,
      defaultAuthTab: 0,
    };
  },
  methods: {
    setAuthTab(e) {
      this.defaultAuthTab = e;
    },
  },
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