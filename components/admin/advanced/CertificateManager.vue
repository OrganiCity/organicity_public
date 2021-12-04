<template>
  <v-data-table :headers="headers" :items="sellers" :sort-by="['approved', 'sellerID']" class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Seller Management</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <!-- Edit Dialog -->
        <v-dialog v-model="dialogEdit" max-width="500px">
          <v-card class="pa-6 pt-5 py-10">
            <p class="primary--text text-h4 text-center mb-10">Edit Certificate</p>
            <v-select :items="status" label="Status" v-model="editedItem.approved" outlined></v-select>
            <v-btn @click="updateCertificateStatus" block color="primary">Update Status</v-btn>
            <div class="d-flex justify-between align-center my-4">
              <v-divider></v-divider>
              <p class="mb-0 mx-4 font-weight-medium">OR</p>
              <v-divider></v-divider>
            </div>
            <div class="d-flex justify-center">
              <v-btn rounded outlined plain color="error" @click="dialogDelete=true">
                <v-icon left>delete_outline</v-icon>
                Delete the CertIfIcate
              </v-btn>
            </div>
          </v-card>
        </v-dialog>

        <!-- Delete Confirmation -->
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <div class="d-flex justify-space-between">
        <a :href="item.document" target="_blank">
          <v-btn small icon>
            <v-icon small>open_in_new</v-icon>
          </v-btn>
        </a>
        <v-btn small icon>
          <v-icon small @click="editItem(item)">mdi-pencil</v-icon>
        </v-btn>
      </div>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Reset</v-btn>
    </template>
  </v-data-table>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    dialogEdit: false,
    status: ["a", "p", "d"],
    headers: [
      {
        text: "ID",
        align: "start",
        value: "sellerID",
      },
      { text: "Company Name", value: "companyName" },
      { text: "Country", value: "companyCountry" },
      { text: "City", value: "companyCity" },
      { text: "Certificate", value: "cName" },
      { text: "Status", value: "approved" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    sellers: [],
    editedIndex: -1,
    editedItem: {
      cID: null,
      sellerID: null,
      approved: "",
    },
    defaultItem: {
      cID: null,
      sellerID: null,
      approved: "",
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.$api("getSellerCertificates").then(({ data }) => {
        this.sellers = data;
      });
    },

    editItem(item) {
      this.editedIndex = this.sellers.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogEdit = true;
    },
    updateCertificateStatus() {
      this.$api("updateCertificateStatus", {
        approved: this.editedItem.approved,
        cID: this.editedItem.cID,
        sellerID: this.editedItem.sellerID
      }).then(window.location.reload());
    },

    deleteItemConfirm() {
      this.sellers.splice(this.editedIndex, 1);
      this.$api("deleteCertificate", { cID: this.editedItem.cID, sellerID: this.$store.getters["auth/userInfo"].userID }).then(({ data }) => {
        console.log(data);
      });
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
  },
};
</script>




<style>
</style>