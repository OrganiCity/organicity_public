<template>
  <div>
    <v-menu bottom offset-y left transition="slide-y-transition">
      <template v-slot:activator="{ on, attrs }">
        <v-btn @click="check = !check" v-bind="attrs" v-on="on" text large class="user-btn pl-5 pr-3 mx-3">
          <!-- <div style="max-width: 80px" class="text-capitalize">
          <v-clamp :max-lines="2">
            {{ $store.getters["user/info"].fullName }}
          </v-clamp>
        </div> -->
          <v-icon size="25" left>account_circle</v-icon>
          <h5>{{ $store.getters["auth/userInfo"].firstName }}</h5>

          <v-icon v-if="check" large right>expand_more</v-icon>

          <v-icon v-else large right>expand_less</v-icon>
        </v-btn>
      </template>
      <v-list flat>
        <v-list-item-group color="primary">
          <v-hover v-slot="{ hover }">
            <v-list-item :class="hover ? 'primary--text' : ''" to="/account/my-orders">
              <v-icon :color="hover ? 'primary' : ''" left>mdi-shopping-outline</v-icon>
              <v-list-item-title class="ml-2">{{$i18n('my_orders')}}</v-list-item-title>
            </v-list-item>
          </v-hover>

          <v-hover v-slot="{ hover }">
            <v-list-item :class="hover ? 'primary--text' : ''" to="/account/my-favorites">
              <v-icon :color="hover ? 'primary' : ''" left>favorite</v-icon>
              <v-list-item-title class="ml-2">{{$i18n('favorites')}}</v-list-item-title>
            </v-list-item>
          </v-hover>

          <!-- <v-hover v-slot="{ hover }">
            <v-list-item :class="hover ? 'primary--text' : ''" to="/account/my-reviews">
              <v-icon :color="hover ? 'primary' : ''" left>rate_review</v-icon>
              <v-list-item-title class="ml-2">Yorumlarım</v-list-item-title>
            </v-list-item>
          </v-hover> -->

          <v-hover v-slot="{ hover }">
            <v-list-item :class="hover ? 'primary--text' : ''" to="/account/my-account">
              <v-icon :color="hover ? 'primary' : ''" left>manage_accounts</v-icon>
              <v-list-item-title class="ml-2">{{$i18n('account')}}</v-list-item-title>
            </v-list-item>
          </v-hover>

          <v-hover v-if="isSeller" v-slot="{ hover }">
            <v-list-item :class="hover ? 'primary--text' : ''" to="/seller">
              <v-icon :color="hover ? 'primary' : ''" left>store</v-icon>
              <v-list-item-title class="ml-2">{{$i18n('my_store')}}</v-list-item-title>
            </v-list-item>
          </v-hover>

          <v-hover v-slot="{ hover }">
            <v-list-item
              :class="hover ? 'primary--text' : ''"
              @click="
                $store.commit('auth/logout');
                $toast.info($i18n('signed_out'));
                $router.push('/');
              "
            >
              <v-icon :color="hover ? 'primary' : ''" left>mdi-logout</v-icon>
              <v-list-item-title class="ml-2">{{$i18n("sign_out")}}</v-list-item-title>
            </v-list-item>
          </v-hover>
        </v-list-item-group>
      </v-list>
    </v-menu>
    <!-- <ChangePassword
      :value="openPasswordChange"
      @input="openPasswordChange = false"
    /> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      check: true,
      isSeller: this.$store.getters["auth/userInfo"]?.isSeller,
    };
  },
};
</script>
