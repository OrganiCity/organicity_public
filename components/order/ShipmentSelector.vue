<template>
  <v-radio-group v-model="selected">
    <v-radio>
      <template v-slot:label>
        Normal Kargo
      </template>
    </v-radio>
    <v-radio>
      <template v-slot:label>
        Hızlı Kargo (+10₺)
      </template>
    </v-radio>
  </v-radio-group>
</template>

<script>
export default {
  data () {
    return {
      selected: 1,
    }
  }
};
</script>

<style>
</style>