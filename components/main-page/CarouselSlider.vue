
#Carousels
The v-carousel component is used to display large numbers of visual content on a rotating timer.

#Usage
The v-carousel component expands upon v-window by providing additional features targeted at displaying images.

<template>
<v-card elevation="0">
  <v-carousel cycle height="auto" v-model="model" show-arrows-on-hover> <!--  You can control carousel with model. + - -->
    <v-carousel-item
      v-for="(item,i) in items"
      :key="i"
      :src = item.src
      :to="item.route"
    >
    </v-carousel-item>
  </v-carousel>


</v-card>
    
</template>


<script>
export default {
  data() {
    return {
      items: [],
    };
  },
   mounted() {
    this.$api("getFeaturedImages").then(({ data }) => { this.items = data })
  },  
};
</script>