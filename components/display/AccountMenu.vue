<template>
  <div>
    <v-menu bottom offset-y left transition="slide-y-transition">
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on" text large class="user-btn pl-5 pr-3 mx-3">
          <!-- <div style="max-width: 80px" class="text-capitalize">
          <v-clamp :max-lines="2">
            {{ $store.getters["user/info"].fullName }}
          </v-clamp>
        </div> -->
          <v-icon size="25" left>account_circle</v-icon>
          <h5>Ahmet Berk</h5>
          <v-icon large right>expand_more</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item @click="openFollowers = true">
          <v-list-item-title>Hesabım</v-list-item-title>
          <v-icon right>settings</v-icon>
        </v-list-item>
        <v-list-item @click="openFollowers = true">
          <v-list-item-title>Siparişlerim</v-list-item-title>
          <v-icon right>mdi-shopping-outline</v-icon>
        </v-list-item>
        <v-list-item @click="openFollowers = true">
          <v-list-item-title>Favorilerim</v-list-item-title>
          <v-icon right>favorite</v-icon>
        </v-list-item>
        <v-list-item
          @click="
            $store.commit('auth/logout');
            $toast.info('Çıkış Yapıldı');
          "
        >
          <v-list-item-title>Çıkış Yap</v-list-item-title>
          <v-icon right>mdi-logout</v-icon>
        </v-list-item>
      </v-list>
    </v-menu>
    <!-- <ChangePassword
      :value="openPasswordChange"
      @input="openPasswordChange = false"
    /> -->
  </div>
</template>
