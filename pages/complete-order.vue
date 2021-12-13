<template>
  <v-container>
    <v-row class="mt-5">
      <v-col cols="9">
        <v-stepper v-model="e1">
          <v-stepper-header>
            <v-stepper-step
              :complete="e1 > 1"
              step="1"
            >
              Teslimat Adresi
            </v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step
              :complete="e1 > 2"
              step="2"
            >
              Ödeme Yöntemi
            </v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step step="3">
              Ürünler ve Teslimat
            </v-stepper-step>
          </v-stepper-header>
          <v-stepper-items>
            <v-stepper-content step="1">
              <AddressSelector :addresses="addresses"/>
              <v-btn
                color="primary"
                @click="e1 = 2"
              >
                Devam Et
              </v-btn>
            </v-stepper-content>

            <v-stepper-content step="2">
              <PaymentSelector/>
              <p class="font-weight-bold">Fatura Adresi</p>
              <AddressSelector :addresses="addresses"/>
              <v-btn
                color="primary"
                @click="e1 = 3"
              >
                Devam Et
              </v-btn>
              <v-btn text @click="e1 = 1">
                Geri
              </v-btn>
            </v-stepper-content>

            <v-stepper-content step="3">
              <CartProductPreview
                v-for="(item, id) in $store.getters['cart/items']"
                :key="id"
                :productID="id"
                :productInfo="JSON.parse(cartItemInfos)[id]"
              />
              <v-divider></v-divider>
              <ShipmentSelector/>
              <v-btn
                color="primary"
                @click="e1 = 1"
              >
                Siparişi Tamamla
              </v-btn>
              <v-btn text @click="e1 = 2">
                Geri
              </v-btn>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-col>

      <v-col cols="3">
        <OrderSummary :total-cart-price="10" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AddressSelector from '~/components/order/AddressSelector.vue'
import OrderSummary from '~/components/order/OrderSummary.vue'
import PaymentSelector from '~/components/order/PaymentSelector.vue'
import ShipmentSelector from '~/components/order/ShipmentSelector.vue'
export default {
  components: { AddressSelector, OrderSummary, PaymentSelector, ShipmentSelector },
  layout: "product",
  data () {
    return {
      e1: 1,
      cartItemInfos: "{}",
      addresses:[
        {
          name: "Ev",
          toName: "Doğkan",
          toSurname: "Saraç",
          country: "Turkey",
          city: "İstanbul",
          district: "Pendik",
          ZIPorNeighbourhood: "Güllü Bağlar Mah.",
          street: "Ulubat Sk.",
          buildingAndFlatNo: "59/23",
          description: "Büyük sarı bina",
        },
        {
          name:"İş",
          toName: "Doğkan",
          toSurname: "Saraç",
          country: "Turkey",
          city: "İstanbul",
          district: "Pendik",
          ZIPorNeighbourhood: "Güllü Bağlar Mah.",
          street: "Ulubat Sk.",
          buildingAndFlatNo: "59/23",
          description: "Büyük sarı bina",
        },
      ],
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
  mounted() {
    if (this.numberOfItemsInCart > 0)
      this.getCartProducts()
  }
}
</script>

<style>

</style>