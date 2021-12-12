<template>
  <v-card outlined elevation="0">
    <v-list dense>
      <v-list-item>
        <v-list-item-content>Sıralama</v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-select
            :value="selectedSort"
            @input="onSortSelect"
            :items="sorts"
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
      sorts: [
        { text: "Seçiniz", value: null },
        { text: "Artan Fiyat", value: "sortByPriceAsc" },
        { text: "Azalan Fiyat", value: "sortByPriceDesc" }
      ],
      selectedSort: this.$route.query['sort'] || null,
    }
  },
  methods: {
    onSortSelect(event) {
      this.selectedSort = event
      this.$router.push({ name: "search", query: { ...this.$route.query, sort: event } })
    },
  }
}
</script>

<style>
</style>