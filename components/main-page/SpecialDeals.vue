
<template>
  <v-card elevation="0">
    <v-container class="pb-1">
      <p class="text-h6 my-0 font-weight-bold text-center">{{ $i18n("special_deals") }}</p>
      <div class="d-flex justify-center mb-2">
        <v-btn @click="model == 0 ? (model = items.length - 1) : model--" color="primary" icon>
          <v-icon>expand_less</v-icon>
        </v-btn>
      </div>
      <v-carousel
        vertical
        progress
        vertical-delimiters
        continuous
        cycle
        v-model="model"
        hide-delimiters
        height="auto"
        :show-arrows="false"
      >
        <v-carousel-item v-for="(item, i) in items" :key="i" :to="item.route">
          <v-img :aspect-ratio="1" :src="item.src"></v-img>
          <p class="font-weight-medium mt-2" style="text-align: center">
            {{ $store.getters['preferences/language'] === 'TR' ? item.nameTR : item.nameEN }}
          </p>
          <p class="primary--text font-weight-medium" style="text-align: center">{{ item.price }} TL</p>
        </v-carousel-item>
      </v-carousel>
      <div class="d-flex justify-center mt-2">
        <v-btn @click="model++" color="primary" icon>
          <v-icon>keyboard_arrow_down</v-icon>
        </v-btn>
      </div>
    </v-container>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      items: [],
      model: 0,
    };
  },
  mounted() {
    this.$api("getSpecialDeals").then(({ data }) => {
      this.items = data;
    });
  },
};
</script>
</script>
<style>
</style>