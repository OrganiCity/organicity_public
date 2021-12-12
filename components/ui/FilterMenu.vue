<template>
  <v-card outlined elevation="0">
    <v-list dense>
      <v-list-item>
        <v-list-item-content>Kategoriler</v-list-item-content>
      </v-list-item>
      <v-divider class="mx-2" />
      <v-list-item class="px-2">
        <v-list-item-content>
          <v-select
            :value="selectedCategory"
            @input="onCategorySelect"
            :items="categories"
            solo
            flat
            dense
            color="primary"
            background-color="contrast"
            :hide-details="true"
          />
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>Satıcı</v-list-item-content>
      </v-list-item>
      <v-divider class="mx-2" />
      <v-list-item class="px-2">
        <v-list-item-content>
          <v-select
            :value="selectedSeller"
            @input="onSellerSelect"
            :items="sellers"
            solo
            flat
            dense
            color="primary"
            background-color="contrast"
            :hide-details="true"
          />
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>Fiyat</v-list-item-content>
      </v-list-item>
      <v-divider class="mx-2" />
      <v-list-item class="px-2">
        <v-list-item-content>
          <v-range-slider
            label="₺"
            :min="0"
            :max="200"
            step="1"
            :value="priceRange"
            inverse-label
            :hide-details="true"
            @input="onPriceSelect"
          />
          <p class="mb-0">Aralık: {{ priceRange[0] }} ₺ - {{ priceRange[1] }} ₺</p>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      categories: [{ text: "Tümü", value: 0 }],
      selectedCategory: Number.parseInt(this.$route.query['cat']) || 0,
      sellers: [{ text: "Tümü", value: null }],
      selectedSeller: Number.parseInt(this.$route.query['seller']) || null,
      priceRange: [Number(this.$route.query['minPrice']) || 0, Number(this.$route.query['maxPrice']) || 200]
    }
  },
  methods: {
    fetchCategories() {
      this.$api("getCategories").then(({ data }) => {
        data.forEach(e => {
          this.categories.push({ text: e.name, value: e.categoryID })
        })
      })
    },
    fetchSellers() {
      this.$api("getSellers").then(({ data }) => {
        data.forEach(e => {
          this.sellers.push({ text: e.companyName, value: e.sellerID })
        })
      })
    },
    onCategorySelect(event) {
      this.selectedCategory = event
      this.$router.push({ name: "search", query: { ...this.$route.query, cat: event } })
    },
    onSellerSelect(event) {
      this.selectedSeller = event
      this.$router.push({ name: "search", query: { ...this.$route.query, seller: event } })
    },
    onPriceSelect(event) {
      this.priceRange = event
      this.$router.push({ name: "search", query: { ...this.$route.query, minPrice: event[0], maxPrice: event[1] } })
    }
  },
  mounted() {
    this.fetchCategories()
    this.fetchSellers()
  }
}
</script>

<style>
</style>