<template>
  <v-form ref="form" v-model="valid" lazy-validation class="ma-3 pa-7">
    <v-text-field
      autocomplete="email"
      v-model="email"
      :rules="emailRules"
      label="E-posta adresi"
      required
      outlined
    ></v-text-field>

    <v-text-field
      autocomplete="current-password"
      v-model="password"
      :rules="passwordRules"
      label="Şifre"
      required
      outlined
      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
      :type="showPassword ? 'text' : 'password'"
      class="input-group--focused"
      @click:append="showPassword = !showPassword"
    ></v-text-field>

    <v-btn  :disabled="!valid" color="primary" class="mr-4" @click="login">
      Giriş Yap
    </v-btn>
  </v-form>
</template>

<script>
export default {
  data: () => ({
    showPassword: false,
    valid: true,
    email: "",
    emailRules: [
      v => !!v || "Lütfen e-posta adresinizi giriniz!",
      v => /.+@.+\..+/.test(v) || "Lütfen geçerli bir e-posta adresi giriniz!"
    ],
    password: "",
    passwordRules: [v => !!v || "Lütfen parolanızı giriniz!"]
  }),
  methods: {
    validate() {
      return this.$refs.form.validate();
    },
    login() {
      if (!this.validate()) return;
      this.$store.commit("auth/setUserToken", "falanfilan");
      this.$store.commit("auth/setUserInfo", { fullName: "Deneme DENEME" });
      this.$store.commit("auth/setSignedIn", true);
      this.$toast.success("Giriş Yapıldı")
      this.$emit("close");
    }
  }
};
</script>

<style></style>
