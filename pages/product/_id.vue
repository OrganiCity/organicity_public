<template>
  <v-container>
    <!-- BreadCrumbs -->

    <v-slide-group class="mb-5">
      <!-- <v-slide-item v-for="item in breadcrumbs" :key="item.text">
        <span>
          <a :href="item.href" :class="item.child ? 'font-weight-medium text-caption' : 'grey--text text--lighten text-caption'">
            {{ item.text }}
          </a>
          <v-icon class="mx-1 mr-2" v-if="!item.child" size="18">keyboard_arrow_right</v-icon>
        </span>
      </v-slide-item> -->
      <v-breadcrumbs :items="breadcrumbs" class="pa-1">
        <template v-slot:item="{ item }">
          <v-breadcrumbs-item :href="item.href">
            <span :class="item.child ? 'font-weight-medium text-caption' : 'inv_contrast--text text--lighten text-caption'">
              {{ item.text }}
            </span>
          </v-breadcrumbs-item>
        </template>
        <template v-slot:divider>
          <v-icon>mdi-chevron-right</v-icon>
        </template>
      </v-breadcrumbs>
    </v-slide-group>

    <v-row>
      <!-- Images -->

      <v-col cols="12" md="6">
        <div>
          <!-- mdAndUp -->
          <template v-if="$vuetify.breakpoint.mdAndUp">
            <div class="d-flex justify-center">
              <v-responsive style="aspect-ratio: 1.4" class="d-flex align-center" max-width="450px">
                <zoom-on-hover :img-normal="product.images[page]"></zoom-on-hover>
              </v-responsive>
            </div>

            <div class="d-flex justify-center">
              <v-slide-group center-active show-arrows mandatory v-model="page">
                <v-slide-item v-for="(image, n) in product.images" :key="n" v-slot="{ active }">
                  <div class="d-flex align-center">
                    <v-card
                      v-ripple="{ class: 'yellow--text' }"
                      elevation="0"
                      background-color=" white"
                      light
                      class="mt-6 mx-2"
                      :style="active ? 'border: 3px solid #ffd600;' : 'border: 1px solid #e5e5e5;'"
                      @click="page = n"
                    >
                      <v-img aspect-ratio="1.4" :width="active ? '88px' : '96px'" :src="image"></v-img>
                    </v-card>
                  </div>
                </v-slide-item>
              </v-slide-group>
            </div>
          </template>

          <!-- Mobile -->
          <template v-else>
            <v-carousel height="auto" hide-delimiters :show-arrows="false" v-model="page">
              <v-carousel-item v-for="image in product.images" :key="image">
                <div class="d-flex justify-center">
                  <v-img :src="image" aspect-ratio="1.4" max-width="350px"></v-img>
                </div>
              </v-carousel-item>
            </v-carousel>

            <div class="d-flex justify-center" style="height: 16px">
              <v-slide-group style="position: relative; bottom: 28px; z-index: 1" mandatory v-model="page">
                <v-slide-item v-for="n in product.images.length" :key="n" v-slot="{ active }">
                  <v-btn x-small @click="page = n - 1" :color="active ? 'primary' : 'secondary'" icon>
                    <v-icon x-small>circle</v-icon>
                  </v-btn>
                </v-slide-item>
              </v-slide-group>
            </div>
          </template>
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
          {{ product.description }}
        </v-sheet>
        <div class="d-flex flex-wrap justify-space-around align-center">
          <span class="primary--text font-weight-medium text-h5">
            {{ product.pricePerUnit }} TL
            <span class="grey--text text-h6">/{{ product.unitType }}</span>
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

    <v-row class="mt-16" id="tabs">
      <v-tabs style="border-bottom: 1px solid #ffd600" v-model="tabs" show-arrows slider-size="3" color="yellow darken-2">
        <v-tab v-if="product.extraInfo" :ripple="false">{{ $i18n("extraInfo") }}</v-tab>
        <v-tab v-if="product.nutritionalValues" :ripple="false">{{ $i18n("nutritionalValues") }}</v-tab>
        <v-tab v-if="product.ingredients" :ripple="false">{{ $i18n("ingredients") }}</v-tab>
        <v-tab v-if="product.howToPreserve" :ripple="false">{{ $i18n("howToPreserve") }}</v-tab>
      </v-tabs>

      <v-tabs-items v-model="tabs">
        <v-tab-item v-if="product.extraInfo">
          <v-card flat>
            <v-card-text>{{ product.extraInfo }}</v-card-text>
          </v-card>
        </v-tab-item>

        <v-tab-item v-if="product.nutritionalValues">
          <v-card flat>
            <v-card-text>{{ product.nutritionalValues }}</v-card-text>
          </v-card>
        </v-tab-item>

        <v-tab-item v-if="product.ingredients">
          <v-card flat>
            <v-card-text>{{ product.ingredients }}</v-card-text>
          </v-card>
        </v-tab-item>

        <v-tab-item v-if="product.howToPreserve">
          <v-card flat>
            <v-card-text>{{ product.howToPreserve }}</v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
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
      rating: 5.0,
      favorited: false,
      tabs: null,
      tabTitles: ["extraInfo", "nutritionalValues", "ingredients", "howToPreserve"],
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
      this.$api("getProductByID", this.$route.params.id)
        .then(({ data }) => {
          this.product = data;
        })
        .catch(() => {
          this.$router.push("/product");
        });
    },
  },
  mounted() {
    this.getProductInfo();
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>