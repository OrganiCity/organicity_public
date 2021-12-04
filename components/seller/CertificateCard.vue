<template>
  <div>
    <div class="d-flex justify-end">
      <v-btn icon @click.stop="dialog = true" class="contrast" absolute style="z-index: 1">
        <v-icon>mdi-pencil-outline</v-icon>
      </v-btn>
      <v-dialog v-model="dialog" max-width="600">
        <v-card class="pa-6 py-10">
          <v-text-field autocomplete="off" v-model="document" label="Document URL" required outlined></v-text-field>
          <v-btn @click="updateMyCertificate" block color="primary">Update the Document URL</v-btn>
          <div class="d-flex justify-between align-center my-4">
            <v-divider></v-divider>
            <p class="mb-0 mx-4 font-weight-medium">OR</p>
            <v-divider></v-divider>
          </div>
          <div class="d-flex justify-center">
            <v-btn rounded outlined plain color="error" @click="deleteMyCertificate">
              <v-icon left>delete_outline</v-icon>
              Delete the CertIfIcate
            </v-btn>
          </div>
        </v-card>
      </v-dialog>
    </div>
    <v-card :color="cardColor" class="ma-2">
      <v-card-title>{{ name }}</v-card-title>

      <a :href="document" target="_blank">
        <v-responsive width="400" max-height="300">
          <zoom-on-hover style="cursor: zoom-in" :img-normal="document"></zoom-on-hover>
        </v-responsive>
      </a>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
    };
  },
  props: {
    cID: null,
    name: "",
    document: "",
    cardColor: "",
  },
  methods: {
    deleteMyCertificate() {
      this.$api("deleteCertificate", { cID: this.cID, sellerID: this.$store.getters["auth/userInfo"].userID }).then(
        window.location.reload()
      );
    },
    updateMyCertificate() {
      this.$api("updateCertificate", {
        document: this.document,
        cID: this.cID,
        sellerID: this.$store.getters["auth/userInfo"].userID
      }).then(window.location.reload());
    },
  },
};
</script>

<style>
</style>