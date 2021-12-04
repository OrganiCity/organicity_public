<template>
  <v-row class="">
    <v-col cols="4" md="2" class="pa-0 ma-0">
      <v-avatar style="position: absolute; border: 1px solid #00000020">
        <img src="https://www.greenada.com/Uploads/UrunResimleri/buyuk/greenadadomates-1-kg-e162.jpg" />
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
      <p v-if="order.status.every(defineStatus)" class="text-body-2">
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
        <p class="grey--text text-caption mb-0">Standart Kargo: 10 TL</p>
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
  methods: {
    defineStatus(status) {
      return status == "arrived";
    },
  },
  // computed (){
  //   this.status = order.status.every(defineStatus)
  //   console.log(this.status)
  // }
};
</script>

<style>
</style>