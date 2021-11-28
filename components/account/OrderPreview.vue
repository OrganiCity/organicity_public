<template>
  <v-row class="">
    <v-col cols="4" md="2" class="pa-0 ma-0" >
      <v-avatar style="position: absolute; border: 1px solid #00000020">
        <img src="https://www.greenada.com/Uploads/UrunResimleri/buyuk/greenadadomates-1-kg-e162.jpg" />
      </v-avatar>

      <v-avatar style="position: absolute; border: 1px solid #00000020" class="ml-6">
        <img src="https://www.greenada.com/Uploads/UrunResimleri/buyuk/greenadadomates-1-kg-e162.jpg" />
      </v-avatar>
    </v-col>
    <v-col cols="8" md="3" class="py-0 my-0 mt-2" >
      <p class="mb-2">
        <span class="grey--text text-caption">Sipariş No</span>
        <span class="text-body-2">781 242 576</span>
      </p>
      <p class="mb-0">
        <span class="grey--text text-caption">3 Ağustos Sal, 13:11</span>
      </p>
    </v-col>

    <v-col cols="10" md="6" :class="$vuetify.breakpoint.mdAndUp ? '' :'mt-4'" class="d-flex justify-space-between align-center py-0">
      <p class="text-body-2">
        <v-avatar size="20px">
          <v-icon x-small class="primary" color="white">check</v-icon>
        </v-avatar>
        Sipariş Tamamlandı
      </p>

      <div>
        <p class="primary--text text-body-1 font-weight-medium">425,95 TL</p>
        <p class="grey--text text-caption mb-0">Aras Kargo: 11,95 TL</p>
        <p class="grey--text text-caption mb-0">Kredi Kartı</p>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {};
</script>

<style>
</style>