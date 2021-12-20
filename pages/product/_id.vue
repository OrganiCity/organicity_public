<template>
  <v-container>
    <!-- BreadCrumbs -->

    <v-slide-group class="mb-5">
      <v-breadcrumbs :items="product.breadcrumbs" class="pa-1">
        <template v-slot:item="{ item }">
          <v-breadcrumbs-item :to="`/search?cat=${item.categoryID}&limitCats=${item.categoryID}`">
            <span
              :class="
                product.breadcrumbs.indexOf(item) == product.breadcrumbs.length - 1
                  ? 'font-weight-medium text-caption'
                  : 'inv_contrast--text text--lighten text-caption'
              "
            >
              {{ item.name }}
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
        <!-- mdAndUp -->
        <template v-if="$vuetify.breakpoint.mdAndUp">
          <div class="d-flex justify-center">
            <v-responsive style="aspect-ratio: 1.4" class="d-flex align-center" max-width="450px">
              <zoom-on-hover style="cursor: zoom-in" :img-normal="product.images[page]"></zoom-on-hover>
            </v-responsive>
          </div>

          <div v-if="product.images.length > 1" class="d-flex justify-center mt-6">
            <v-slide-group center-active :show-arrows="product.images.length > 4 ? 'always' : ''" v-model="page">
              <v-slide-item v-for="(image, n) in product.images" :key="n" v-slot="{ active }">
                <div class="d-flex align-center">
                  <v-card
                    v-ripple="{ class: 'yellow--text' }"
                    elevation="0"
                    background-color=" white"
                    light
                    class="mx-2"
                    :style="active ? 'border: 3px solid #ffd600;' : 'border: 1px solid #e5e5e5;'"
                    @click="page = n"
                  >
                    <v-img aspect-ratio="1.4" :width="active ? '88px  ' : '96px'" :src="image"></v-img>
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

          <div class="d-flex justify-center" style="height: 20px">
            <v-slide-group style="position: relative; bottom: 28px; z-index: 1" mandatory v-model="page">
              <v-slide-item v-for="n in product.images.length" :key="n" v-slot="{ active }">
                <v-btn x-small @click="page = n - 1" :color="active ? 'primary' : 'secondary'" icon>
                  <v-icon x-small>circle</v-icon>
                </v-btn>
              </v-slide-item>
            </v-slide-group>
          </div>
        </template>
      </v-col>

      <!-- Title -->

      <v-col cols="12" md="6" :class="$vuetify.breakpoint.mdAndUp ? 'pr-10' : ''">
        <nuxt-link :to="'/store/' + product.sellerID">
          <p class="mb-0">{{ product.companyName }}</p>
        </nuxt-link>

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
        <!-- <a class="text-caption" href="#tabs">Yorumları oku</a> -->
        <span class="text-caption">(8)</span>

        <!-- Certificates -->
        <div class="d-flex flex-wrap justify-space-around mb-5">
          <!-- Dialog Certificate -->
          <div
            v-for="(certificate, index) in product.certificates"
            :key="index"
            @click="setCurrentCertificate(index)"
            @click.stop="dialog = true"
            style="cursor: pointer"
          >
            <v-hover v-slot="{ hover }">
              <div :class="hover ? 'primary--text mx-2 mt-5' : 'mx-2 mt-5'">
                <v-icon :color="hover ? 'primary' : ''" size="40">{{ certificate.iconTag }}</v-icon>
                <span>{{ certificate.cName }}</span>
              </div>
            </v-hover>
          </div>
          <v-dialog v-model="dialog" max-width="600" overlay-color="secondary">
            <v-card height="auto">
              <div class="d-flex justify-end">
                <v-btn class="mt-2 mr-2" x-large icon @click="dialog = false">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </div>
              <div class="d-flex justify-center">
                <v-icon size="90">{{ getCertificateIconTag() }}</v-icon>
              </div>
              <p class="d-flex justify-center mb-5 mt-1 text-h5">{{ getCertificateName() }}</p>
              <v-card-text :class="$vuetify.breakpoint.mdAndUp ? 'px-12' : ''">{{ getCertificateDescription() }}</v-card-text>
            </v-card>
          </v-dialog>
        </div>
        <v-sheet outlined rounded class="pa-2 mb-4 text-body-2">
          {{ product.description }}
        </v-sheet>
        <div class="d-flex flex-wrap justify-space-around align-center">
          <span class="primary--text font-weight-medium text-h5">
            {{ product.pricePerUnit }} TL
          </span>
          <div>
            <v-btn @click="addToCart" width="190px" color="primary">
              <v-icon size="20" left>shopping_cart</v-icon>
              Sepete Ekle
            </v-btn>
            <v-btn :outlined="favorited ? false : true" class="ml-4" icon large color="error" @click="addToFavorites">
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
      dialog: false,
      currentCertificate: 0,
      product: {
        images: [],
        certificates: [],
      },
      page: 0,
      rating: 5.0,
      favorited: 0,
      tabs: null,
      tabTitles: ["extraInfo", "nutritionalValues", "ingredients", "howToPreserve"],
      breadcrumbs: [],
    };
  },
  methods: {
    addToFavorites() {
      if (!this.$store.getters["auth/userInfo"]) this.$toast.info("Lütfen Giriş Yapınız");
      else if (!this.favorited) {
        this.$api("addToFavorites", {
          productID: this.$route.params.id,
          userID: this.$store.getters["auth/userInfo"]?.userID,
        }).then((this.favorited = 1));
      } else
        this.$api("deleteFromFavorites", {
          productID: this.$route.params.id,
          userID: this.$store.getters["auth/userInfo"]?.userID,
        }).then((this.favorited = 0));
    },
    setCurrentCertificate(index) {
      this.currentCertificate = index;
    },
    getCertificateIconTag() {
      return this.product.certificates[this.currentCertificate]?.iconTag;
    },
    getCertificateName() {
      return this.product.certificates[this.currentCertificate]?.cName;
    },
    getCertificateDescription() {
      return this.product.certificates[this.currentCertificate]?.description;
    },
    getProductInfo() {
      this.$api("getProductByID", this.$route.params.id)
        .then(({ data }) => {
          this.product = data;
          if (this.$store.getters["auth/userInfo"]?.userID)
            this.$api("isFavorited", {
              productID: this.$route.params.id,
              userID: this.$store.getters["auth/userInfo"].userID,
            }).then(({ data }) => {
              this.favorited = data.favorited;
            });
        })
        .catch(() => {
          this.$router.push("/product");
        });
    },
    addToCart() {
      this.$store.commit("cart/addToCart", this.product.productID);
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