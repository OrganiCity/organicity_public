<template>
  <v-container>
    <v-row>
      <!-- <v-col lg="3" md="4" v-if="$vuetify.breakpoint.mdAndUp">
        <CategoryBar/>
        <SpecialDeals class="mx-8 my-8" v-if="$vuetify.breakpoint.md"/>
      </v-col> -->
      <v-col>
        <CarouselSlider/>
        <v-row class="mt-2">  
          <v-col v-for="i in 5" :key="i" cols="6" sm="4"><ProductPreview/></v-col>
        </v-row>
      </v-col>
      <!-- <v-col class="pt-5" cols="2" v-if="$vuetify.breakpoint.lgAndUp">
          <SpecialDeals/>
      </v-col> -->
    </v-row>
    
  </v-container>
</template>

<script>
import axios from "axios"
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
    this.$api("getFeatured").then(({ data }) => { this.examples = data.map((e) => e.firstName + e.lastName) })
  },
  components: {
    CarouselSlider,
    SpecialDeals,
    CategoryBar,
    ProductPreview
  }
 
};
</script>