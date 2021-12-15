<template>
  <v-card elevation="0" class="pa-4">
    <v-row class="d-flex align-center">
      <v-col md="2" cols="6">
        <v-img
          @click="$router.push('/product/' + productID)"
          v-ripple
          class="rounded"
          min-height="80px"
          max-height="98px"
          max-width="100px"
          aspect-ratio="1.4"
          :src="productInfo.image"
        ></v-img>
      </v-col>
      <v-col md="3" cols="6">
        <p class="mb-0 d-flex">{{ productInfo.productName }}</p>
        <p class="text-caption primary--text mb-0">{{ productInfo.companyName }}</p>
      </v-col>
      <v-col class="d-flex justify-center" md="3" cols="5">
        <v-responsive max-width="150px">
          <AddButtonWithCounter v-model="cartItemCount" />
        </v-responsive>
      </v-col>
      <v-col md="2" cols="7" class="d-flex justify-end">
        <p class="primary--text mb-0 text-body-1 font-weight-medium">{{ productInfo.pricePerUnit }} ₺</p>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import AddButtonWithCounter from '../input/AddButtonWithCounter.vue';
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
  },

};
</script>

<style>
</style>