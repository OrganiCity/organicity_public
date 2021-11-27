<template>
  <v-row class="my-4">
    <v-col cols="12" class="d-flex justify-center">
      <p class="text-h4 pa-0">Adreslerim</p>
    </v-col>

    <!-- Delivery Info -->
    <v-col md="6" cols="12">
      <p class="text-h6 mb-1" style="text-align: center">Teslimat Adreslerim</p>
      <v-btn style="text-transform: none" block elevation="0" outlined color="primary">
        <v-icon size="20px">add</v-icon>
        Yeni Teslimat Adresi Ekle
      </v-btn>

      <AddressCard :address="address" />
    </v-col>

    <!-- Billing Info -->
    <v-col md="6" cols="12">
      <p class="text-h6 mb-1" style="text-align: center">Fatura Adreslerim</p>
      <v-btn style="text-transform: none" block elevation="0" outlined color="primary">
        <v-icon size="20px">add</v-icon>
        Yeni Fatura Adresi Ekle
      </v-btn>
      <v-card outlined class="mt-6">
        <v-card-title class="d-flex justify-space-between text-body-1 font-weight-bold pa-2 ma-0">
          <span class="ma-2">ev</span>
          <div>
            <v-btn small class="pa-0 ma-0" icon>
              <v-icon size="20px">mdi-pencil-outline</v-icon>
            </v-btn>
            <v-btn small class="pa-0 ma-0" icon>
              <v-icon size="20px">delete_outline</v-icon>
            </v-btn>
          </div>
          <p class="text-caption mx-2">Güllü Bağlar Mh. Ulubat Sk. Bina ve Daire No: No:59 Daire:23 Pendik/İstanbul</p>
        </v-card-title>
      </v-card>
    </v-col>
  </v-row>
</template>



<script>
import AddressCard from "~/components/account/AddressCard.vue";
export default {
  layout: "account",
  components: {
    AddressCard,
  },
  data: () => ({
    dialog: false,
    address: {
      toName: "Doğkan",
      toSurname: "Saraç",
      country: "Turkey",
      city: "İstanbul",
      district: "Pendik",
      ZIPorNeighbourhood: "Güllü Bağlar Mah.",
      street: "Ulubat Sk.",
      buildingAndFlatNo: "59/23",
      description: "Büyük sarı bina",
    },
  }),
};
</script>
