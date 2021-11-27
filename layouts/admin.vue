<template>
  <v-app :lang="$store.getters['preferences/language']" class="px-0">
    <ScrollToTop />
    <HeaderBar @openSideBar="sideBarActive = true" />
    <v-main>
      <v-container>
        <v-row>
          <v-col lg="3" md="4">
            <AdminSidebar />
          </v-col>
          <v-col lg="7" md="8" cols="12">
            <Nuxt />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import DarkThemeSwitch from "~/components/ui/DarkThemeSwitch.vue";
import Footer from "~/components/ui/Footer.vue";
import CategoryBar from '~/components/ui/CategoryBar.vue';
import HeaderBar from "~/components/ui/HeaderBar.vue";
import LanguageSelector from "~/components/ui/LanguageSelector.vue";
import ScrollToTop from "~/components/ui/ScrollToTop.vue";
import AdminSidebar from "~/components/admin/AdminSidebar.vue"
export default {
  components: {
    DarkThemeSwitch,
    LanguageSelector,
    HeaderBar,
    Footer,
    ScrollToTop,
    CategoryBar,
    AdminSidebar,
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