<template>
  <v-container>
    <v-row>
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
      results: []
    }
  },
  methods: {
    getSearchResults() {
      this.$api("getSearchResults", this.$route.query).then(({ data }) => {
        console.log("cagirdik")
        this.results = data
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