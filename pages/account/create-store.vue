<template>
  <v-row class="my-6">
    <v-col class="d-flex justify-center">
      <p class="text-h4 pa-0">Hesabım</p>
    </v-col>

    <!-- Personal Info -->
    <v-col cols="12" class="d-flex justify-center">
      <v-card elevation="0" outlined class="px-8 py-5" max-width="500px">
        <v-card-title class="pa-0 ma-1">Profil Bilgileri</v-card-title>
        <v-card-subtitle class="pa-0 ma-1 mb-10">
          OrganiKent’deki deneyiminizi en iyi seviyede tutabilmemiz için gereken bilgilerinizi buradan düzenleyebilirsiniz.
        </v-card-subtitle>
        <v-row class="d-flex justify-center mt-2">
          <!-- Name -->

          <v-col class="py-0" md="6" cols="12">
            <p class="text-body-2 mb-1">Name</p>
            <v-text-field :value="$store.getters['auth/userInfo'].firstName" outlined></v-text-field>
          </v-col>
          <v-col class="py-0" md="6" cols="12">
            <p class="text-body-2 mb-1">Surname</p>
            <v-text-field :value="$store.getters['auth/userInfo'].lastName" outlined></v-text-field>
          </v-col>
          <v-divider class="pa-3 ma-3"></v-divider>
          <!-- Birth -->

          <v-col class="py-0" cols="12">
            <p class="text-body-2 mb-1">Company Name</p>
            <v-text-field value="Bizim Çiftlik" outlined></v-text-field>
          </v-col>
          <v-divider class="pa-3 ma-3"></v-divider>
          <v-col class="py-0" cols="12">
            <p class="text-body-2 mb-1">Tax Number</p>
            <v-text-field value="1234567891011" outlined></v-text-field>
          </v-col>
          <v-col cols="12" class="d-flex justify-center pt-0">
            <v-btn block elevation="0" max-width="400px" class="primary--text" color="secondary">Update</v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-col>

    <!-- Contact Info -->
    <v-col class="d-flex justify-center mt-5">
      <v-card elevation="0" outlined class="px-8 py-5" max-width="500px">
        <v-card-title class="pa-0 ma-1">Banka Hesap Bilgileri</v-card-title>
        <v-card-subtitle class="pa-0 ma-1 mb-10">
          OrganiKent’deki deneyiminizi en iyi seviyede tutabilmemiz için gereken bilgilerinizi buradan düzenleyebilirsiniz.
        </v-card-subtitle>
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
          <v-divider class="pa-3 ma-3"></v-divider>
          <v-col class="py-0" cols="12">
            <p class="text-body-2 mb-1">IBAN</p>
            <v-text-field value="TR33 0006 1005 1978 6457 8413 26" outlined></v-text-field>
          </v-col>
          <v-divider class="pa-3 ma-3"></v-divider>

          <v-col class="py-0" cols="12">
            <p class="text-body-2 mb-1">Bank Name</p>
            <v-text-field value="AKBANK T.A.Ş." outlined></v-text-field>
          </v-col>

          <v-col cols="12" class="d-flex justify-center pt-0">
            <v-btn block elevation="0" max-width="400px" class="primary--text" color="secondary">Update</v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>



<script>
export default {
  layout: "account",
  data: () => ({
    date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().substr(0, 10),
    genders: ["Male", "Female", "Do not want to mention"],
    menu: false,
    modal: false,
  }),
};
</script>
