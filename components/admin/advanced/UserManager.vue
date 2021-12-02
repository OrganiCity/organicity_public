<template>
  <v-data-table :headers="headers" :items="users" sort-by="ID" class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>User Management</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
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
    headers: [
      {
        text: 'ID',
        align: 'start',
        value: 'userID',
      },
      { text: 'First Name', value: 'firstName' },
      { text: 'Last Name', value: 'lastName' },
      { text: 'Phone Number', value: 'phoneNumber' },
      { text: 'Email', value: 'email' },
      { text: 'Date Registered', value: 'dateRegistered' },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    users: [],
    editedIndex: -1,
    editedItem: {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: '',
      dateRegistered: '',
    },
    defaultItem: {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: '',
      dateRegistered: '',
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
      this.$api('getUsers').then(({ data }) => {
        this.users = data;
      })

    },



    deleteItem(item) {
      this.editedIndex = this.users.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      this.users.splice(this.editedIndex, 1)
      this.$api("deleteUser",this.editedItem.userID).then(({ data }) => {
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
        Object.assign(this.users[this.editedIndex], this.editedItem)
      } else {
        this.users.push(this.editedItem)
      }
      this.close()
    },
  },
}
</script>




<style>
</style>