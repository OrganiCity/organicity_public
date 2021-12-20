<template>
  <v-row class="my-4">
    <v-col class="d-flex justify-center">
      <p class="text-h4 pa-0">{{ $i18n("account") }}</p>
    </v-col>

    <!-- Personal Info -->
    <v-col cols="12" class="d-flex justify-center">
      <v-card elevation="0" outlined class="px-8 py-5" max-width="500px">
        <v-card-title class="pa-0">{{ $i18n("profile-info") }}</v-card-title>
        <v-card-subtitle class="pa-0 mt-1 mb-10">
          {{ $i18n("account-motto") }}
        </v-card-subtitle>
        <v-row class="d-flex justify-center mt-2">
          <!-- Name -->

          <v-col class="pa-0 px-3" md="6" cols="12">
            <p class="text-body-2 mb-1">{{ $i18n("name") }}</p>
            <v-text-field v-model="name" outlined required :rules="rules.name"></v-text-field>
          </v-col>
          <v-col class="pa-0 px-3" md="6" cols="12">
            <p class="text-body-2 mb-1">{{ $i18n("surname") }}</p>
            <v-text-field v-model="lastName" outlined required :rules="rules.name"></v-text-field>
          </v-col>
          <v-divider class="py-3 mx-3"></v-divider>
          <!-- Birth -->

          <!-- <v-col cols="12" class="py-0">
            <p class="text-body-2 mb-1">Date of Birth</p>
            <v-dialog ref="dialog" v-model="modal" :return-value.sync="date" persistent width="290px">
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  :value="date"
                  prepend-inner-icon="mdi-calendar"
                  readonly
                  outlined
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="date" color="primary" scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="modal = false">Cancel</v-btn>
                <v-btn text color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
              </v-date-picker>
            </v-dialog>
          </v-col>
          <v-divider class="py-3 mx-3"></v-divider> -->
          <v-col cols="12" class="py-0">
            <p class="text-body-2 mb-1">{{ $i18n("gender") }}</p>
            <v-select :items="genders" v-model="gender" outlined required></v-select>
          </v-col>
          <v-col cols="12" class="d-flex justify-center pt-0">
            <v-btn
              @click="updatePersonalInfo"
              :disabled="!personalInfoChanged"
              block
              elevation="0"
              max-width="400px"
              class="primary--text"
              color="secondary"
            >
              {{ $i18n("update") }}
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-col>

    <!-- Contact Info -->
    <v-col class="d-flex justify-center mt-5">
      <v-card elevation="0" outlined class="px-8 py-5" max-width="500px">
        <v-card-title class="pa-0">{{ $i18n("contact-info") }}</v-card-title>
        <v-card-subtitle class="pa-0 mt-1 mb-10">
          {{ $i18n("account-motto") }}
        </v-card-subtitle>
        <v-row class="d-flex justify-center mt-2">
          <!-- Name -->

          <v-col class="pa-0 px-3" cols="12">
            <p class="text-body-2 mb-1">{{ $i18n("phone") }}</p>
            <v-text-field v-model="phoneNumber" outlined required></v-text-field>
          </v-col>
          <v-divider class="py-3 ma-3"></v-divider>

          <v-col class="pa-0 px-3" cols="12">
            <p class="text-body-2 mb-1">{{ $i18n("email") }}</p>
            <v-text-field v-model="email" :rules="rules.email" outlined required></v-text-field>
          </v-col>

          <v-col cols="12" class="d-flex justify-center pt-0">
            <v-btn
              @click="updateContactInfo"
              :disabled="!contactInfoChanged"
              block
              elevation="0"
              max-width="400px"
              class="primary--text"
              color="secondary"
            >
              Update
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>



<script>
export default {
  layout: "account",
  data() {
    return {
      genders: [{ text: this.$i18n("male"), value: "Male" }, { text: this.$i18n("female"), value: "Female" }, { text: this.$i18n("gender-other"), value: "Do not want to mention" }],
      menu: false,
      modal: false,

      name: this.$store.getters['auth/userInfo'].firstName,
      lastName: this.$store.getters['auth/userInfo'].lastName,
      gender: this.$store.getters['auth/userInfo'].gender,
      date: this.$store.getters["auth/userInfo"].dateOfBirth,
      email: this.$store.getters["auth/userInfo"].email,
      phoneNumber: this.$store.getters['auth/userInfo'].phoneNumber,
      rules: {
        name: [v => !!v || "Lütfen adınızı giriniz!"],
        email: [
          v => !!v || "Lütfen e-posta adresinizi giriniz!",
          v =>
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
              v
            ) || "Lütfen geçerli bir e-posta adresi giriniz!"
        ],
        phone: [
          v => !!v || "Lütfen telefon numaranızı giriniz!"
        ]
      },
    };
  },
  methods: {
    updatePersonalInfo() {
      this.$api("updatePersonalInfo", {
        gender: this.gender,
        firstName: this.name,
        lastName: this.lastName,
        userID: this.$store.getters['auth/userInfo'].userID
      }).then(() => {
        this.$api("refreshToken").then(({ data }) => {
          this.$store.commit("auth/setUserToken", data);
          this.$api("userMe").then(({ data }) => {
            this.$store.commit("auth/setUserInfo", data);
            this.$toast.success("Updated personal info successfully.")
          })
        })
      })
    },
    updateContactInfo() {
      this.$api("updateContactInfo", {
        phoneNumber: this.phoneNumber,
        email: this.email,
        userID: this.$store.getters['auth/userInfo'].userID
      }).then(() => {
        this.$api("refreshToken").then(({ data }) => {
          this.$store.commit("auth/setUserToken", data);
          this.$api("userMe").then(({ data }) => {
            this.$store.commit("auth/setUserInfo", data);
            this.$toast.success("Updated contact info successfully.")
            this.$router.push("/account/my-account")
          })
        })
      })
        .catch(({ response: { status } }) => {
          if (status === 404) this.$toast.error("Bu e-posta ile kayıtlı zaten bir kullanıcı var")
          else this.$toast.error("Bilinmeyen bir hata oluştu")
        })
    },
  },
  computed: {
    defaultValues() {
      return {
        name: this.$store.getters['auth/userInfo'].firstName,
        lastName: this.$store.getters['auth/userInfo'].lastName,
        gender: this.$store.getters['auth/userInfo'].gender,
        date: this.$store.getters["auth/userInfo"].dateOfBirth,
        email: this.$store.getters["auth/userInfo"].email,
        phoneNumber: this.$store.getters['auth/userInfo'].phoneNumber,
      }
    },
    personalInfoChanged() {
      return (
        this.name != this.defaultValues.name ||
        this.lastName != this.defaultValues.lastName ||
        this.gender != this.defaultValues.gender
      )
    },
    contactInfoChanged() {
      return (
        this.email != this.defaultValues.email ||
        this.phoneNumber != this.defaultValues.phoneNumber
      )
    }
  }
};
</script>
