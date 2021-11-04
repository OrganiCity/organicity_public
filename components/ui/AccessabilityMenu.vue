<template>
  <v-menu
    :close-on-content-click="false"
    bottom
    offset-y
    nudge-bottom="15"
    left
    transition="slide-y-transition"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="primary" v-bind="attrs" v-on="on" icon large>
        <v-icon>more_vert</v-icon>
      </v-btn>
    </template>
    <v-list width="200">
      <v-list-item class="d-flex align-space-between">
        <v-list-item-title>{{$i18n("language")}}</v-list-item-title>
        <LanguageSelector />
      </v-list-item>
      <v-list-item>
        <v-list-item-title>{{$i18n("theme")}}</v-list-item-title>
        <DarkThemeSwitch />
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import DarkThemeSwitch from './DarkThemeSwitch.vue'
import LanguageSelector from './LanguageSelector.vue'
export default {
  components: { LanguageSelector, DarkThemeSwitch },

}
</script>

<style>
</style>