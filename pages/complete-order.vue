<template>
  <v-container>
    <v-row class="mt-5">
      <v-col cols="12" md="9">
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
              Ürünler ve Kargo
            </v-stepper-step>
          </v-stepper-header>
          
          <v-stepper-items>
            <v-stepper-content step="1">
              <p class="font-weight-bold">Teslimat Adresi</p>
              <v-radio-group v-model="selectedDeliveryAddress">
                <v-radio v-for="address in deliveryAddresses" :key="address.ID" :value="address.ID">
                  <template v-slot:label>
                    <AddressSelectorCard :address="address"/>
                  </template>
                </v-radio>
              </v-radio-group>
              <div v-if="deliveryAddresses.length==0" class="mb-5">
                <p>Teslimat adresi bulunamadı, lütfen adres ekleyin.</p>
                <v-btn color="primary" elevation="0" to="/account/my-addresses">Adreslerim</v-btn>
              </div>
              <v-btn
                color="primary"
                @click="nextStep()"
                :disabled="deliveryAddresses.length==0"
              >
                Devam Et
              </v-btn>
            </v-stepper-content>

            <v-stepper-content step="2">
              <p class="font-weight-bold">Ödeme Yöntemi</p>
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
              <v-radio-group v-model="selectedBillingAddress">
                  <v-radio v-for="address in billingAddresses" :key="address.ID" :value="address.ID">
                    <template v-slot:label>
                      <AddressSelectorCard :address="address"/>
                    </template>
                  </v-radio>
                </v-radio-group>
              
              <div v-if="billingAddresses.length==0" class="mb-5">
                <p>Teslimat adresi bulunamadı, lütfen adres ekleyin.</p>
                <v-btn color="primary" elevation="0" to="/account/my-addresses">Adreslerim</v-btn>
              </div>
              
              <v-btn
                color="primary"
                @click="nextStep()"
                :disabled="billingAddresses.length==0"
              >
                Devam Et
              </v-btn>
              <v-btn text @click="currStep = 1">
                Geri
              </v-btn>
            </v-stepper-content>

            <v-stepper-content step="3">
              <p class="font-weight-bold">Ürünler ve Kargo</p>
              <CartProductPreview
                v-for="(item, id) in $store.getters['cart/items']"
                :key="id"
                :productID="id"
                :productInfo="cartItemInfos[id]"
              />
              <v-divider></v-divider>
              <v-radio-group v-model="selectedFastShipment">
                <v-radio>
                  <template v-slot:label>
                    Normal Kargo (10₺)
                  </template>
                </v-radio>
                <v-radio>
                  <template v-slot:label>
                    Hızlı Kargo (20₺)
                  </template>
                </v-radio>
              </v-radio-group>
              <v-divider></v-divider>
              <div class="my-3"><span>Toplam Tutar: </span><span class="font-weight-medium">{{this.totalPrice + 10 + this.selectedFastShipment*10}} ₺</span></div>
              <v-btn
                color="primary"
                @click="completeOrder"
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

      <v-col cols="12" md="3" v-if="this.$vuetify.breakpoint.mdAndUp">
        <OrderSummary :total-cart-price="totalPrice" :fast-shipment="selectedFastShipment" :number-of-items="numberOfItemsInCart"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AddressSelectorCard from '~/components/order/AddressSelectorCard.vue'
import OrderSummary from '~/components/order/OrderSummary.vue'
import CartProductPreview from '~/components/cart/CartProductPreview.vue'
export default {
  components: { AddressSelectorCard, OrderSummary, CartProductPreview },
  layout: "product",
  data () {
    return {
      currStep: 1,
      selectedDeliveryAddress: 0,
      selectedBillingAddress: 0,
      selectedPaymentMethod: 0,
      selectedFastShipment: 0,
      cartItemInfos: "{}",
      deliveryAddresses:[],
      billingAddresses:[],
    }
  },
  methods: {
    getCartProducts() {
      this.$api("getCartProducts", Object.keys(this.$store.state['cart'].items)).then(({ data }) => {
        let obj = {}
        data.forEach(e => {
          obj[e.productID] = e
        });
        this.cartItemInfos = obj
      })
    },
    nextStep() {
      this.currStep += 1
    },
    completeOrder() {
      this.$api("createNewOrder", {
        items: this.$store.state['cart'].items, 
        deliveryAddress: this.deliveryAddresses.filter(v => this.selectedDeliveryAddress==v.ID)[0], 
        billingAddress: this.billingAddresses.filter(v => this.selectedBillingAddress==v.ID)[0], 
        fastShipment: this.selectedFastShipment,
        userID: this.$store.getters['auth/userInfo'].userID
      }).then((res) => {
        this.$toast.success("Order is successful!");
        this.$store.commit("cart/clearCart");
        this.$router.push("/")
        });
    }
  },
  computed: {
    totalPrice() {
      return Math.round(
        Object.entries(this.$store.getters["cart/items"]).reduce(
          (p, c) => {
            return p + this.cartItemInfos[c[0]]?.pricePerUnit * c[1]
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
    this.$api("getAddresses", {userID: this.$store.getters["auth/userInfo"].userID, type:'delivery'}).then(({ data }) => {
      this.deliveryAddresses = data;
      this.selectedDeliveryAddress = this.deliveryAddresses[0]?.ID
    });
    this.$api("getAddresses", {userID: this.$store.getters["auth/userInfo"].userID, type:'billing'}).then(({ data }) => {
      this.billingAddresses = data;
      this.selectedBillingAddress = this.billingAddresses[0]?.ID
    });
  }
}
</script>

<style>

</style>