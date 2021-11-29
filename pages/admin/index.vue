<template>
  <v-container>
    <v-tabs v-model="tab">
      <v-tab>Categories</v-tab>
      <v-tab>Main Carousel</v-tab>
      <v-tab>Special Deals</v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item>
        <CategoryManager/>
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
import CategoryManager from '~/components/admin/CategoryManager.vue';

export default {
  components: { CarouselManager, SpecialDealsManager, CategoryManager },
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