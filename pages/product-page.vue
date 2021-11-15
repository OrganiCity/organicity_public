<template>
  <v-container>
    <p>
      <span class="grey--text text--lighten text-caption">Anasayfa &emsp;</span>
      <v-icon size="20">keyboard_arrow_right</v-icon>
      <span class="grey--text text--lighten text-caption">&emsp; Meyve, Sebze &emsp;</span>
      <v-icon size="20">keyboard_arrow_right</v-icon>
      <span class="grey--text text--lighten text-caption">&emsp; Sebze &emsp;</span>
      <v-icon size="20">keyboard_arrow_right</v-icon>
      <span class="font-weight-medium text-caption">&emsp; Taze Sebzeler</span>
    </p>

    <v-row >

      <v-col :class="$vuetify.breakpoint.smAndDown ? 'd-flex justify-center': ''" cols="12" md="6">
        <div>
          <v-img aspect-ratio="1" width="350px" :src="images[page]"></v-img>

          <!-- Images -->

          <v-item-group mandatory>
            <div class="d-flex align-center">
              <v-item v-for="(image, n) in images" :key="n" v-slot="{ active, toggle }">
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

      <v-col cols="12" md="6" :class="$vuetify.breakpoint.mdAndUp ?  'pr-10' :''">
        <span class="mr-4"><a style="text-decoration: none" href="/">Bizim Çiftlik</a></span>
        <p class="text-h4">Organik Çanakkale Domates</p>

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

        <div class="d-flex justify-space-around mt-5 mb-5">
          <v-tooltip color="primary" right>
            <template v-slot:activator="{ on, attrs }">
              <v-icon v-on="on" v-bind="attrs" size="40">settings_backup_restore</v-icon>
            </template>

            <span class="white--text">Organik ürün</span>
          </v-tooltip>

          <v-hover v-slot="{ hover }">
            <div :class="hover ? 'primary--text' : ''">
              <v-icon :color="hover ? 'primary' : ''" size="40">download_done</v-icon>
              TOB Onaylı
            </div>
          </v-hover>
          <v-icon size="40">pest_control</v-icon>
        </div>
        <v-sheet outlined rounded="" class=" pa-2 mb-4 text-body-2">
          Yeni bir yıl, yeni bir heyecan ve yeni hayaller demektir. Yeni yıla girerken her insan bir söz verir kendisine,
          gerçekleştirmek istedikleri için... Koku duyusu ise insanın en güçlü duyularından birisidir; bir yerin, bir anın kokusu
          senelerce unutulmaz, işte o değerli
        </v-sheet>
        <div class="d-flex justify-space-around align-center">
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

    <v-row id="tabs">
      <v-tabs light class="mt-8" slider-size="3" color="yellow accent-4" background-color="white">
        <v-tab :ripple="false">Ek Bilgiler</v-tab>
        <v-tab :ripple="false">Besin Değerleri</v-tab>
        <v-tab :ripple="false">İçindekiler</v-tab>
        <v-tab :ripple="false">Nasıl saklanmalı?</v-tab>
      </v-tabs>

      <v-divider class="pa-0 mr-1 yellow accent-4"></v-divider>
    </v-row>
  </v-container>
</template>



<script>
export default {
  data() {
    return {
      images: [
        "https://i.ibb.co/rmqHkL6/Pickle-rick-transparent-edgetrimmed.png",
        "https://www.greenada.com/Uploads/UrunResimleri/buyuk/greenadadomates-1-kg-e162.jpg",
        "https://5.imimg.com/data5/HM/KG/MY-42588315/fresh-orange-500x500.jpg",
      ],
      page: 0,
      rating: 3.0,
      favorited: false,
    };
  },
};
</script>

<style scoped>
</style>