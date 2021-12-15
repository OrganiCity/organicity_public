<template>
  <v-container>
    <v-row :key="keyIncrement">
      <v-col v-for="(r, i) in results" :key="i" cols="6" sm="4">
        <ProductPreview :productId="r" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ProductPreview from '~/components/product/ProductPreview.vue'
export default {
  layout: "search",
  components: { ProductPreview },
  data() {
    return {
      results: [],
      keyIncrement: 0
    }
  },
  methods: {
    getSearchResults() {
      this.$api("getSearchResults", this.$route.query).then(({ data }) => {
        console.log("cagirdik")
        this.results = data
        this.keyIncrement++
      })
    }
  },
  mounted() {
    this.getSearchResults()
  },
  watch: {
    "$route.query"() {
      this.getSearchResults()
    }
  }
}
</script>

<style>
</style>