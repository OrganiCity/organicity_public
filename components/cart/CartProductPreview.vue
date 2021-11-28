<template>
  <v-card elevation="0" class="pa-4">
    <v-row class="d-flex align-center">
        <v-col md="2" cols="6">
            <v-img
              class="rounded"
              min-height="80px"
              max-height="98px"
              max-width="100px"
              aspect-ratio="1.4"
              src="https://www.greenada.com/Uploads/UrunResimleri/buyuk/greenadadomates-1-kg-e162.jpg"
            ></v-img>
        </v-col>
        <v-col md="3" cols="6">
            <p class="mb-0 d-flex">Organik Domates Kg</p>
            <p class="text-caption primary--text mb-0">Bizim Çiftlik</p>
        </v-col>
        <v-col md="3" cols="5" >
            <div
              style="border: 1px solid #2dbd9c; border-radius: 4px"
              v-if="itemsInBasket"
              class="d-flex justify-space-between align-center"
            >
              <div>
                <v-btn class="rounded-r-0 secondary" elevation="0" height="30" @click="itemsInBasket--" x-small>
                  <v-icon color="primary" size="20">{{ itemsInBasket == 1 ? "delete_outline" : "remove" }}</v-icon>
                </v-btn>
              </div>
              <span>{{ itemsInBasket }}</span>
              <div>
                <v-btn class="rounded-l-0 secondary" elevation="0" height="30" @click="itemsInBasket++" x-small>
                  <v-icon color="primary" size="20">add</v-icon>
                </v-btn>
              </div>
            </div>
        </v-col>
        <v-col md="2" cols="3" class="d-flex justify-end">
            <p class="primary--text mb-0 text-body-1 font-weight-medium">75,00 TL</p>
        </v-col>
        <v-col md="2" cols="4" class="d-flex justify-end">
            <p class="mr-4 my-0">Sil</p>
        </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      itemsInBasket: 1,
    };
  },
};
</script>

<style>
</style>