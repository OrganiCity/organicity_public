<template>
  <v-menu :close-on-content-click="false" bottom offset-y nudge-bottom="15" nudge-right="45" left transition="slide-y-transition">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="primary" icon large v-bind="attrs" v-on="on">
        <v-icon>shopping_cart</v-icon>
      </v-btn>
    </template>
    <v-card class="pa-4" width="400">
      <CartItem
        v-for="(item, id) in $store.getters['cart/items']"
        :key="id"
        :productID="id"
        :productInfo="JSON.parse(cartItemInfos)[id]"
      />
      <v-divider class="mt-2 mb-3"></v-divider>
      <div class="d-flex justify-space-between">
        <div>
          <span class="title">Toplam:</span>
          <span>
            {{ totalPrice }} ₺
          </span>
        </div>

        <v-btn to="/my-cart" elevation="0" color="primary" class="text-capitalize">
          <v-icon left>shopping_cart_checkout</v-icon>
          Sepete Git
        </v-btn>
      </div>
    </v-card>
  </v-menu>
</template>

<script>
import CartItem from '../cart/CartItem.vue'
import AddButtonWithCounter from '../input/AddButtonWithCounter.vue'
export default {
  components: { AddButtonWithCounter, CartItem },
  data() {
    return {
      cartItemInfos: "{}",
    }
  },
  computed: {
    totalPrice() {
      return Math.round(
        Object.values(JSON.parse(this.cartItemInfos)).reduce(
          (p, c) => {
            console.log(p,this.$store.getters["cart/items"][c.productID])
            return p + c.pricePerUnit * this.$store.getters["cart/items"][c.productID]
          },
          0
        ) * 100
      ) / 100
    }
  },
  mounted() {
    this.$api("getCartProducts", Object.keys(this.$store.state['cart'].items)).then(({ data }) => {
      let obj = {}
      data.forEach(e => {
        obj[e.productID] = e
      });
      this.cartItemInfos = JSON.stringify(obj)
    })
  }
}
</script>

<style>
</style>