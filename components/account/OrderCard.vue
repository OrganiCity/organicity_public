<template>
  <v-card outlined class="mb-4">
    <v-row>
      <!-- Product Info -->
      <v-col class="mb-4" cols="12" md="6">
        <v-row>
          <v-col v-for="(product, key) in products" :key="key" cols="12">
            <OrderCardProduct
              :productID="key"
              :product="product"
            />
          </v-col>
        </v-row>
      </v-col>

      <!-- Delivery Info -->
      <v-col cols="12" md="6">
        <v-card class="rounded-0 pa-6" elevation="0" height="100%" :color="status ? 'secondary' : 'contrast'">
          <div class="d-flex align-center">
            <v-avatar size="58px" :color=" status ? 'primary' :'warning'">
              <v-badge
                class="miniBadgeIcon d-flex justify-center align-center"
                offset-x="15"
                offset-y="15"
                color="white"
                bottom
                overlap
                :icon="status ? 'check' : 'pending'"
              >
                <v-icon color="#FFFFFF" size="36px">mdi-package-variant-closed</v-icon>
              </v-badge>
            </v-avatar>
            <div class="ml-3">
              <div>
                <span class="text-body-1 font-weight-medium">{{deliveryPerson}}</span>
                <span v-if="status" class="text-body-2">adlı kişiye teslim edildi</span>
                <span v-else class="text-body-2">adlı kişiye teslim edilecek</span>

              </div>

              <!-- <div v-if="status" class="text-caption primary--text">
                <span>Teslim tarihi</span>
                <span class="font-weight-medium">3 Ağs Sal 2021, 13:11</span>
              </div> -->
            </div>
          </div>
          <v-divider class="mb-2 mt-5"></v-divider>
          <v-row>
            <v-col cols="12">
              <v-btn
                href="https://www.araskargo.com.tr/tr/"
                block
                elevation=""
                color="transparent"
                class="text-body-2 py-6"
                style="text-transform: none"
              >
                <v-icon size="28px" class="material-icons-outlined mr-3">mdi-truck-outline</v-icon>
                Kargo Takibi
              </v-btn>
            </v-col>

            <v-col cols="12">
              <v-btn
                to="/contact-us"
                block
                elevation=""
                color="transparent"
                class="text-body-2 py-6"
                style="text-transform: none"
              >
                <v-icon size="28px" class="material-icons-outlined mr-3">mdi-email-outline</v-icon>
                Talep Oluştur
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import OrderCardProduct from "./OrderCardProduct.vue";

export default {
  components: { OrderCardProduct },
  props: {
    products: {},
    deliveryPerson: "",
    status: false
  },
 
};
</script>


<style>
.v-badge__badge {
  color: #2dbd9c !important;
}

.v-badge--icon .v-badge__badge {
  padding: 1px 2px !important;
}

.card-btn >>> .v-btn::before {
  background-color: transparent;
}
</style>