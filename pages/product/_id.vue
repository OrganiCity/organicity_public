<template>
  <v-container>
    <!-- BreadCrumbs -->

    <v-slide-group class="mb-5">
      <v-slide-item v-for="item in breadcrumbs" :key="item.text">
        <span>
          <a :href="item.href" :class="item.child ? 'font-weight-medium text-caption' : 'grey--text text--lighten text-caption'">
            {{ item.text }}
          </a>
          <v-icon class="mx-1 mr-2" v-if="!item.child" size="18">keyboard_arrow_right</v-icon>
        </span>
      </v-slide-item>
    </v-slide-group>

    <v-row>
      <!-- Images -->

      <v-col :class="$vuetify.breakpoint.smAndDown ? 'd-flex justify-center' : ''" cols="12" md="6">
        <div>
          <v-img aspect-ratio="1" width="350px" :src="product.images[page]"></v-img>

          <v-item-group mandatory>
            <div class="d-flex align-center">
              <v-item v-for="(image, n) in product.images" :key="n" v-slot="{ active, toggle }">
                <v-card
                  v-ripple="{ class: 'yellow--text' }"
                  elevation="0"
                  background-color=" white"
                  light
                  class="mt-6 mx-2"
                  :style="active ? 'border: 3px solid #ffd600;' : 'border: 1px solid #e5e5e5;'"
                  @click="
                    toggle();
                    page = n;
                  "
                >
                  <v-img aspect-ratio="1.4" :width="active ? '84px' : '98px'" :src="image"></v-img>
                </v-card>
              </v-item>
            </div>
          </v-item-group>
        </div>
      </v-col>

      <!-- Title -->

      <v-col cols="12" md="6" :class="$vuetify.breakpoint.mdAndUp ? 'pr-10' : ''">
        <span class="mr-4">
          <a style="text-decoration: none" href="/">{{ product.companyName }}</a>
        </span>
        <p class="text-h4">{{ product.productName }}</p>

        <v-rating
          class="d-inline"
          v-model="rating"
          color="yellow accent-4"
          background-color="grey"
          dense
          half-increments
          hover
          size="18"
        ></v-rating>
        <span class="grey--text text--lighten text-caption mr-2">{{ rating }}/5</span>
        <a class="text-caption" href="#tabs">Yorumları oku</a>
        <span class="text-caption">(8)</span>

        <!-- Certificates -->
        <div class="d-flex flex-wrap justify-space-around mt-5 mb-5">
          <!-- Dialog Certificate -->
          <v-dialog v-model="dialog" max-width="600">
            <template v-slot:activator="{ on, attrs }">
              <div v-on="on" v-bind="attrs">
                <v-hover v-slot="{ hover }">
                  <div :class="hover ? 'primary--text mx-2' : 'mx-2'">
                    <v-icon :color="hover ? 'primary' : ''" size="40">settings_backup_restore</v-icon>
                    <span>Organik Ürün</span>
                  </div>
                </v-hover>
              </div>
            </template>

            <v-card height="auto">
              <div class="d-flex justify-end">
                <v-btn class="mt-2 mr-2" x-large icon @click="dialog = false">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </div>

              <div class="d-flex justify-center">
                <v-icon size="90">settings_backup_restore</v-icon>
              </div>
              <p class="d-flex justify-center mb-5 mt-1 text-h5">Organik Ürün</p>

              <v-card-text :class="$vuetify.breakpoint.mdAndUp ? 'px-12' : ''">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                consequat
              </v-card-text>
              <v-card-actions></v-card-actions>
            </v-card>
          </v-dialog>

          <v-hover v-slot="{ hover }">
            <div :class="hover ? 'primary--text mx-2' : 'mx-2'">
              <v-icon :color="hover ? 'primary' : ''" size="40">download_done</v-icon>
              <span>TOB Onaylı</span>
            </div>
          </v-hover>

          <v-hover v-slot="{ hover }">
            <div :class="hover ? 'primary--text mx-2' : 'mx-2'">
              <v-icon :color="hover ? 'primary' : ''" size="40">pest_control</v-icon>
              <span>Pestisit Analizli</span>
            </div>
          </v-hover>
        </div>
        <v-sheet outlined rounded class="pa-2 mb-4 text-body-2">
          {{product.description}}
        </v-sheet>
        <div class="d-flex flex-wrap justify-space-around align-center">
          <span class="primary--text font-weight-medium text-h5">
            9,85 TL
            <span class="grey--text text-h6">/kg</span>
          </span>
          <div>
            <v-btn width="190px" color="primary">
              <v-icon size="20" left>shopping_cart</v-icon>
              Sepete Ekle
            </v-btn>
            <v-btn :outlined="favorited ? false : true" class="ml-4" icon large color="error" @click="favorited = !favorited">
              <v-icon>{{ favorited ? "favorite" : "favorite_border" }}</v-icon>
            </v-btn>
          </div>
        </div>
      </v-col>
    </v-row>

    <!-- Tabs -->

    <v-row id="tabs">
      <v-tabs show-arrows class="mt-8" slider-size="3" color="yellow darken-2">
        <v-tab :ripple="false">Ek Bilgiler</v-tab>
        <v-tab :ripple="false">Besin Değerleri</v-tab>
        <v-tab :ripple="false">İçindekiler</v-tab>
        <v-tab :ripple="false">Nasıl saklanmalı?</v-tab>
      </v-tabs>

      <v-divider class="px-1 yellow darken-2"></v-divider>
    </v-row>
  </v-container>
</template>



<script>
export default {
  layout: "product",
  data() {
    return {
      product: {
        images: [],
      },
      page: 0,
      rating: 3.0,
      favorited: false,
      dialog: false,
      breadcrumbs: [
        {
          text: "Anasayfa",
          href: "/",
          child: false,
        },
        {
          text: "Meyve, Sebze",
          href: "/taze20",
          child: false,
        },
        {
          text: "Meyve",
          href: "/kombu15",
          child: false,
        },
        {
          text: "Taze Meyveler",
          href: "/egri15",
          child: true,
        },
      ],
    };
  },
  methods: {
    getProductInfo() {
      this.$api("getProductByID", this.$route.params.id).then(({ data }) => { this.product = data }).catch(() => {
        this.$router.push("/product")
      })
    }
  },
  mounted() {
    this.getProductInfo();
  }
};
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>