<template>
  <v-container>
    <v-tabs v-model="tab">
      <v-tab>My Products</v-tab>
      <v-tab>Another Tab</v-tab>
      <v-tab>Orders</v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item>
        My Products
      </v-tab-item>

      <v-tab-item>
        Another Tab
      </v-tab-item>
      <v-tab-item>
        Orders   
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script>

export default {
  components: {  },
  layout:"admin",
  data () {
    return {
      tab: 0,
    };
  },
}
</script>

<style>

</style>