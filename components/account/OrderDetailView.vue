<template>
  <v-row class="mt-4 mb-1 mx-1">
    <v-col cols="12" v-for="(value, key) in sellerProducts" :key="key">
      <nuxt-link :to="'/store/'+ key">
        <p class="primary--text text-h6 font-weight-medium">Satıcı: {{ value.companyName }}</p>
      </nuxt-link>
      <OrderCard
        :products="value.products"
        :deliveryPerson="deliveryPerson"
        :status="value.status"
      />
    </v-col>

    <v-col cols="12" class="py-0">
      <p class="text-h6 font-weight-medium mb-1 mt-6">Adres Bilgileri</p>
    </v-col>
    <v-col cols="12" sm="6">
      <p class="font-weight-medium text-body-1 ma-0 mb-2">Teslimat Adresi</p>
      <p class="text-caption font-weight-bold ma-0">{{deliveryAddressName}}</p>
      <p class="text-caption ma-0">{{deliveryAddress}}</p>
      <p class="text-caption font-weight-bold ma-0">{{deliveryPerson}}</p>
    </v-col>
    <v-col cols="12" sm="6">
      <p class="font-weight-medium text-body-1 ma-0 mb-2">Fatura Adresi</p>
      <p class="text-caption font-weight-bold ma-0">{{billingAddressName}}</p>
      <p class="text-caption ma-0">{{billingAddress}}</p>
      <p class="text-caption font-weight-bold ma-0">{{billingPerson}}</p>
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
      deliveryAddressName: "",
      deliveryAddress: "",
      deliveryPerson: "",
      billingAddressName: "",
      billingAddress: "",
      billingPerson: "",
    };
  },
  props: {
    orderNumber: 0,
  },
  mounted() {
    this.$api("getOrderDetailsByOrderNumber", this.orderNumber).then(({ data }) => {
      this.sellerProducts = data.sellers;
      this.deliveryAddressName = data.deliveryAddressName
      this.deliveryAddress = data.deliveryAddress
      this.deliveryPerson = data.deliveryPerson
      this.billingAddressName = data.billingAddressName
      this.billingAddress = data.billingAddress
      this.billingPerson = data.billingPerson
    });
  },
};
</script>

<style>
</style>