<template>
  <v-container>
    <v-row>
      <v-col>{{ example }}</v-col>
      <v-col>
        <v-btn
          @click="
            $toast.success('Test')
          "
        >
          Show Toast
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      example: "",
    };
  },
  mounted() {
    this.$api("getTodos", 7).then(({ data }) => {
      this.example = data;
    });
  },
};
</script>