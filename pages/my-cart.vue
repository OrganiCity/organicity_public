<template>
  <v-container>
    <v-row>
      <v-col cols="12"><p class="text-h4 mb-0">Sepetim</p></v-col>
      <v-col cols="12" md="9">
        <v-card outlined>
          <v-card-title v-if="$vuetify.breakpoint.mdAndUp">
            <v-row>
              <v-col cols="3">Ürün</v-col>
              <v-col class="d-flex justify-end" cols="4">Adet</v-col>
              <v-col class="d-flex justify-end" cols="3">Fiyat</v-col>
            </v-row>
          </v-card-title>
          <v-divider class="mx-4"></v-divider>
          <CartProductPreview />
          <CartProductPreview />
        </v-card>
      </v-col>
      <v-col cols="12" md="3">
        <CartSummary />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CartSummary from "~/components/cart/CartSummary.vue";
import CartProductPreview from "~/components/cart/CartProductPreview.vue";
export default {
  layout: "product",
  components: {
    CartProductPreview,
    CartSummary,
  },
};
</script>

<style>
</style>