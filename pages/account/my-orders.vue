<template>
  <v-row class="my-4">
    <v-col class="d-flex justify-center">
      <p class="text-h4 pa-0">Siparişlerim</p>
    </v-col>
    <v-col v-for="(value,key) in orders" :key="key" cols="12">
      <v-expansion-panels flat :class="open ? 'elevation-6' : ''" popout>
        <v-expansion-panel @click="open = !open" :style="open ? '' : 'border: 1px solid #00000020'">
          <v-expansion-panel-header class="pa-8">
            <template v-slot:actions>
              <v-avatar size="35px">
                <v-icon class="contrast">{{ open ? "close" : "$expand" }}</v-icon>
              </v-avatar>
            </template>
            <OrderPreview :order="value" :orderNumber="key" />
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <OrderDetailView :orderNumber="key"/>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-col>
  </v-row>
</template>

<script>
import OrderPreview from "~/components/account/OrderPreview.vue";
import OrderDetailView from "~/components/account/OrderDetailView.vue";
export default {
  layout: "account",
  data () {
    return {
      open: false,
      orders: {},
    }
  },
  components: {
    OrderPreview,
    OrderDetailView,
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