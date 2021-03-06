<template>
  <v-data-table :headers="headers" :items="orders" sort-by="ID" class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Order Management</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <!-- Edit Dialog -->
        <v-dialog v-model="dialogEdit" max-width="500px">
          <v-card class="pa-6 pt-5 py-10">
            <p class="primary--text text-h4 text-center mb-10">Edit Certificate</p>
            <v-select :items="status" label="Status" v-model="editedItem.shippingStatus" outlined></v-select>
            <v-btn @click="updateOrder" block color="primary">Update Status</v-btn>
          </v-card>
        </v-dialog>
        <!-- Delete Dialog -->
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
      <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
      <v-btn small icon>
        <v-icon small @click="editItem(item)">mdi-pencil</v-icon>
      </v-btn>
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
    status: ["arrived", "preparing", "shipped"],
    headers: [
      {
        text: 'ID',
        align: 'start',
        value: 'orderID',
      },
      { text: 'Product ID', value: 'productID' },
      { text: 'Product Name', value: 'productName' },
      { text: 'Seller Company', value: 'companyName' },
      { text: 'Shipper Name', value: 'shipperCompanyName' },
      { text: 'Shipping Status', value: 'shippingStatus' },
      { text: 'Order Number', value: 'orderNumber' },
      { text: 'Quantity', value: 'quantity' },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    orders: [],
    editedIndex: -1,
    editedItem: {
      orderID: 0,
    },
    defaultItem: {
      orderID: 0,
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    },
  },

  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },

  created() {
    this.initialize()
  },

  methods: {
    initialize() {
      this.$api('getOrders').then(({ data }) => {
        this.orders = data;
      })

    },
    editItem(item) {
      this.editedItem = Object.assign({}, item);
      this.dialogEdit = true;
    },
    updateOrder() {
      this.$api("updateOrderStatus", {
        shippingStatus: this.editedItem.shippingStatus,
        orderID: this.editedItem.orderID,
      }).then(() => { window.location.reload() });
    },
    deleteItem(item) {
      this.editedIndex = this.orders.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      this.orders.splice(this.editedIndex, 1)
      this.$api("deleteOrder", this.editedItem.orderID).then(({ data }) => {
        console.log(data)
      })
      this.closeDelete()
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.orders[this.editedIndex], this.editedItem)
      } else {
        this.orders.push(this.editedItem)
      }
      this.close()
    },
  },
}
</script>




<style>
</style>