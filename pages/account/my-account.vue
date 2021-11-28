<template>
  <v-row class="my-4">
    <v-col class="d-flex justify-center">
      <p class="text-h4 pa-0">Hesabım</p>
    </v-col>

    <!-- Personal Info -->
    <v-col cols="12" class="d-flex justify-center">
      <v-card elevation="0" outlined class="px-8 py-5" max-width="500px">
        <v-card-title class="pa-0">Profil Bilgileri</v-card-title>
        <v-card-subtitle class="pa-0 mt-1 mb-10">
          OrganiKent’deki deneyiminizi en iyi seviyede tutabilmemiz için gereken bilgilerinizi buradan düzenleyebilirsiniz.
        </v-card-subtitle>
        <v-row class="d-flex justify-center mt-2">
          <!-- Name -->

          <v-col class="pa-0 px-3" md="6" cols="12">
            <p class="text-body-2 mb-1">Name</p>
            <v-text-field :value="$store.getters['auth/userInfo'].firstName" outlined></v-text-field>
          </v-col>
          <v-col class="pa-0 px-3" md="6" cols="12">
            <p class="text-body-2 mb-1">Surname</p>
            <v-text-field :value="$store.getters['auth/userInfo'].lastName" outlined></v-text-field>
          </v-col>
          <v-divider class="py-3 mx-3"></v-divider>
          <!-- Birth -->

          <v-col cols="12" class="py-0">
            <p class="text-body-2 mb-1">Date of Birth</p>
            <v-dialog ref="dialog" v-model="modal" :return-value.sync="date" persistent width="290px">
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="date"
                  prepend-inner-icon="mdi-calendar"
                  readonly
                  outlined
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="date" color="primary" scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="modal = false">Cancel</v-btn>
                <v-btn text color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
              </v-date-picker>
            </v-dialog>
          </v-col>
          <v-divider class="py-3 mx-3"></v-divider>
          <v-col cols="12" class="py-0">
            <p class="text-body-2 mb-1">Gender</p>
            <v-select :items="genders" value="Male" outlined></v-select>
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
        <v-card-title class="pa-0">İletişim Bilgileri</v-card-title>
        <v-card-subtitle class="pa-0 mt-1 mb-10">
          OrganiKent’deki deneyiminizi en iyi seviyede tutabilmemiz için gereken bilgilerinizi buradan düzenleyebilirsiniz.
        </v-card-subtitle>
        <v-row class="d-flex justify-center mt-2">
          <!-- Name -->

          <v-col class="pa-0 px-3" cols="12">
            <p class="text-body-2 mb-1">Phone Number</p>
            <v-text-field value="05459502784" outlined></v-text-field>
          </v-col>
          <v-divider class="py-3 ma-3"></v-divider>

          <v-col class="pa-0 px-3" cols="12">
            <p class="text-body-2 mb-1">E-Mail Address</p>
            <v-text-field value="dogkansarac@sabanciuniv.edu" outlined></v-text-field>
          </v-col>

          <v-col cols="12" class="d-flex justify-center pt-0">
            <v-btn disabled block elevation="0" max-width="400px" class="primary--text" color="secondary">Update</v-btn>
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
