<template>
  <v-card elevation="0" outlined class="pa-1">
    <div  class="d-flex justify-end">
      <v-btn style="z-index: 1" class="contrast" icon small  absolute @click="favorited = !favorited">
        <v-icon :color="favorited ? 'error' : ''" size="20px">{{ favorited ? "favorite" : "favorite_border" }}</v-icon>
      </v-btn>
    </div>
    

    
    <div class="d-flex justify-center ma-2">
      <v-img aspect-ratio="1.4" height="140px" :src="image"></v-img>
    </div>
    

    <p style="text-align: center" class="ma-0">Organik Çanakkale Domates</p>
    <p style="text-align: center" class="text-caption"><a class="" href="">Bizim Çiftlik</a></p>
    <div class="d-flex justify-space-around mb-3">
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-hover v-slot="{ hover }">
            <v-icon v-bind="attrs" v-on="on" :color="hover ? 'primary' : ''">settings_backup_restore</v-icon>
          </v-hover>
        </template>
        <span>Organik Ürün</span>
      </v-tooltip>

      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-hover v-slot="{ hover }">
            <v-icon v-bind="attrs" v-on="on" :color="hover ? 'primary' : ''">download_done</v-icon>
          </v-hover>
        </template>
        <span>T.O.B Onaylı</span>
      </v-tooltip>

      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-hover v-slot="{ hover }">
            <v-icon v-bind="attrs" v-on="on" :color="hover ? 'primary' : ''">pest_control</v-icon>
          </v-hover>
        </template>
        <span>Pestisit Analizli</span>
      </v-tooltip>
    </div>

    <p class="primary--text font-weight-medium mb-3" style="text-align: center">19.95 TL</p>

    <v-fab-transition leave-absolute>
      <div v-if="itemsInBasket == 0" class="d-flex justify-end">
        <v-btn @click="itemsInBasket++" fab x-small color="primary">
          <v-icon size="20">add</v-icon>
        </v-btn>
      </div>
    </v-fab-transition>

    <v-scale-transition mode="in-out" leave-absolute>
      <div
        style="border: 1px solid #2dbd9c; border-radius: 5px"
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
    </v-scale-transition>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      image: "https://www.greenada.com/Uploads/UrunResimleri/buyuk/greenadadomates-1-kg-e162.jpg",
      favorited: false,
      itemsInBasket: 0,
    };
  },
};
</script>

<style>
a {
  text-decoration: none;
}
</style>