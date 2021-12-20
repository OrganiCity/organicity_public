<template>
  <v-row class="">
    <v-col v-if="order.imgURLs.length < 4" cols="4" md="2" class="pa-0 ma-0">
      <v-avatar :class="'ml-'+6*idx" v-for="(img, idx) in order.imgURLs" :key="img" style="position: absolute; border: 1px solid #00000020">
        <img :src="img" />
      </v-avatar>
    </v-col>
     <v-col v-else cols="4" md="2" class="pa-0 ma-0">
      <v-avatar :class="'ml-'+6*(idx-1)" v-for="idx in 2" :key="idx" style="position: absolute; border: 1px solid #00000020">
        <img :src="order.imgURLs[idx-1]" />
      </v-avatar>
      <v-avatar color="primary"  class="ml-12" style="position: absolute; border: 1px solid #00000020">
        <span class="white--text text-h5">+{{order.imgURLs.length-2}}</span>
      </v-avatar>
    </v-col>
    <v-col cols="8" md="3" class="py-0 my-0 mt-2">
      <p class="mb-2">
        <span class="grey--text text-caption">Sipariş No</span>
        <span class="text-body-2">{{ orderNumber }}</span>
      </p>
      <p class="mb-0">
        <span class="grey--text text-caption">{{ order.orderDate.substr(0, 10) }}</span>
      </p>
    </v-col>

    <v-col
      cols="10"
      md="6"
      :class="$vuetify.breakpoint.mdAndUp ? '' : 'mt-4'"
      class="d-flex justify-space-between align-center py-0"
    >
      <p v-if="order.status" class="text-body-2">
        <v-avatar size="20px">
          <v-icon x-small class="primary" color="white">check</v-icon>
        </v-avatar>
        Sipariş Tamamlandı
      </p>
      <p v-else class="text-body-2">
        <v-icon color="warning">pending</v-icon>
        In Progress
      </p>

      <div>
        <p class="primary--text text-body-1 font-weight-medium">{{ order.orderTotal }} TL</p>
        <p v-if="order.fastShipment" class="grey--text text-caption mb-0">Hızlı Kargo: 20 TL&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
        <p v-else class="grey--text text-caption mb-0">Standart Kargo: 10 TL</p>
        <p class="grey--text text-caption mb-0">Kredi Kartı</p>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    orderNumber: 0,
    order: {},
  },
};
</script>

<style>
</style>