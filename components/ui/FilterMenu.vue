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
            @input="onInput"
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
    </v-list>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      categories: [{ text: "Tümü", value: 0 }],
      selectedCategory: this.$route['cat'] || { text: "Tümü", value: 0 },
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
    onInput(event) {
      console.log(event)
      this.$router.push({ name: "search", query: { ...this.$route.query, cat: event } })
    }
  },
  mounted() {
    this.fetchCategories()
  }
}
</script>

<style>
</style>