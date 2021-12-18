<template>
  <v-container>
    <v-row class="mt-3">
      <v-col lg="3" md="4">
        <!-- List -->
        <v-card elevation="0" outlined>
          <div class="d-flex justify-center mt-2">
            <v-icon size="60">account_circle</v-icon>
          </div>
          <p class="text-h6" style="text-align: center">
            {{companyDetails.companyName}}
          </p>
          <v-divider></v-divider>
          <v-list flat>
            <v-list-item-group color="primary">
              <v-hover v-slot="{ hover }">
                <v-list-item :class="hover ? 'primary--text' : ''" @click="tab=0">
                  <v-icon :color="hover ? 'primary' : ''" left>mdi-shopping-outline</v-icon>
                  <v-list-item-title class="ml-2">New Orders</v-list-item-title>
                </v-list-item>
              </v-hover>
              <v-hover v-slot="{ hover }">
                <v-list-item :class="hover ? 'primary--text' : ''" @click="tab=1">
                  <v-icon :color="hover ? 'primary' : ''" left>schedule</v-icon>
                  <v-list-item-title class="ml-2">Orders In Progress</v-list-item-title>
                </v-list-item>
              </v-hover>
              <v-hover v-slot="{ hover }">
                <v-list-item :class="hover ? 'primary--text' : ''" @click="tab=2">
                  <v-icon :color="hover ? 'primary' : ''" left>done</v-icon>
                  <v-list-item-title class="ml-2">Completed Orders</v-list-item-title>
                </v-list-item>
              </v-hover>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-col>
      <v-col lg="9" md="8">
        <v-tabs-items v-model="tab">
          <v-tab-item>
            <v-toolbar flat>
              <v-toolbar-title>New Orders</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <OrdersTable :orders="newOrders" @change="getOrders" :isNewOrdersTable="true"/>
          </v-tab-item>

          <v-tab-item>
            <OrdersTable :orders="ordersInProgress"/>
          </v-tab-item>
          <v-tab-item>
            <OrdersTable :orders="ordersComplete"/>
          </v-tab-item>
        </v-tabs-items>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import OrdersTable from './OrdersTable.vue';
export default {
  components: { OrdersTable },
  data () {
     return {
        newOrders:[],
        ordersInProgress:[],
        ordersComplete:[],
        tab: 0,
        companyDetails: {},
     } 
  },
  methods: {
    getOrders() {
      this.newOrders=[]
      this.ordersInProgress=[]
      this.ordersComplete=[]
      this.$api("getOrdersBySellerID", {userID: 6}).then(({ data }) => {//this.$store.getters["auth/userInfo"].userID}).then(({ data }) => {
        for(var ord in data) {
          switch (data[ord][0].shippingStatus) {
            case 'preparing':
              this.newOrders.push({orderNumber:ord, buyerName:data[ord][0].firstName+" "+data[ord][0].lastName, orderDate:data[ord][0].orderDate.split("T")[0], totalPrice:this.getOrderTotal(data[ord]), items:data[ord]})
              break;
            case 'shipped':
              this.ordersInProgress.push({orderNumber:ord, buyerName:data[ord][0].firstName+" "+data[ord][0].lastName, orderDate:data[ord][0].orderDate.split("T")[0], totalPrice:this.getOrderTotal(data[ord]), items:data[ord]})
              break;
            case 'arrived':
              this.ordersComplete.push({orderNumber:ord, buyerName:data[ord][0].firstName+" "+data[ord][0].lastName, orderDate:data[ord][0].orderDate.split("T")[0], totalPrice:this.getOrderTotal(data[ord]), items:data[ord]})
              break;
            default:
              break;
          }
        }
      });
    },
    getOrderTotal(ord) {
      let sum = 0;
      for(const o in ord) sum+=ord[o].pricePerUnit*ord[o].quantity;
      return sum + "  ₺";
    }
  },
  mounted() {
    this.getOrders();
    this.$api("getCompanyDetails", {id: this.$store.getters['auth/userInfo'].userID}).then((res)=>{
      this.companyDetails = res.data[0];
    })
  }
}
</script>

<style>

</style>