<template>
  <v-app :lang="$store.getters['preferences/language']" class="px-0">
    <ScrollToTop />
    <HeaderBar @openSideBar="sideBarActive = true" />
    <MobileSidebar v-if="$vuetify.breakpoint.xsOnly" v-model="sideBarActive" />
    <v-main>
      <v-container>
        <v-row>
          <v-col class="mt-6" lg="3" md="4" v-if="$vuetify.breakpoint.mdAndUp">
            <!-- List -->
            <v-card elevation="0" outlined>
              <div class="d-flex justify-center mt-2">
                <v-icon size="60">account_circle</v-icon>
              </div>
              <p class="text-h6" style="text-align: center">
                {{ $store.getters["auth/userInfo"].firstName }} {{ $store.getters["auth/userInfo"].lastName }}
              </p>

              <v-divider></v-divider>
              <v-list flat>
                <v-list-item-group color="primary">
                  <v-hover v-slot="{ hover }">
                    <v-list-item :class="hover ? 'primary--text' : ''" to="/account/my-orders">
                      <v-icon :color="hover ? 'primary' : ''" left>mdi-shopping-outline</v-icon>
                      <v-list-item-title class="ml-2">Siparişlerim</v-list-item-title>
                    </v-list-item>
                  </v-hover>

                  <v-hover v-slot="{ hover }">
                    <v-list-item :class="hover ? 'primary--text' : ''" to="/account/my-favorites">
                      <v-icon :color="hover ? 'primary' : ''" left>favorite</v-icon>
                      <v-list-item-title class="ml-2">Favorilerim</v-list-item-title>
                    </v-list-item>
                  </v-hover>

                  <!-- <v-hover v-slot="{ hover }">
                    <v-list-item :class="hover ? 'primary--text' : ''" to="/account/my-reviews">
                      <v-icon :color="hover ? 'primary' : ''" left>rate_review</v-icon>
                      <v-list-item-title class="ml-2">Yorumlarım</v-list-item-title>
                    </v-list-item>
                  </v-hover> -->

                  <v-hover v-slot="{ hover }">
                    <v-list-item :class="hover ? 'primary--text' : ''" to="/account/my-addresses">
                      <v-icon :color="hover ? 'primary' : ''" left>library_books</v-icon>
                      <v-list-item-title class="ml-2">Adreslerim</v-list-item-title>
                    </v-list-item>
                  </v-hover>

                  <v-hover v-slot="{ hover }">
                    <v-list-item :class="hover ? 'primary--text' : ''" to="/account/my-account">
                      <v-icon :color="hover ? 'primary' : ''" left>manage_accounts</v-icon>
                      <v-list-item-title class="ml-2">Hesabım</v-list-item-title>
                    </v-list-item>
                  </v-hover>

                  <v-hover v-slot="{ hover }">
                    <v-list-item  v-if="!isSeller" :class="hover ? 'primary--text' : ''" to="/account/create-store">
                      <v-icon :color="hover ? 'primary' : ''" left>add_business</v-icon>
                      <v-list-item-title class="ml-2">Mağaza Aboneliği</v-list-item-title>
                    </v-list-item>
                    <v-list-item v-else :class="hover ? 'primary--text' : ''" to="/seller">
                      <v-icon :color="hover ? 'primary' : ''" left>store</v-icon>
                      <v-list-item-title class="ml-2">Mağazam</v-list-item-title>
                    </v-list-item>
                  </v-hover>

                  <v-hover v-slot="{ hover }">
                    <v-list-item :class="hover ? 'primary--text' : ''" to="/contact-us">
                      <v-icon :color="hover ? 'primary' : ''" left>contact_support</v-icon>
                      <v-list-item-title class="ml-2">Çözüm Merkezi</v-list-item-title>
                    </v-list-item>
                  </v-hover>
                  <v-hover v-slot="{ hover }">
                    <v-list-item
                      :class="hover ? 'primary--text' : ''"
                      @click="
                        $store.commit('auth/logout');
                        $toast.info('Çıkış Yapıldı');
                      "
                    >
                      <v-icon :color="hover ? 'primary' : ''" left>mdi-logout</v-icon>
                      <v-list-item-title class="ml-2">Çıkış Yap</v-list-item-title>
                    </v-list-item>
                  </v-hover>
                </v-list-item-group>
              </v-list>
            </v-card>
          </v-col>
          <v-col lg="9" md="8">
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
import HeaderBar from "~/components/ui/HeaderBar.vue";
import LanguageSelector from "~/components/ui/LanguageSelector.vue";
import MobileSidebar from "~/components/ui/MobileSidebar.vue";
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
  head() {
    return { titleTemplate: `${this.$i18n("organicity")}` };
  },
  data() {
    return {
      sideBarActive: false,
      isSeller:  this.$store.getters["auth/userInfo"]?.isSeller,
    };
  },
 
};
</script>