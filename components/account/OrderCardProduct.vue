<template>
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
</template>

<script>
export default {};
</script>

<style>
</style>