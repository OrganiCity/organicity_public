<template>
  <div style="width: 90px">
    <v-select
      prepend-icon="language"
      class="select"
      v-model="language"
      :items="['TR', 'EN']"
    />
  </div>
</template>

<script>
export default {
  computed: {
    language: {
      get() {
        return this.$store.getters["preferences/language"];
      },
      set(e) {
        this.$store.commit("preferences/setLanguage", e);
        window.location.reload();
      },
    },
  },
};
</script>

<style scoped>
.select {
  margin-top: 22px !important;
}
.select >>> .v-input__slot::before {
  border-style: none !important;
}
</style>