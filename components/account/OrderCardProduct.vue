<template>
  <div class="d-flex">
    <v-img
      class="ma-4 rounded"
      min-height="80px"
      min-width="100px"
      max-height="98px"
      max-width="120px" 
      aspect-ratio="1.4"
      :src="imgURL"
    ></v-img>
    <div class="mt-4">
      <div>
        <p class="text-body-1 ma-0">{{productName}}</p>
        <div class="mt-8">
          <p class="text-body-2 ma-0">{{quantity}} Adet</p>
          <p class="primary--text font-weight-medium">{{price}} TL</p>
        </div>
      </div>
      <!-- Buttons -->
      <div class="mt-8">
        <v-sheet max-width="100" class="pa-0 rounded" outlined>
          <v-btn :to="'/product/' + productID" block style="text-transform: none" class="pa-3 ma-0; card-btn;" color="inv_contrast" small text>
            <v-icon size="18px">mdi-cart-outline</v-icon>
            Tekrar Al
          </v-btn>
        </v-sheet>
        <nuxt-link :to="'/product/' + productID + '#tabs'">
          <div class="text-body-2 mt-4">
            <v-icon color="warning" size="18px">mdi-comment-plus-outline</v-icon>
            <span class="text-body-2">Ürünü Değerlendir</span>
          </div>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    price: 0,
    quantity: 0,
    productID: 0,
    imgURL: '',
    productName: '',
  }
};
</script>

<style>
</style>