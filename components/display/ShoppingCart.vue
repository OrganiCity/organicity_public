<template>
  <v-menu :close-on-content-click="false" bottom offset-y nudge-bottom="15" left transition="slide-y-transition">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="primary" icon large v-bind="attrs" v-on="on">
        <v-icon>shopping_cart</v-icon>
      </v-btn>
    </template>
    <v-card class="px-2" width="400">
      <v-card class="d-flex pa-2">
        <img
          style="border: solid black"
          height="72"
          width="72"
          src="https://www.greenada.com/Uploads/UrunResimleri/buyuk/greenadadomates-1-kg-e162.jpg"
        />
        <div style="width: 100%" class="ml-2 d-flex flex-column justify-space-between">
          <div class="subtitle">Deneme</div>
          <div class="d-flex justify-space-between">
            <AddButtonWithCounter v-model="counter" />
            <span class="title">144.05 ₺</span>
          </div>
        </div>
      </v-card>
    </v-card>
  </v-menu>
</template>

<script>
import AddButtonWithCounter from '../input/AddButtonWithCounter.vue'
export default {
  components: { AddButtonWithCounter },
  data() {
    return {
      counter: 0
    }
  },
  methods: {
  },
  watch: {
    counter: function (e) {
      if (!e) console.log("sil")
    }
  }

}
</script>

<style>
</style>