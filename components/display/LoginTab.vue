<template>
  <v-form ref="form" v-model="valid" lazy-validation class="ma-3 pa-7">
    <v-text-field
      :loading="loading"
      autocomplete="email"
      v-model="email"
      :rules="emailRules"
      :label="$i18n('email')"
      required
      outlined
    ></v-text-field>

    <v-text-field
      :loading="loading"
      autocomplete="current-password"
      v-model="password"
      :rules="passwordRules"
      :label="$i18n('password')"
      required
      outlined
      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
      :type="showPassword ? 'text' : 'password'"
      class="input-group--focused"
      @click:append="showPassword = !showPassword"
      @keydown.enter="login"
    ></v-text-field>

    <v-btn :loading="loading" :disabled="!valid" color="primary" class="mr-4" @click="login">{{ $i18n("sign_in") }}</v-btn>
  </v-form>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      showPassword: false,
      valid: true,
      email: "",
      emailRules: [
        v => !!v || this.$i18n("enter-email"),
        v => /.+@.+\..+/.test(v) || this.$i18n("enter-valid-email")
      ],
      password: "",
      passwordRules: [v => !!v || "Lütfen parolanızı giriniz!"]
    }
  },
  methods: {
    validate() {
      return this.$refs.form.validate();
    },
    login() {
      this.loading = true
      if (!this.validate()) return;
      this.$api("userLogin", { email: this.email, password: this.password })
        .then(({ data }) => {
          this.$store.commit("auth/setUserToken", data);
          this.$api("userMe").then(({ data }) => {
            setTimeout(() => {
              this.loading = false
              this.$store.commit("auth/setUserInfo", data);
              this.$store.commit("auth/setLoggedIn", true);
              this.$toast.success("Hoş Geldin, " + data.firstName)
              this.$emit("close");
            }, 1000);
          })
        })
        .catch(({ response: { status } }) => {
          this.loading = false
          if (status === 500) this.$toast.error("Bilinmeyen hata")
          else this.$toast.error("Yanlış giriş bilgileri")
        })
    }
  }
};
</script>

<style></style>
