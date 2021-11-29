<template>
  <v-card elevation="0" class="d-flex pa-2">
    <v-card rounded="lg" outlined>
      <v-img width="72" aspect-ratio="1.1" :src="productInfo.image" />
    </v-card>
    <div style="width: 100%" class="ml-2 d-flex flex-column justify-space-between">
      <div class="subtitle">{{ productInfo.productName }}</div>
      <div class="d-flex justify-space-between">
        <AddButtonWithCounter v-model="cartItemCount" />
        <span class="title">{{ productInfo.pricePerUnit }} ₺</span>
      </div>
    </div>
  </v-card>
</template>

<script>
import AddButtonWithCounter from '../input/AddButtonWithCounter.vue'
export default {
  components: { AddButtonWithCounter },
  props: { productID: { required: true }, productInfo: { default: () => ({}), required: true } },
  computed: {
    cartItemCount: {
      get: function () {
        return this.$store.getters['cart/items'][this.productID] || 0
      },
      set: function (value) {
        this.$store.commit('cart/setCount', { id: this.productID, count: value })
      }
    },
    // productInfoObj() {
    //   console.log(this.productInfo)
    //   return JSON.parse(this.productInfo)
    // }
  },
}
</script>

<style>
</style>