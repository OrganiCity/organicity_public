<template>
  <v-radio-group v-model="selected">
    <v-radio v-for="address in addresses" :key="address.name" :value="address.name">
      <template v-slot:label>
        <AddressSelectorCard :address="address"/>
      </template>
    </v-radio>
  </v-radio-group>
</template>

<script>
import AddressSelectorCard from './AddressSelectorCard.vue';
export default {
  components: { AddressSelectorCard },
  props: { addresses: [] },
  data () {
    return {
      selected: 1,
    }
  }
};
</script>

<style>
</style>