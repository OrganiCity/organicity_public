<template>
  <v-container>
    <v-row v-for="(example, index) in examples" :key="index">
      <v-col>
        {{ example }}
      </v-col>
    </v-row>
         <v-col>
          <v-carousel v-model="model">
      <v-carousel-item
        v-for="(color, i) in colors"
        :key="color"
      >
        <v-sheet
          :color="color"
          height="100%"
          tile
        >
          <v-row
            class="fill-height"
            align="center"
            justify="center"
          >
            <div class="text-h2">
              Slide {{ i + 1 }}
            </div>
          </v-row>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>
      </v-col>
  </v-container>
</template>

<script>
import axios from "axios"

export default {
  data() {
    return {
      examples: [],
      colors: ["red", "green", "blue"],
    };
  },
  mounted() {
    this.$api("getFeatured").then(({ data }) => { this.examples = data.map((e) => e.firstName + e.lastName) })
  },
 
};
</script>