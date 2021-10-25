<template>
  <v-container>
    <v-row v-for="(example, index) in examples" :key="index">
      <v-col>
        {{ example }}
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios"
export default {
  data() {
    return {
      examples: [],
    };
  },
  mounted() {
    this.$api("getFeatured").then(({ data }) => { this.examples = data.map((e) => e.firstName + e.lastName) })
  },
};
</script>