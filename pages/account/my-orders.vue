<template>
  <v-row class="my-4">
    <v-col class="d-flex justify-center">
      <p class="text-h4 pa-0">Siparişlerim</p>
    </v-col>
    <v-col cols="12">
      <v-expansion-panels flat :class="open ? 'elevation-6' : ''" popout>
        <v-expansion-panel @click="open = !open" :style="open ? '' : 'border: 1px solid #00000020'">
          <v-expansion-panel-header class="pa-8">
            <template v-slot:actions>
              <v-avatar size="35px">
                <v-icon class="contrast">{{ open ? "close" : "$expand" }}</v-icon>
              </v-avatar>
            </template>
            <OrderPreview />
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <OrderDetailView/>
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
  data: () => ({
    open: false,
  }),
  components: {
    OrderPreview,
    OrderDetailView,
  },
};
</script>

<style>
</style>