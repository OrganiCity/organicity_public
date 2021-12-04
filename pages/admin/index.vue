<template>
  <v-container>
    <v-tabs fixed-tabs v-model="tab">
      <v-tab>Categories</v-tab>
      <v-tab>Main Carousel</v-tab>
      <v-tab>Special Deals</v-tab>
      <v-tab>User / Seller</v-tab>
      <v-tab>CertifIcates</v-tab>
      <v-tab>Order / Shipper</v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item>
        <CategoryManager />
      </v-tab-item>

      <v-tab-item>
        <v-card><CarouselManager /></v-card>
      </v-tab-item>
      <v-tab-item>
        <SpecialDealsManager />
      </v-tab-item>
      <v-tab-item>
        <UserManager />
        <SellerManager />
      </v-tab-item>
      <v-tab-item> <CertificateManager/> </v-tab-item>
      <v-tab-item>
        <OrderManager />
        <ShipperManager />
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script>
import CarouselManager from "~/components/admin/CarouselManager.vue";
import SpecialDealsManager from "~/components/admin/SpecialDealsManager.vue";
import CategoryManager from "~/components/admin/CategoryManager.vue";
import UserManager from "~/components/admin/advanced/UserManager.vue";
import SellerManager from "~/components/admin/advanced/SellerManager.vue";
import OrderManager from "~/components/admin/advanced/OrderManager.vue";
import ShipperManager from "~/components/admin/advanced/ShipperManager.vue";
import CertificateManager from '~/components/admin/advanced/CertificateManager.vue';

export default {
  components: { CarouselManager, SpecialDealsManager, CategoryManager, UserManager, SellerManager, OrderManager, ShipperManager, CertificateManager },
  layout: "admin",
  data() {
    return {
      tab: 0,
    };
  },
};
</script>

<style>
</style>