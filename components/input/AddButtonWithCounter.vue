<template>
  <div style="border: 1px solid #2dbd9c; border-radius: 4px" class="d-flex justify-space-between align-center">
    <div>
      <v-btn class="rounded-r-0 secondary" elevation="0" height="30" @click="$emit('input', value - 1)" x-small>
        <v-icon color="primary" size="20">{{ value == 1 ? "delete_outline" : "remove" }}</v-icon>
      </v-btn>
    </div>
    <span style="width: 50px" class="text-center">{{ value }}</span>
    <div>
      <v-btn class="rounded-l-0 secondary" elevation="0" height="30" @click="$emit('input', value + 1)" x-small>
        <v-icon color="primary" size="20">add</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      required: true
    },
  }
}
</script>

<style>
</style>