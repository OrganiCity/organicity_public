<template>
  <v-container class="pa-0 pt-2">
    <CarouselSlider />
    <v-row v-for="list in lists" :key="list[0].listID" class="mt-2">
      <v-col cols="12">
        <p class="primary--text text-h5 text-center font-weight-medium mb-0">{{list[0].title}}</p>
      </v-col>
      <v-col v-for="product in list" :key="product.productID" cols="6" sm="4">
        <ProductPreview :product-id="product.productID"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CarouselSlider from "~/components/main-page/CarouselSlider.vue";
import SpecialDeals from "~/components/main-page/SpecialDeals.vue";
import CategoryBar from "~/components/ui/CategoryBar.vue";
import ProductPreview from "~/components/product/ProductPreview.vue";

export default {
  data() {
    return {
      lists:[],
    };
  },
  mounted() {
    this.$api("getMainPageItems").then(({ data }) => {
      let group = data.reduce((r, a) => {
        r[a.listID] = [...r[a.listID] || [], a];
        return r;
      }, {});
      this.lists = group;
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