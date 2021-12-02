<template>
<v-container>
    <v-col v-for="product in products" :key="product.productID" cols="6" sm="4">
      <ProductPreview :product-id="product.productID"/>
    </v-col>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      products: [],
    }
  },
  mounted () {
    this.$api("getStoreProducts", this.$store.getters["auth/userInfo"].userID).then((data)=>{
      console.log(data);
    })
  }
}
</script>

<style>

</style>