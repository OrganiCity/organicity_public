<template>
  <v-container>
    <v-row v-for="(example, index) in examples" :key="index">
      <v-col>
        {{ example }}
      </v-col>
    </v-row>
    <v-row justify-content="left">
      <v-col lg="3">
        
      </v-col>
      <v-col lg="6" md="8" xs="12">
        <CarouselSlider/>
      </v-col>
      <v-col lg="2" justify-content="flex-start" >
        <SpecialDeals/>
      </v-col>
    </v-row>
    
  </v-container>
</template>

<script>
import axios from "axios"
import CarouselSlider from "~/components/main-page/CarouselSlider.vue";
import SpecialDeals from "~/components/main-page/SpecialDeals.vue";
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
  }
 
};
</script>