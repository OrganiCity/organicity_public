<template>
  <v-dialog :max-width="modalMaxWidth" :value="value" @input="$emit('input')">
    <v-tabs :value="openTab" @change="$emit('tab-change', $event)" centered>
      <v-tab>{{$i18n("sign_in")}}</v-tab>
      <v-tab-item>
        <LoginTab @close="$emit('input')" />
      </v-tab-item>
      <v-tab>{{$i18n("sign_up")}}</v-tab>
      <v-tab-item>
        <RegisterTab @close="$emit('input')" />
      </v-tab-item>
    </v-tabs>
  </v-dialog>
</template>

<script>
import LoginTab from "./LoginTab.vue";
import RegisterTab from "./RegisterTab.vue";
export default {
  components: { RegisterTab, LoginTab },
  props: ["value", "open-tab"],
  computed: {
    modalMaxWidth() {
      let screen = this.$vuetify.breakpoint.name;
      switch (screen) {
        case "xs":
          return "100%";
        case "sm":
          return "50%";
        default:
          return "500px";
      }
    }
  }
};
</script>
