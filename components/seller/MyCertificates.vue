<template>
  <v-container>
    <v-btn color="primary">request an approval</v-btn>
    <v-row class="mt-4">
      <v-col cols="12">
        <p class="primary--text text-h5">
          <v-icon color="primary">check_circle_outline</v-icon>
          Approved
        </p>
      </v-col>
      <v-col cols="3"><CertificateCard /></v-col>
      <v-col cols="3"><CertificateCard /></v-col>
      <v-col cols="3"><CertificateCard /></v-col>
      <v-col cols="3"><CertificateCard /></v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <p class="warning--text text-h5">
          <v-icon color="warning">pending</v-icon>
          Pending
        </p>
      </v-col>
      <v-col cols="3"><CertificateCard /></v-col>
      <v-col cols="3"><CertificateCard /></v-col>
      <v-col cols="3"><CertificateCard /></v-col>
      <v-col cols="3"><CertificateCard /></v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <p class="error--text text-h5">
          <v-icon color="error">cancel</v-icon>
          Declined
        </p>
      </v-col>
      <v-col cols="3"><CertificateCard /></v-col>
      <v-col cols="3"><CertificateCard /></v-col>
      <v-col cols="3"><CertificateCard /></v-col>
      <v-col cols="3"><CertificateCard /></v-col>
    </v-row>
  </v-container>
</template>

<script>
import CertificateCard from "./CertificateCard.vue";
export default {
  components: { CertificateCard },
};
</script>

<style>
</style>