<template>
  <v-container class="pa-0 ma-0">
    <!-- Address Preview -->

    <v-card outlined class="mt-6">
      <v-card-title class="d-flex justify-space-between text-body-1 font-weight-bold pa-2 ma-0">
        <span class="ma-2">ev</span>
        <div>
          <v-btn @click.stop="dialog = true" small class="pa-0 ma-0" icon>
            <v-icon size="20px">mdi-pencil-outline</v-icon>
          </v-btn>
          <v-btn small class="pa-0 ma-0" icon>
            <v-icon size="20px">delete_outline</v-icon>
          </v-btn>
        </div>
      </v-card-title>
      <p class="text-caption mx-4">
        <span>{{ address.ZIPorNeighbourhood }}</span>
        <span>{{ address.street }}</span>
        <span>Bina ve Daire No: {{ address.buildingAndFlatNo }}</span>
        <span>{{ address.district }}</span>
        <span>/{{ address.city }}/</span>
        <span>{{ address.country }}</span>
      </p>
    </v-card>

    <!-- Address Dialog Menu -->
    <v-dialog v-model="dialog" overlay-color="secondary" max-width="700px">
      <AddressDialogMenu :address="address" />
    </v-dialog>
  </v-container>
</template>

<script>
import AddressDialogMenu from "~/components/account/AddressDialogMenu.vue";
export default {
  data: () => ({
    dialog: false,
  }),
  props: {
    address: {},
  },
  components: {
    AddressDialogMenu,
  },
};
</script>

<style>
</style>