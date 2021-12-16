<template>
  <v-card elevation="0" class="pa-4" outlined>
    <v-row class="d-flex align-center">
      <v-col cols="9">
        <p class="mb-0 font-weight-bold">{{ address.name }}</p>
        <p class="text-caption mx-2">
          <span>{{ address.ZIPorNeighbourhood }}</span>
          <span>{{ address.street }}</span>
          <span>Bina ve Daire No: {{ address.buildingAndFlatNo }}</span>
          <span>{{ address.district }}</span>
          <span> {{ address.city }} / </span>
          <span>{{ address.country }}</span>
        </p>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  props: { address: {} },
};
</script>

<style>
</style>