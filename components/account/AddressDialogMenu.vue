<template>
  <!-- Address Dialog Menu -->

  
  <v-card :class="$vuetify.breakpoint.smAndDown ? 'px-0 py-4' : 'px-8 py-4'">
    <div class="d-flex justify-end px-0">
      <v-btn icon large absolute @click="dialog = false">
        <v-icon>close</v-icon>
      </v-btn>
    </div>
    <v-card-title class="d-flex justify-center text-h5">Adresi Düzenle</v-card-title>

    <v-card-subtitle class="d-flex justify-center mt-1">
      Lütfen teslimat adres bilgilerinizi belirtin. Sepetinizdeki ürünler bu adresinize gönderilecektir.
    </v-card-subtitle>

    <v-row class="d-flex justify-center mx-1">
      <v-col class="py-0" cols="12">
        <v-text-field label="Address Name *" outlined></v-text-field>
      </v-col>
      <v-col class="py-0" md="6" cols="12">
        <v-text-field label="First Name *" outlined></v-text-field>
      </v-col>
      <v-col class="py-0" md="6" cols="12">
        <v-text-field label="Second Name *" outlined></v-text-field>
      </v-col>
      <v-col class="py-0" md="6" cols="12">
        <v-text-field label="Country *" outlined></v-text-field>
      </v-col>
      <v-col class="py-0" md="6" cols="12">
        <v-text-field label="City *" outlined></v-text-field>
      </v-col>
      <v-col class="py-0" md="6" cols="12">
        <v-text-field label="District" outlined></v-text-field>
      </v-col>
      <v-col class="py-0" md="6" cols="12">
        <v-text-field label="Neighbourhood / ZIP" outlined></v-text-field>
      </v-col>
      <v-col class="py-0" md="6" cols="12">
        <v-text-field label="Street" outlined></v-text-field>
      </v-col>
      <v-col class="py-0" md="6" cols="12">
        <v-text-field label="Building and Flat No" outlined></v-text-field>
      </v-col>
      <v-col class="py-0" cols="12">
        <v-textarea outlined name="input-7-4" label="Description"></v-textarea>
      </v-col>
    </v-row>
    <div class="mx-3">
      <v-btn block elevation="0" color="primary">Kaydet</v-btn>
    </div>
  </v-card>
  
</template>

<script>
export default {
  data: () => ({}),
  props: {
    dialog: false,
    address: {},
  },
};
</script>

<style>
</style>