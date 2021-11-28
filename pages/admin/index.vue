<template>
  <v-container>
    <v-tabs v-model="tab">
      <v-tab>Categories</v-tab>
      <v-tab>Main Carousel</v-tab>
      <v-tab>Special Deals</v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item>
        Categories
      </v-tab-item>

      <v-tab-item>
        <v-card><CarouselManager/></v-card>
      </v-tab-item>
      <v-tab-item>
        <SpecialDealsManager/>       
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script>
import CarouselManager from '~/components/admin/CarouselManager.vue';
import SpecialDealsManager from '~/components/admin/SpecialDealsManager.vue';
export default {
  components: { CarouselManager, SpecialDealsManager },
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