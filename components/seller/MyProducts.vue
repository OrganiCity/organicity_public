<template>
<v-container>
  <v-row>
    <v-btn class="ma-4" color="primary" large>Add New Product</v-btn>
  </v-row>
    <v-row>
      <v-col v-for="product in products" :key="product.productID" cols="4" sm="3">
        <SellerProductPreview :product-id="product.productID" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SellerProductPreview from "./SellerProductPreview.vue"

export default {
  components: { SellerProductPreview },
  data () {
    return {
      products: [{productID: 1}, {productID: 2}, {productID: 0}],
    }
  },
  mounted () {
    // this.$api("getStoreProducts", this.$store.getters["auth/userInfo"].userID).then((data)=>{
    // })
  }
}
</script>

<style>

</style>