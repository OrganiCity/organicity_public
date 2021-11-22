<template>
  <v-container>
    <h1 class="primary--text">Special Deals Management</h1>
    <SlideManager get-slides-function="getFeaturedImages"></SlideManager>
  </v-container>
</template>

<script>
import SlideManager from '~/components/admin/SlideManager.vue'
export default {
  layout: "admin",
  components: { SlideManager },
}
</script>

<style>

</style>