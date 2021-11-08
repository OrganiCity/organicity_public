<template>
  <v-form ref="form" v-model="valid" lazy-validation class="ma-3 pa-7">
    <div class="d-flex">
      <v-text-field
        class="mr-2"
        autocomplete="given-name"
        v-model="name"
        :rules="nameRules"
        label="Ad"
        required
        outlined
      ></v-text-field>

      <v-text-field
        class="ml-2"
        autocomplete="family-name"
        v-model="surname"
        :rules="nameRules"
        label="Soyad"
        required
        outlined
      ></v-text-field>
    </div>

    <v-text-field
      autocomplete="email"
      v-model="email"
      :rules="emailRules"
      label="E-posta adresi"
      required
      outlined
    ></v-text-field>

    <v-text-field
      autocomplete="new-password"
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

    <v-text-field
      v-model="repassword"
      autocomplete="new-password"
      :rules="[...repasswordRules, passwordsMatch]"
      label="Tekrardan şifre"
      required
      outlined
      :type="showPassword ? 'text' : 'password'"
      class="input-group--focused"
    ></v-text-field>

    <v-checkbox
      v-model="checkbox"
      :rules="[(v) => !!v || 'Kayıt olmak için üyeli sözleşmesini kabul etmeniz lazım!!']"
      label="Üyelik sözleşmesini kabul ediyorum."
      required
    ></v-checkbox>

    <v-btn :disabled="!valid" color="primary" class="mr-4" @click="register">Kayıt Ol</v-btn>
  </v-form>
</template>

<script>
export default {
  data: () => ({
    showPassword: false,
    valid: true,
    name: "",
    surname: "",
    nameRules: [v => !!v || "Lütfen adınızı giriniz!"],
    email: "",
    emailRules: [
      v => !!v || "Lütfen e-posta adresinizi giriniz!",
      v =>
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          v
        ) || "Lütfen geçerli bir e-posta adresi giriniz!"
    ],
    password: "",
    passwordRules: [v => !!v || "Lütfen parolanızı giriniz!"],
    repassword: "",
    repasswordRules: [v => !!v || "Lütfen parolanızı bir daha giriniz!"],
    checkbox: false
  }),
  methods: {
    passwordsMatch(v) {
      return v == this.password || "Şifreler uyuşmuyor!";
    },
    validate() {
      return this.$refs.form.validate();
    },
    register() {
      if (!this.validate()) return;
      this.$api("userRegister", { email: this.email, firstName: this.name, lastName: this.surname, password: this.password })
        .then(({ data }) => {
          this.$toast.success("Kayıt Başarılı")
          this.$emit("close");
        })
        .catch(({ response: { status } }) => {
          if (status === 500) this.$toast.error("Bilinmeyen hata")
          else this.$toast.error("Bu email ile bir kullanıcı zaten mevcut")
        })
    }
  }
};
</script>

<style></style>
