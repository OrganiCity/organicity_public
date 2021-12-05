<template>
  <v-row class="mt-4 mb-1 mx-1">
    <v-col cols="12" v-for="(value, key) in sellerProducts" :key="key">
      <p class="primary--text text-h6 font-weight-medium">Satıcı: {{ value.companyName }}</p>
      <OrderCard
        :products="value.products"
        :names="value.names"
        :prices="value.pricesPerUnit"
        :quantities="value.quantities"
        :imgURLs="value.imgURLs"
        :status="value.status"
      />
    </v-col>

    <v-col cols="12" class="py-0">
      <p class="text-h6 font-weight-medium mb-1 mt-6">Adres Bilgileri</p>
    </v-col>
    <v-col cols="12" sm="6">
      <p class="font-weight-medium text-body-1 ma-0 mb-2">Teslimat Adresi</p>
      <p class="text-caption font-weight-bold ma-0">Evim</p>
      <p class="text-caption ma-0">Xyz Caddesi, Abcd Sokak, No:99, İç Kapı: 11</p>
      <p class="text-caption ma-0">Güllü Bağlar / Pendik / İstanbul</p>
      <p class="text-caption font-weight-bold ma-0">Doğkan Saraç - 905*******84</p>
    </v-col>
    <v-col cols="12" sm="6">
      <p class="font-weight-medium text-body-1 ma-0 mb-2">Fatura Adresi</p>
      <p class="text-caption font-weight-bold ma-0">Evim</p>
      <p class="text-caption ma-0">Xyz Caddesi, Abcd Sokak, No:11, İç Kapı: 11</p>
      <p class="text-caption ma-0">Güllü Bağlar / Pendik / İstanbul</p>
      <p class="text-caption font-weight-bold ma-0">Doğkan Saraç - 905*******84</p>
    </v-col>
  </v-row>
</template>

<script>
import OrderCard from "~/components/account/OrderCard.vue";
export default {
  components: {
    OrderCard,
  },
  data() {
    return {
      sellerProducts: {},
    };
  },
  props: {
    orderNumber: 0,
  },
  mounted() {
    this.$api("getOrderDetailsByOrderNumber", this.orderNumber).then(({ data }) => {
      this.sellerProducts = data;
    });
  },
};
</script>

<style>
</style>