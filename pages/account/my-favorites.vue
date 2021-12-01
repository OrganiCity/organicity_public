<template>
  <v-row class="my-4">
    <v-col cols="12" class="d-flex justify-center">
      <p class="text-h4 pa-0">Favorilerim</p>
    </v-col>
    <v-col v-for="product in favoriteProducts" :key="product.productID" cols="6" md="4" lg="3">
      <ProductPreview :product-id="product.productID" />
    </v-col>
  </v-row>
</template>

<script>
import ProductPreview from "~/components/product/ProductPreview.vue";
export default {
  layout: "account",
  data() {
    return {
      favoriteProducts: [],
    };
  },
  mounted() {
    this.$api("getFavoriteProducts", {
      userID: this.$store.getters["auth/userInfo"].userID,
    }).then(({ data }) => {
      this.favoriteProducts = data;
    });
  },
  components: {
    ProductPreview,
  },
};
</script>

<style>
</style>