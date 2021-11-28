<template>
  <v-menu :close-on-content-click="false" bottom offset-y nudge-bottom="15" nudge-right="45" left transition="slide-y-transition">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="primary" icon large v-bind="attrs" v-on="on">
        <v-icon>shopping_cart</v-icon>
      </v-btn>
    </template>
    <v-card :key="cartKey" class="pa-4" width="400">
      <v-card elevation="0" v-for="(cartItem, cartItemID) in cartItems" :key="cartItemID" class="d-flex pa-2">
        <v-card rounded="lg" outlined>
          <v-img width="72" aspect-ratio="1.1" :src="getCartItemInfo(cartItemID, 'image')" />
        </v-card>
        <div style="width: 100%" class="ml-2 d-flex flex-column justify-space-between">
          <div class="subtitle">{{ getCartItemInfo(cartItemID, "productName") }}</div>
          <div class="d-flex justify-space-between">
            <AddButtonWithCounter v-model="cartItems[cartItemID].count" />
            <span class="title">{{ getCartItemInfo(cartItemID, "pricePerUnit") }} ₺</span>
          </div>
        </div>
      </v-card>
      <v-divider class="mt-2 mb-3"></v-divider>
      <div class="d-flex justify-space-between">
        <div>
          <span class="title">Toplam:</span>
          <span>{{ $store.getters["cart/totalPrice"] }}</span>
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
import AddButtonWithCounter from '../input/AddButtonWithCounter.vue'
export default {
  components: { AddButtonWithCounter },
  data() {
    return {
      cartItems: JSON.parse(JSON.stringify(this.$store.state['cart'].items)),
      cartItemInfos: {},
      cartKey: 0
    }
  },
  methods: {
    getCartItemInfo(key, attr) {
      return this.cartItemInfos[key]?.[attr];
    }
  },
  watch: {
    cartItems: {
      handler(value) {
        for (var key in value) {
          if (value[key].count <= 0) delete value[key]
        }
        this.$store.commit("cart/updateCart", value)
      },
      deep: true
    }
  },
  mounted() {
    this.$api("getCartProducts", Object.keys(this.$store.state['cart'].items)).then(({ data }) => {
      data.forEach(e => {
        this.cartItemInfos[e.productID] = e
      });
      this.cartKey++;
    })
  }
}
</script>

<style>
</style>