<template>
  <v-expansion-panels flat :class="open ? 'elevation-6' : ''" popout>
    <v-expansion-panel @click="open = !open" :style="open ? '' : 'border: 1px solid #00000020'">
      <v-expansion-panel-header class="pa-8">
        <template v-slot:actions>
          <v-avatar size="35px">
            <v-icon class="contrast">{{ open ? "close" : "$expand" }}</v-icon>
          </v-avatar>
        </template>
        <OrderPreview :order="order" :orderNumber="orderNumber" />
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <OrderDetailView :orderNumber="orderNumber" />
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
import OrderPreview from "~/components/account/OrderPreview.vue";
import OrderDetailView from "~/components/account/OrderDetailView.vue";
export default {
  data() {
    return {
      open: false,
    };
  },
  props: {
    order: {},
    orderNumber: 0,
  },
  components: {
    OrderPreview,
    OrderDetailView,
  },
};
</script>

<style>
</style>