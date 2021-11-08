
<template>
  <v-card elevation="0">
    <v-row class="text-h6 font-weight-bold" align="center" justify="center">
      <p>{{ $i18n("special_deals") }}</p>
    </v-row>
    <v-row class="pb-4" justify="center">
      <v-btn @click="model == 0 ? (model = items.length - 1) : model--" color="primary" icon>
        <v-icon>expand_less</v-icon>
      </v-btn>
    </v-row>
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
        <v-row  class="pt-4 font-weight-medium" align="center" justify="center">
          <p style="width: 150px; text-align: center" v-if="$store.getters['preferences/language'] === 'TR'">{{ item.nameTR }}</p>
          <p style="width: 150px; text-align: center" v-else>{{ item.nameEN }}</p>
        </v-row>
        <v-row class="pb-2 font-weight-bold primary--text"  justify="center">
          <p style="text-align: center">{{ item.price }} TL</p>
        </v-row>
      </v-carousel-item>
    </v-carousel>
    <v-row class="pa-4" justify="center">
      <v-btn @click="model++" color="primary" icon>
        <v-icon>keyboard_arrow_down</v-icon>
      </v-btn>
    </v-row>
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