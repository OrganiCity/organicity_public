<template>
  <v-card class="pa-4">
    <p class="text-h5 ma-0">Sipariş Özeti</p>
    <p class="text-body-2 mb-0">2 Ürün</p>
    <v-divider class="my-4"></v-divider>
    <div class="d-flex justify-space-between">
      <span class="text-body-2">Sipariş Tutarı</span>
      <span class="text-body-2 font-weight-medium">75,00 TL</span>
    </div>

    <div class="d-flex justify-space-between">
      <span class="text-body-2">Kargo Ücreti</span>
      <span class="text-body-2 font-weight-medium">10,00 TL</span>
    </div>

    <div class="d-flex justify-space-between mt-6">
      <span class="text-body-2 mb-0 font-weight-medium">Toplam Tutar</span>
      <span class="text-body-2 primary--text font-weight-medium">85,00 TL</span>
    </div>

    <div class="d-flex justify-space-between mb-4">
      <span class="text-body-2 mb-0 font-weight-medium">Ödenecek Tutar</span>
      <span class="text-body-2 primary--text font-weight-medium">85,00 TL</span>
    </div>

    <v-btn elevation="0" color="primary" block>Siparişi Tamamla</v-btn>
  </v-card>
</template>

<script>
export default {};
</script>

<style>
</style>