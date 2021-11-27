<template>
  <v-card outlined class="mb-4">
    <v-row>
      <!-- Product Info -->
      <v-col cols="12" md="6">
        <div class="d-flex">
          <v-img
            class="ma-4 rounded"
            min-height="80px"
            min-width="100px"
            max-height="98px"
            max-width="120px"
            aspect-ratio="1.4"
            src="https://www.greenada.com/Uploads/UrunResimleri/buyuk/greenadadomates-1-kg-e162.jpg"
          ></v-img>
          <div class="mt-4">
            <div>
                <p class="text-body-1 ma-0">Organik Çanakkale Domates</p>
                <div class="mt-8">
                  <p class="text-body-2 ma-0">2 Adet</p>
                  <p class="primary--text font-weight-medium">20,95 TL</p>
                </div>
            </div>
            <!-- Buttons -->
            <div class="mt-8">
                <v-sheet max-width="100" class="pa-0 rounded" outlined>
                  <v-btn block style="text-transform: none" class="pa-3 ma-0; card-btn;" color="inv_contrast" small text>
                    <v-icon size="18px">mdi-cart-outline</v-icon>
                    Tekrar Al
                  </v-btn>
                </v-sheet>
                <div class="text-body-2 mt-4">
                  <v-icon size="18px">mdi-comment-plus-outline</v-icon>
                  <span class="text-body-2">Ürünü Değerlendir</span>
                </div>
            </div>
          </div>
        </div>
      </v-col>

      <!-- Delivery Info -->
      <v-col class="" cols="12" md="6">
        <v-card class="rounded-l-0 pa-6" elevation="0" color="secondary">
          <div class="d-flex align-center">
            <v-avatar size="58px" color="primary">
              <v-badge
                class="miniBadgeIcon d-flex justify-center align-center"
                offset-x="15"
                offset-y="15"
                color="white"
                bottom
                overlap
                icon="check"
              >
                <v-icon color="#FFFFFF" size="36px">mdi-package-variant-closed</v-icon>
              </v-badge>
            </v-avatar>
            <div class="ml-3">
              <div>
                <span class="text-body-1 font-weight-medium">Doğkan Saraç</span>
                <span class="text-body-2">adlı kişiye teslim edildi</span>
              </div>

              <div class="text-caption primary--text">
                <span>Teslim tarihi</span>
                <span class="font-weight-medium">05 Oca Cts 2019, 15:31</span>
              </div>
            </div>
          </div>
          <v-divider class="mb-2 mt-5"></v-divider>
          <v-row>
            <v-col cols="12" sm="6">
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
            <v-col cols="12" sm="6">
              <v-btn block elevation="" color="transparent" class="text-body-2 py-6" style="text-transform: none">
                <v-icon size="28px" class="material-icons-outlined mr-3">rotate_right</v-icon>
                Kolay İade Et
              </v-btn>
            </v-col>
            <v-col cols="12" sm="6">
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
export default {};
</script>


<style>
.v-badge__badge {
  color: #2dbd9c !important;
  width: 10px;
  height: 10px;
}

.v-badge--icon .v-badge__badge {
  padding: 1px 2px;
}

.card-btn >>> .v-btn::before {
  background-color: transparent;
}
</style>



