<template>
  <div class="d-flex" style="width: 100%">
    <v-text-field
      v-model="searchString"
      @focus="focusedSearch = true"
      @blur="focusedSearch = false"
      solo
      flat
      :background-color="focusedSearch ? '#dfdfdf' : '#eee'"
      color="primary"
      dense
      height="44"
      class="search-field rounded-lg rounded-r-0"
      clearable
      hide-details
      prepend-inner-icon="search"
      @keydown.enter="search"
    />
    <v-btn @click="search" large depressed :disabled="!focusedSearch && !searchString" class="rounded-l-0 primary">
      {{ $i18n("search") }}
    </v-btn>
  </div>
</template>

<script>
export default {
  data: () => ({
    searchString: "",
    focusedSearch: false,
  }),
  methods: {
    search() {
      this.$router.push({ name: "search", query: { q: this.searchString } })
    }
  }
}
</script>

<style>
</style>