<template>
  <v-navigation-drawer app height="100%" class="sidebar" @input="$emit('input', $event)" :value="value">
    <AuthModal :value="authModalShown" :open-tab="defaultAuthTab" @tab-change="setAuthTab" @input="authModalShown = false" />
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="text-h6">{{ $i18n("organicity") }}</v-list-item-title>
        <v-list-item-subtitle>subtext</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>
    <v-list nav>
      <div v-for="(item, index) in $store.getters['auth/loggedIn'] ? authTopItems : topItems" :key="index">
        <v-list-item link @click="item.onClick">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </div>
    </v-list>
    <v-divider></v-divider>

    <SlideTabSwitcher :slide-condition="subCategoriesShown">
      <template slot="left">
        <div>
          <v-list nav class="subcategory-menu">
            <div v-for="(item, index) in navItems" :key="index">
              <v-list-item
                link
                @click="
                  currentCategory = item.title;
                  subCategoriesShown = !subCategoriesShown;
                "
              >
                <v-list-item-icon>
                  <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-content>
                <v-list-item-icon>
                  <v-icon>chevron_right</v-icon>
                </v-list-item-icon>
              </v-list-item>
            </div>
          </v-list>
          <v-divider></v-divider>
          <v-list nav class="subcategory-menu">
            <div v-for="(item, index) in otherItems" :key="index">
              <v-list-item link :to="item.to" @click="$emit('input', $event)">
                <v-list-item-icon>
                  <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </div>
          </v-list>

          <div class="d-flex justify-space-around">
            <v-btn :href="navItem.to" target="_blank" v-for="(navItem, index) in socialItems" :key="index" icon>
              <v-icon>
                {{ navItem.icon }}
              </v-icon>
            </v-btn>
          </div>
        </div>
      </template>
      <template slot="right">
        <v-list nav class="subcategory-menu">
          <div>
            <v-list-item link @click="subCategoriesShown = !subCategoriesShown">
              <v-list-item-icon>
                <v-icon>chevron_left</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Geri Dön</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </div>
          <div v-for="(item, index) in subNavItems[currentCategory]" :key="index">
            <v-list-item link @click="subCategoriesShown = !subCategoriesShown">
              <v-list-item-icon>
                <v-icon>chevron_right</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </div>
        </v-list>
      </template>
    </SlideTabSwitcher>
  </v-navigation-drawer>
</template>

<script>
import AuthModal from '../display/AuthModal.vue';
import SlideTabSwitcher from '../transitions/SlideTabSwitcher.vue'
export default {
  components: { SlideTabSwitcher, AuthModal },
  data() {
    return {
      currentCategory: "info",
      defaultAuthTab: 0,
      authModalShown: false,
      topItems: [
        {
          title: 'Giriş Yap', icon: 'login', onClick: () => {
            this.defaultAuthTab = 0;
            this.$emit("input", this.$event)
            this.authModalShown = true;
          }
        },
        {
          title: 'Kaydol', icon: 'mdi-account-plus', onClick: () => {
            this.defaultAuthTab = 1;
            this.$emit("input", this.$event)
            this.authModalShown = true;
          }
        },
      ],
      authTopItems: [
        {
          title: 'Profil', icon: 'mdi-account', onClick: () => {
            this.$emit("input", this.$event)
            this.$router.push('/account')
          }
        },
        {
          title: 'Siparişlerim', icon: 'mdi-shopping-outline', onClick: () => {
            this.$emit("input", this.$event)
          }
        },
        {
          title: 'Favorilerim', icon: 'mdi-account-group-outline', onClick: () => {
            this.$emit("input", this.$event)
          }
        },
        {
          title: 'Çıkış Yap', icon: 'mdi-logout', onClick: () => {
            this.$emit("input", this.$event)
            this.$store.commit('auth/logout')
          }
        },
      ],
      navItems: [
        { title: 'Category1', icon: 'mdi-book-open-page-variant' },
        { title: 'Category2', icon: 'mdi-account-heart' },
        { title: 'Category3', icon: 'mdi-newspaper' },
      ],
      subNavItems: {
        "Category1": [
          { title: "SubCategory", icon: "", to: "" },
          { title: "SubCategory", icon: "", to: "" },
          { title: "SubCategory", icon: "", to: "" },
          { title: "SubCategory", icon: "", to: "" },
          { title: "SubCategory", icon: "", to: "" },
        ],
        "Category2": [
          { title: "SubCategory", icon: "", to: "" },
          { title: "SubCategory", icon: "", to: "" },
          { title: "SubCategory", icon: "", to: "" },
          { title: "SubCategory", icon: "", to: "" },
          { title: "SubCategory", icon: "", to: "" },
        ],
        "Category3": [
          { title: "SubCategory", icon: "", to: "" },
          { title: "SubCategory", icon: "", to: "" },
          { title: "SubCategory", icon: "", to: "" },
          { title: "SubCategory", icon: "", to: "" },
          { title: "SubCategory", icon: "", to: "" },
        ]
      },
      otherItems: [
        { title: this.$i18n("about_us"), icon: "mdi-information-outline", to: "" },
        { title: this.$i18n("team"), icon: "mdi-account-group", to: "" },
        { title: this.$i18n("contact_us"), icon: "mdi-phone", to: "contact-us" }
      ],
      socialItems: [
        { icon: "mdi-facebook", to: "https://www.facebook.com" },
        { icon: "mdi-twitter", to: "https://www.twitter.com" },
        { icon: "mdi-linkedin", to: "https://www.linked.in" },
        { icon: "mdi-instagram", to: "https://www.instagram.com" }
      ],
      subCategoriesShown: false
    }
  },
  props: ["value"],
  methods: {
    setAuthTab(e) {
      this.defaultAuthTab = e
    }
  }
}
</script>

<style scoped>
.sidebar >>> .v-navigation-drawer__content {
  overflow-y: hidden !important;
}
.subcategory-menu {
  padding-top: 0;
}
</style>