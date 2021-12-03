<template>
  <v-card elevation="0">
    <v-carousel
      cycle
      class="featured"
      height="auto"
      hide-delimiter-background
      show-arrows-on-hover
    >
      <!--  You can control carousel with model. + - -->
      <v-carousel-item
        v-for="(item, i) in items"
        :key="i"
        eager
        :to="item.route"
      >
      <v-img eager height="100%"  :src="item.src"></v-img></v-carousel-item>
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
    this.$api("getCarouselSlides").then(({ data }) => {
      this.items = data;
    });
  },
};
</script>

<style scoped>
.featured >>> .v-carousel_controls_item {
  color: white !important;
  background: none !important;
}
.featured >>> .v-carousel__controls__item .v-icon {
  opacity: 1 !important;
}
.featured >>> .v-btn--active {
  color: #2dbd9c !important;
  border: 3px solid white !important;
  background-color: #2dbd9c !important;
}

.featured >>> .v-btn--icon.v-size--small {
  height: 20px !important;
  width: 20px !important;
}
.featured >>> .v-carousel__controls__item .v-btn__content .v-icon {
  font-size: 14px !important;
}
</style>