<template>
   <v-row class="my-4">
         <v-col cols="12" class="d-flex justify-center">
      <p class="text-h4 pa-0">Favorilerim</p>
    </v-col>
       <v-col v-for="i in 5" :key="i" cols="3" sm="3"><ProductPreview /></v-col>
   </v-row>
</template>

<script>
export default {
layout: "account",
}
</script>

<style>

</style>