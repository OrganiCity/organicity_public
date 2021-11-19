<template>
  <v-app :lang="$store.getters['preferences/language']" class="px-0">
    <ScrollToTop />
    <HeaderBar @openSideBar="sideBarActive = true" />
    <MobileSidebar v-if="$vuetify.breakpoint.xsOnly" v-model="sideBarActive" />
    <v-main>
      <v-container>
        <v-row>
          <v-col lg="3" md="4" v-if="$vuetify.breakpoint.mdAndUp">
            <CategoryBar />
            <SpecialDeals class="mx-8 my-8" v-if="$vuetify.breakpoint.md" />
          </v-col>
          <v-col lg="7" md="8" cols="12">
            <Nuxt />
          </v-col>
          <v-col class="pt-5" cols="2" v-if="$vuetify.breakpoint.lgAndUp">
            <SpecialDeals />
          </v-col>
        </v-row>
      </v-container>
      <!-- <v-row justify-content="left">
      <v-col lg="3" md="4" v-if="$vuetify.breakpoint.mdAndUp">
        <CategoryBar/>
        <SpecialDeals class="mx-8 my-8" v-if="$vuetify.breakpoint.md"/>
      </v-col>
      <v-col lg="7" md="8" xs="12">
        <CarouselSlider/>
      </v-col>
      <v-col class="pt-5" cols="2" v-if="$vuetify.breakpoint.lgAndUp">
          <SpecialDeals/>
      </v-col>
    </v-row> -->
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