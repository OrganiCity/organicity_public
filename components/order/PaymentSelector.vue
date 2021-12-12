<template>
  <v-radio-group v-model="selected">
    <v-radio>
      <template v-slot:label>
        Nakit
      </template>
    </v-radio>
    <v-radio>
      <template v-slot:label>
        Kredi Kartı
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