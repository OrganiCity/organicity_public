<template>
<v-container>
  <v-row>
    <v-btn @click.stop="dialogAddProduct = true"  class="ma-4" color="primary" large>Add New Product</v-btn>
     <v-dialog v-model="dialogAddProduct" overlay-color="secondary" max-width="700px">
      <AddProduct/>
    </v-dialog>
  </v-row>
    <v-row>
      <v-col v-for="product in products" :key="product.productID" cols="4" sm="3">
        <SellerProductPreview :productId="product.productID" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AddProduct from './AddProduct.vue'
import SellerProductPreview from "./SellerProductPreview.vue"

export default {
  components: { SellerProductPreview, AddProduct },
  data: () => ({
    dialogAddProduct: false,
  }),
  props:{
    products: [],
  }
 
}
</script>

<style>

</style>