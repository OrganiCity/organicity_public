<template>
  <div>
    <FilterMenu class="mb-2" />
    <SortMenu class="mt-2" />
  </div>
</template>

<script>
import FilterMenu from './FilterMenu.vue'
import SortMenu from './SortMenu.vue'
export default {
  components: { FilterMenu, SortMenu },

}
</script>

<style>
</style>