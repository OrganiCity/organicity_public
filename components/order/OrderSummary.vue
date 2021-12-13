<template>
  <v-card class="pa-4">
    <p class="text-h5 ma-0">Sipariş Özeti</p>
    <p class="text-body-2 mb-0">2 Ürün</p>
    <v-divider class="my-4"></v-divider>
    <div class="d-flex justify-space-between">
      <span class="text-body-2">Sipariş Tutarı</span>
      <span class="text-body-2 font-weight-medium">{{ totalCartPrice }} ₺</span>
    </div>

    <div class="d-flex justify-space-between">
      <span class="text-body-2">Kargo Ücreti</span>
      <span class="text-body-2 font-weight-medium">10,00 TL</span>
    </div>

    <div class="d-flex justify-space-between mt-6">
      <span class="text-body-2 mb-0 font-weight-medium">Toplam Tutar</span>
      <span class="text-body-2 primary--text font-weight-medium">{{ totalPrice }} ₺</span>
    </div>

    <div class="d-flex justify-space-between mb-4">
      <span class="text-body-2 mb-0 font-weight-medium">Ödenecek Tutar</span>
      <span class="text-body-2 primary--text font-weight-medium">{{ totalPrice }} ₺</span>
    </div>

    <!-- <v-btn elevation="0" color="primary" block>Sıradaki Adım</v-btn> -->
  </v-card>
</template>

<script>
export default {
  props: ["total-cart-price"],
  computed: {
    totalPrice() {
      return this.totalCartPrice + 10
    },
    cartData() {
      return this.$store.getters['cart/items']
    }
  }
};
</script>

<style>
</style>