<template>
  <v-container>
    <v-row class="mt-5">
      <v-col cols="9">
        <v-stepper v-model="currStep">
          <v-stepper-header>
            <v-stepper-step
              :complete="currStep > 1"
              :rules="[v => true]"
              step="1"
            >
              Teslimat Adresi
            </v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step
              :complete="currStep > 2"
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
              <v-radio-group v-model="selectedDeliveryAddress">
                <v-radio v-for="address in addresses" :key="address.name" :value="address.name">
                  <template v-slot:label>
                    <AddressSelectorCard :address="address"/>
                  </template>
                </v-radio>
              </v-radio-group>
              <v-btn
                color="primary"
                @click="nextStep()"
              >
                Devam Et
              </v-btn>
            </v-stepper-content>

            <v-stepper-content step="2">
              <v-radio-group v-model="selectedPaymentMethod">
                <v-radio>
                  <template v-slot:label>
                    Nakit
                  </template>
                </v-radio>
                <v-radio>
                  <template v-slot:label>
                    Kredi Kartı
                  </template>
                </v-radio>
              </v-radio-group>
              <p class="font-weight-bold">Fatura Adresi</p>
              <v-radio-group v-model="selectedDeliveryAddress">
                  <v-radio v-for="address in addresses" :key="address.name" :value="address.name">
                    <template v-slot:label>
                      <AddressSelectorCard :address="address"/>
                    </template>
                  </v-radio>
                </v-radio-group>              <v-btn
                color="primary"
                @click="nextStep()"
              >
                Devam Et
              </v-btn>
              <v-btn text @click="currStep = 1">
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
                @click="currStep = 1"
              >
                Siparişi Tamamla
              </v-btn>
              <v-btn text @click="currStep = 2">
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
import AddressSelectorCard from '~/components/order/AddressSelectorCard.vue'
import OrderSummary from '~/components/order/OrderSummary.vue'
import PaymentSelector from '~/components/order/PaymentSelector.vue'
import ShipmentSelector from '~/components/order/ShipmentSelector.vue'
import CartProductPreview from '~/components/cart/CartProductPreview.vue'
export default {
  components: { AddressSelectorCard, OrderSummary, PaymentSelector, ShipmentSelector, CartProductPreview },
  layout: "product",
  data () {
    return {
      currStep: 1,
      selectedDeliveryAddress: "",
      selectedBillingAddress: "",
      selectedPaymentMethod: 0,
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
    },
    nextStep() {
      this.currStep += 1
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
    this.selectedDeliveryAddress = this.addresses[0].name
    this.selectedBillingAddress = this.addresses[0].name
  }
}
</script>

<style>

</style>