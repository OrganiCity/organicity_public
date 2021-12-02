<template>
  <v-container>
    <v-tabs v-model="tab">
      <v-tab>My Products</v-tab>
      <v-tab>Another Tab</v-tab>
      <v-tab>Orders</v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item>
        <MyProducts/>
      </v-tab-item>

      <v-tab-item>
        Another Tab
      </v-tab-item>
      <v-tab-item>
        <Orders/>  
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script>
import MyProducts from '~/components/seller/MyProducts.vue';
import Orders from '~/components/seller/Orders.vue';

export default {
  components: {MyProducts, Orders  },
  layout:"admin",
  data () {
    return {
      tab: 0,
    };
  },
}
</script>