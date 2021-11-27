<template>
  <v-row class="my-4 d-flex justify-center">
    <v-col class="d-flex justify-center">
      <p class="text-h4 pa-0">Mağaza Aboneliği</p>
    </v-col>

    <!-- Store Info -->
    <v-col cols="12" class="d-flex justify-center">
      <v-card elevation="0" outlined class="px-8 pt-4" max-width="500px">
        <v-card-title class="pa-0 pb-2">Mağaza Bilgileri</v-card-title>
        <v-row class="d-flex justify-center mt-2">
          <!-- Name -->

          <v-col class="py-0" md="6" cols="12">
            <p class="text-body-2 mb-1">Company Name</p>
            <v-text-field value="Bizim Çiftlik" outlined></v-text-field>
          </v-col>

          <v-col class="py-0" md="6" cols="12">
            <p class="text-body-2 mb-1">Tax Number</p>
            <v-text-field value="1234567891011" outlined></v-text-field>
          </v-col>
          <v-col cols="12" class="pa-0 ma-0">
            <v-divider class="py-3 mx-3"></v-divider>
          </v-col>

          <!-- Address -->
          <v-col class="py-0" md="6" cols="12">
            <p class="text-body-2 mb-1">Company Country</p>
            <v-text-field value="Turkey" outlined></v-text-field>
          </v-col>

          <v-col class="py-0" md="6" cols="12">
            <p class="text-body-2 mb-1">Company City</p>
            <v-text-field value="İstanbul" outlined></v-text-field>
          </v-col>
          <v-col class="py-0 my-0">
            <p class="text-body-2 mb-1">Company Address</p>
            <v-textarea
              class="pa-0 ma-0"
              outlined
              name="input-7-4"
              value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
            ></v-textarea>
          </v-col>
        </v-row>
      </v-card>
    </v-col>

    <!-- Bank Info -->
    <v-col class="d-flex justify-center mt-5" cols="12">
      <v-card elevation="0" outlined class="px-8 pt-4" max-width="500px">
        <v-card-title class="pa-0 pb-2">Banka Hesap Bilgileri</v-card-title>
        <v-row class="d-flex justify-center mt-2">
          <!-- Name -->
          <v-col class="py-0" md="6" cols="12">
            <p class="text-body-2 mb-1">Owner Name</p>
            <v-text-field :value="$store.getters['auth/userInfo'].firstName" outlined></v-text-field>
          </v-col>
          <v-col class="py-0" md="6" cols="12">
            <p class="text-body-2 mb-1">Owner Surname</p>
            <v-text-field :value="$store.getters['auth/userInfo'].lastName" outlined></v-text-field>
          </v-col>
          <v-divider class="py-3 mx-3"></v-divider>
          <v-col class="py-0" cols="12">
            <p class="text-body-2 mb-1">IBAN</p>
            <v-text-field value="TR33 0006 1005 1978 6457 8413 26" outlined></v-text-field>
          </v-col>
          <v-divider class="py-3 mx-3"></v-divider>

          <v-col class="py-0" cols="12">
            <p class="text-body-2 mb-1">Bank Name</p>
            <v-text-field value="AKBANK T.A.Ş." outlined></v-text-field>
          </v-col>
        </v-row>
      </v-card>
    </v-col>

    <v-responsive class="mx-2" max-width="500px">
      <v-btn block elevation="0" color="primary">Mağaza Aboneliğimi Başlat</v-btn>
    </v-responsive>
  </v-row>
</template>



<script>
export default {
  layout: "account",
  data: () => ({
    name: null,
    date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().substr(0, 10),
    genders: ["Male", "Female", "Do not want to mention"],
    menu: false,
    modal: false,
  }),
};
</script>
