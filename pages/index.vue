<template>
  <v-container class="pa-0 pt-2">
    <CarouselSlider />
    <v-row class="mt-2">
      <v-col v-for="i in 5" :key="i" cols="6" sm="4"><ProductPreview /></v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import CarouselSlider from "~/components/main-page/CarouselSlider.vue";
import SpecialDeals from "~/components/main-page/SpecialDeals.vue";
import CategoryBar from "~/components/ui/CategoryBar.vue";
import ProductPreview from "~/components/product/ProductPreview.vue";
export default {
  data() {
    return {
      examples: [],
    };
  },
  mounted() {
    this.$api("getFeatured").then(({ data }) => {
      this.examples = data.map((e) => e.firstName + e.lastName);
    });
  },
  components: {
    CarouselSlider,
    SpecialDeals,
    CategoryBar,
    ProductPreview,
  },
};
</script>