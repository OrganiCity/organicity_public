<template>
  <v-data-table
    :headers="tableHeaders"
    :items="orders"
    :single-expand="true"
    :expanded.sync="expanded"
    item-key="orderNumber"
    show-expand
    class="elevation-1"
  >
    <template v-slot:expanded-item="{ headers, item }">
      <td :colspan="headers.length" class="pt-3">
        <p v-for="i in item.items" :key="i.productName">{{i.quantity}} x {{i.productName}}</p>
        <div class="my-3" v-if="isNewOrdersTable">
          <v-btn color="primary" @click="approveOrder(item.orderNumber)">Onayla</v-btn>
          <v-btn color="error" @click="cancelOrder(item.orderNumber)">İptal Et</v-btn>
        </div>
      </td>
    </template>
  </v-data-table>
</template>

<script>
  export default {
    props: ["orders", "isNewOrdersTable"],
    data () {
      return {
        expanded: [],
        tableHeaders: [
          {
            text: 'Order Number',
            align: 'start',
            sortable: false,
            value: 'orderNumber',
          },
          { text: 'Buyer Name', value: 'buyerName', sortable: false,},
          { text: 'Order Date', value: 'orderDate' },
          { text: 'Total Price', value: 'totalPrice' },
          { text: '', value: 'data-table-expand' },
        ],
      }
    },
    methods: {
      approveOrder(orderNumber) {
        this.$api("approveOrder", {orderNumber: orderNumber}).then(()=>{
          this.$toast.success("Order is approved!");
          this.$emit('change');
          })
      },
      cancelOrder(orderNumber) {
        this.$api("cancelOrder", {orderNumber: orderNumber}).then(()=>{
          this.$toast.success("Order is cancelled!");
          this.$emit('change');
          })
      },
    },
  }
</script>