<template>
  <v-container>
    <v-row>
      <v-col cols="12"><p class="text-h4 mb-0">Sepetim</p></v-col>
      <v-col cols="12" md="9">
        <v-card outlined>
          <template v-if="$vuetify.breakpoint.mdAndUp">
            <v-card-title >
              <v-row>
                <v-col cols="3">Ürün</v-col>
                <v-col class="d-flex justify-end" cols="4">Adet</v-col>
                <v-col class="d-flex justify-end" cols="3">Fiyat</v-col>
              </v-row>
            </v-card-title>
            <v-divider  class="mx-4"></v-divider>
          </template>
          <CartProductPreview
            v-for="(item, id) in $store.getters['cart/items']"
            :key="id"
            :productID="id"
            :productInfo="JSON.parse(cartItemInfos)[id]"
          />
        </v-card>
      </v-col>
      <v-col cols="12" md="3">
        <CartSummary :total-cart-price="totalPrice" />
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
  data() {
    return {
      cartItemInfos: "{}",
    }
  },
  methods: {
    getCartProducts() {
      this.$api("getCartProducts", Object.keys(this.$store.state['cart'].items)).then(({ data }) => {
        let obj = {}
        data.forEach(e => {
          obj[e.productID] = e
        });
        this.cartItemInfos = JSON.stringify(obj)
      })
    }
  },
  computed: {
    totalPrice() {
      return Math.round(
        Object.entries(this.$store.getters["cart/items"]).reduce(
          (p, c) => {
            return p + JSON.parse(this.cartItemInfos)[c[0]]?.pricePerUnit * c[1]
          },
          0
        ) * 100
      ) / 100
    },
    numberOfItemsInCart() {
      return Object.keys(this.$store.getters["cart/items"]).length
    }
  },
  watch: {
    numberOfItemsInCart: function (p, c) {
      if (p > c) this.getCartProducts()
    }
  },
  mounted() {
    if (this.numberOfItemsInCart > 0)
      this.getCartProducts()
  }
};
</script>

<style>
</style>