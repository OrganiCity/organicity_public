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

    <v-row v-if="approved.length" class="mt-4">
      <v-col cols="12">
        <p class="primary--text text-h5">
          <v-icon color="primary">check_circle_outline</v-icon>
          Approved
        </p>
      </v-col>
      <v-col v-for="certificate in approved" :key="certificate.cID" cols="4">
        <CertificateCard :cID="certificate.cID" :name="certificate.cName" :document="certificate.document" :cardColor="'secondary'" />
      </v-col>
    </v-row>
    <v-row v-if="pending.length">
      <v-col cols="12">
        <p class="warning--text text-h5">
          <v-icon color="warning">pending</v-icon>
          Pending
        </p>
      </v-col>
      <v-col v-for="certificate in pending" :key="certificate.cID" cols="4">
        <CertificateCard :cID="certificate.cID" :name="certificate.cName" :document="certificate.document" :cardColor="'#ffcc80'" />
      </v-col>
    </v-row>
    <v-row v-if="declined.length">
      <v-col cols="12">
        <p class="error--text text-h5">
          <v-icon color="error">cancel</v-icon>
          Declined
        </p>
      </v-col>
      <v-col  v-for="certificate in declined" :key="certificate.cID" cols="4">
        <CertificateCard :cID="certificate.cID" :name="certificate.cName" :document="certificate.document" :cardColor="'#e57373 '" />
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
      data.forEach(element => {
          switch (element.approved){
            case "a": this.approved.push(element); break
            case "p": this.pending.push(element); break
            case "d": this.declined.push(element); break
          }
      });
       
      this.$api("getAvailableCertificatesBySellerID", this.$store.getters["auth/userInfo"]?.userID).then(({ data }) => {
        this.available = data;
      });
    });
  },
};
</script>

<style>
</style>