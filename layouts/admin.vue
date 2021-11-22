<template>
  <v-app :lang="$store.getters['preferences/language']" class="px-0">
    <ScrollToTop />
    <HeaderBar @openSideBar="sideBarActive = true" />
    <v-main>
      <v-container fluid>
        <Nuxt />
      </v-container>
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import DarkThemeSwitch from "~/components/ui/DarkThemeSwitch.vue";
import Footer from "~/components/ui/Footer.vue";
import HeaderBar from "~/components/ui/HeaderBar.vue";
import LanguageSelector from "~/components/ui/LanguageSelector.vue";
import ScrollToTop from "~/components/ui/ScrollToTop.vue";
export default {
  components: {
    DarkThemeSwitch,
    LanguageSelector,
    HeaderBar,
    Footer,
    ScrollToTop,
    MobileSidebar,
  },
  middleware: "preferences",
  head() { return { titleTemplate: `${this.$i18n("organicity")}` } },
  data() {
    return {
      sideBarActive: false,
    }
  },
};
</script>