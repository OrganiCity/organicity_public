<template>
  <v-row class="my-4">
    <v-col class="d-flex justify-center">
      <p class="text-h4 pa-0">Siparişlerim</p>
    </v-col>
    <v-col v-for="(value,key) in orders" :key="key" cols="12">
     <OrderExpansionPanel :order="value" :orderNumber="key"/>
    </v-col>
  </v-row>
</template>

<script>
import OrderExpansionPanel from "~/components/account/OrderExpansionPanel.vue";

export default {
  layout: "account",
  data () {
    return {
      open: false,
      orders: {},
    }
  },
  components: {
    OrderExpansionPanel,
  },
  mounted(){
    this.$api("getOrderPreviewsByID", this.$store.getters["auth/userInfo"].userID).then(({ data }) => {
      this.orders = data
    //  console.log(this.orders["123"].products)
    })
  }
};
</script>

<style>
</style>