<template>
  <v-card>
      <v-card-title> {{name}} </v-card-title>
      
      <a :href="document" target="_blank">
        <v-img max-height="150" :src="document"></v-img>
      </a>
      
  </v-card>
</template>

<script>
export default {
  props:{
    name: '',
    document: '',
  }

}
</script>

<style>

</style>