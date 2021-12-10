<template>
  <v-container>
    <v-row class="mt-5">
      <v-col cols="9">
        <v-row>
          <v-col cols="12">
            <p class="text-h4 mb-0">Teslimat Adresi</p>
          </v-col>
          <AddressSelector :addresses="addresses"/>
        </v-row>
        <v-row>
          2 Ödeme Aracı
        </v-row>
        <v-row>
          3 Ürünler ve Teslimat
        </v-row>
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
export default {
  components: { AddressSelector, OrderSummary },
  layout: "product",
  data () {
    return {
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
  }
}
</script>

<style>

</style>