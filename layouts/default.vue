<template>
  <v-app :lang="$store.getters['preferences/language']" class="px-0">
    <ScrollToTop />
    <HeaderBar @openSideBar="sideBarActive = true" />
    <MobileSidebar v-if="$vuetify.breakpoint.xsOnly" v-model="sideBarActive" />
    <v-main>
      <v-container class="d-flex">
        <div>
          <CategoryBar v-if="$vuetify.breakpoint.smAndUp" />
          <SpecialDeals v-if="$vuetify.breakpoint.md" />
        </div>
        <Nuxt />
        <SpecialDeals v-if="$vuetify.breakpoint.lgAndUp" />
      </v-container>
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import SpecialDeals from '~/components/main-page/SpecialDeals.vue';
import CategoryBar from '~/components/ui/CategoryBar.vue';
import DarkThemeSwitch from "~/components/ui/DarkThemeSwitch.vue";
import Footer from "~/components/ui/Footer.vue";
import HeaderBar from "~/components/ui/HeaderBar.vue";
import LanguageSelector from "~/components/ui/LanguageSelector.vue";
import MobileSidebar from '~/components/ui/MobileSidebar.vue';
import ScrollToTop from "~/components/ui/ScrollToTop.vue";
export default {
  components: {
    DarkThemeSwitch,
    LanguageSelector,
    HeaderBar,
    Footer,
    ScrollToTop,
    MobileSidebar,
    CategoryBar,
    SpecialDeals,
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