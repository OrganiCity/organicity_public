<template>
  <v-footer>
    <v-row
      justify="center"
      no-gutters
    >
      <v-btn
        v-for="link in links"
        :key="link.route"
        :to="link.route"
        text
        rounded
        class="my-2"
      >
        {{ link.name }}
      </v-btn>
      <v-col
        class="py-4 text-center"
        cols="12"
      >
        {{ new Date().getFullYear() }} — <strong>{{$i18n("organicity")}}</strong>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
  export default {
    data() {
    return {
      links: [
        {name: this.$i18n("home"), route: ""},
        {name: this.$i18n("about_us"), route: "/about_us"},
        {name: this.$i18n("team"), route: "/team"},
        {name: this.$i18n("contact_us"), route: "/contact_us"},
      ]
    }
  }
}
</script>