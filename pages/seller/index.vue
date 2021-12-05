<template>
  <v-container>
    <v-tabs fixed-tabs v-model="tab">
      <v-tab>My Products</v-tab>
      <v-tab>MY CERTIFICATES</v-tab>
      <v-tab>My Orders</v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item>
        <MyProducts :products="products" />
      </v-tab-item>
      <v-tab-item>
        <MyCertificates />
      </v-tab-item>
      <v-tab-item>
        <Orders />
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script>
import MyCertificates from '~/components/seller/MyCertificates.vue';
import MyProducts from "~/components/seller/MyProducts.vue";
import Orders from "~/components/seller/Orders.vue";

export default {
  components: { MyProducts, Orders, MyCertificates },
  layout: "admin",
  data() {
    return {
      tab: 0,
      products: [],
    };
  },
  mounted() {
    this.$api("getStoreProducts", { userID: this.$store.getters['auth/userInfo'].userID }).then(({ data }) => {
      console.log(data);
      this.products = data;
    });
  },
};
</script>