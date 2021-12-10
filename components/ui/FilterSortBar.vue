<template>
  <div>
    <FilterMenu />
    <SortMenu />
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