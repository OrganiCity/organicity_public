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
            @end="onPriceEnd"
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
      categories: [{ text: "Tümü", value: Number.parseInt(this.$route.query['limitCats']) || 0 }],
      selectedCategory: Number.parseInt(this.$route.query['cat']) || 0,
      sellers: [{ text: "Tümü", value: null }],
      selectedSeller: Number.parseInt(this.$route.query['seller']) || null,
      priceRange: [Number(this.$route.query['minPrice']) || 0, Number(this.$route.query['maxPrice']) || 200]

    }
  },
  methods: {
    forceRerender() {
      this.renderComponent = false;
      this.$nextTick(() => {
        this.renderComponent = true;
      });
    },
    fetchCategories() {
      console.log(this.$route.query)
      if (this.$route.query['limitCats'] !== undefined)
        this.$api("getAllChildCategories", this.$route.query['limitCats']).then(({ data }) => {
          data.forEach((e) => {
            if (!(e.categoryID == this.$route.query['limitCats'])) this.categories.push({ text: e.name, value: e.categoryID })
          })
        })
      else this.$api("getCategories").then(({ data }) => {
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
    onPriceEnd(event) {
      this.$router.push({ name: "search", query: { ...this.$route.query, minPrice: event[0], maxPrice: event[1] } })
    },
    onPriceSelect(event) {
      this.priceRange = event
    }
  },
  mounted() {
    console.log("denemee")
    this.fetchCategories()
    this.fetchSellers()
  },
}
</script>

<style>
</style>