<template>
  <v-container class="pa-0 ma-0">  
    <v-row class="my-4">
      <v-col cols="12" class="d-flex justify-center">
        <p class="text-h4 pa-0">Adreslerim</p>
      </v-col>

      <!-- Delivery Info -->
      <v-col md="6" cols="12">
        <p class="text-h6 mb-1" style="text-align: center">Teslimat Adreslerim</p>
        <v-btn style="text-transform: none" block elevation="0" outlined color="primary" @click="deliveryDialog=true">
          <v-icon size="20px">add</v-icon>
          Yeni Teslimat Adresi Ekle
        </v-btn>

        <AddressCard v-for="address in deliveryAddresses" :key="address.ID" :address="address" @delete="loadAddresses"/>
      </v-col>

      <!-- Billing Info -->
      <v-col md="6" cols="12">
        <p class="text-h6 mb-1" style="text-align: center">Fatura Adreslerim</p>
        <v-btn style="text-transform: none" block elevation="0" outlined color="primary" @click="billingDialog=true">
          <v-icon size="20px">add</v-icon>
          Yeni Fatura Adresi Ekle
        </v-btn>

        <AddressCard v-for="address in billingAddresses" :key="address.ID" :address="address" @delete="loadAddresses"/>
      </v-col>
    </v-row>
    <v-dialog v-model="deliveryDialog" overlay-color="secondary" max-width="700px">
      <AddressDialogMenu :address="deliveryTemplate" @close="deliveryDialog=false; loadAddresses();"/>
    </v-dialog>
    <v-dialog v-model="billingDialog" overlay-color="secondary" max-width="700px">
      <AddressDialogMenu :address="billingTemplate" @close="billingDialog=false; loadAddresses();"/>
    </v-dialog>
  </v-container>
</template>



<script>
import AddressCard from "~/components/account/AddressCard.vue";
import AddressDialogMenu from "~/components/account/AddressDialogMenu.vue"
export default {
  layout: "account",
  components: {
    AddressCard,
    AddressDialogMenu,
  },
  data: () => ({
    deliveryDialog: false,
    billingDialog: false,
    deliveryTemplate:{},
    billingTemplate:{},
    deliveryAddresses:[],
    billingAddresses:[],
  }),
  methods: {
    loadAddresses() {
      this.$api("getAddresses", {userID: this.$store.getters["auth/userInfo"].userID, type:'delivery'}).then(({ data }) => {
        this.deliveryAddresses = data;
      });
      this.$api("getAddresses", {userID: this.$store.getters["auth/userInfo"].userID, type:'billing'}).then(({ data }) => {
        this.billingAddresses = data;
      });
    }
  },
  mounted() {
    this.loadAddresses();
    this.deliveryTemplate = {userID: this.$store.getters["auth/userInfo"].userID, addressType:'delivery'};
    this.billingTemplate = {userID: this.$store.getters["auth/userInfo"].userID, addressType:'billing'};
  },
};
</script>
