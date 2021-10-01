<template>
  <v-autocomplete
    :label="label"
    return-object
    multiple
    chips
    deletable-chips
    clearable
    cache-items
    :items="items"
    :loading="loading"
    :disabled="disabled"
    :value="value"
    @input="$emit('input', $event)"
  >
    <template v-slot:item="data">
      <template>
        <div></div>
      </template>
      <v-list-item-content v-if="items.some((e) => e.text === data.item.text)">
        <v-list-item-title v-html="data.item.text"></v-list-item-title>
      </v-list-item-content>
      <v-list-item-content style="display: none" v-else></v-list-item-content>
    </template>
  </v-autocomplete>
</template>

<script>
export default {
  props: ["label", "items", "loading", "disabled", "value"],
};
</script>

<style>
.v-list.v-select-list .v-list-item {
  min-height: 0;
}
</style>