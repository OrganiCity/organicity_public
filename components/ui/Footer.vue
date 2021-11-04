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
    </v-row>

    <v-col
      class="py-1 text-center"
      cols="12">
      <v-btn
          v-for="icon in icons"
          :key="icon.route"
          class="mx-4"
          :href="icon.route"
          target="_blank"
          icon>
        <v-icon size="24px"> {{ icon.icon }} </v-icon>
      </v-btn>
    </v-col>

      <v-col
        class="py-2 text-center"
        cols="12">
        {{ new Date().getFullYear() }} — <strong>{{$i18n("organicity")}}</strong>
        
      </v-col>
  </v-footer>
</template>

<script>
  export default {
    data() {
    return {
      links: [
        {name: this.$i18n("home"), route: ""},
        {name: this.$i18n("about_us"), route: "/about-us"},
        {name: this.$i18n("team"), route: "/team"},
        {name: this.$i18n("contact_us"), route: "/contact-us"},
      ],
      icons: [
        {icon: 'mdi-facebook', route: "https://facebook.com/"},
        {icon: 'mdi-twitter', route: "https://twitter.com/"},
        {icon: 'mdi-instagram', route: "https://instagram.com/"}
      ],
    }
  }
}
</script>