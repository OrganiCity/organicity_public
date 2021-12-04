<template>
  <v-container>
    <v-dialog max-width="600">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on">Add new certIfIcate</v-btn>
      </template>
      <v-card color="pa-4">
        <p class="primary--text text-h4 text-center">Add New Certificate</p>
        <p>Below you can see the available certificates to request an approval</p>
        <v-chip-group  mandatory column active-class="primary--text">
          <v-chip @click="cID=certificate.cID" large filter v-for="certificate in available" :key="certificate.cID">
            {{ certificate.cName }} 
          </v-chip>
        </v-chip-group>
        <p> {{cID}} </p>
        <v-text-field autocomplete="off" v-model="document" label="Document URL" required outlined></v-text-field>
        <v-btn @click="sendCertificateApprovalRequest" block color="primary">Request an approval</v-btn>
      </v-card>
    </v-dialog>

    <v-row class="mt-4">
      <v-col cols="12">
        <p class="primary--text text-h5">
          <v-icon color="primary">check_circle_outline</v-icon>
          Approved
        </p>
      </v-col>
      <v-col v-for="certificate in approved" :key="certificate.cID" cols="3">
        <CertificateCard :name="certificate.cName" :document="certificate.document" />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <p class="warning--text text-h5">
          <v-icon color="warning">pending</v-icon>
          Pending
        </p>
      </v-col>
      <v-col v-for="certificate in pending" :key="certificate.cID" cols="3">
        <CertificateCard :name="certificate.cName" :document="certificate.document" />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <p class="error--text text-h5">
          <v-icon color="error">cancel</v-icon>
          Declined
        </p>
      </v-col>
      <v-col v-for="certificate in declined" :key="certificate.cID" cols="3">
        <CertificateCard :name="certificate.cName" :document="certificate.document" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CertificateCard from "./CertificateCard.vue";
export default {
  components: { CertificateCard },
  data() {
    return {
      approved: [],
      pending: [],
      declined: [],
      available: [],
      cID: null,
      document: "",
      dialog: false,
    };
  },
  methods: {
    sendCertificateApprovalRequest() {
      this.$api("sendCertificateApprovalRequest", {
        cID: this.cID,
        sellerID: this.$store.getters["auth/userInfo"]?.userID,
        document: this.document,
      }).then((window.location.reload()));
    },
  },
  mounted() {
    this.$api("getCertificatesBySellerID", this.$store.getters["auth/userInfo"]?.userID).then(({ data }) => {
      console.log(data);
      let approved = data.reduce((approved, thing) => {
        if (thing.approved == "a") {
          approved.push(thing);
        }
        return approved;
      }, []);
      let pending = data.reduce((pending, thing) => {
        if (thing.approved == "p") {
          pending.push(thing);
        }
        return pending;
      }, []);
      let declined = data.reduce((declined, thing) => {
        if (thing.approved == "d") {
          declined.push(thing);
        }
        return declined;
      }, []);

      this.approved = approved;
      this.pending = pending;
      this.declined = declined;

      this.$api("getAvailableCertificatesBySellerID", this.$store.getters["auth/userInfo"]?.userID).then(({ data }) => {
        this.available = data;
      });
    });
  },
};
</script>

<style>
</style>