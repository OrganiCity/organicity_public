<template>
  <!-- Address Dialog Menu -->

  
  <v-card :class="$vuetify.breakpoint.smAndDown ? 'px-0 py-4' : 'px-8 py-4'">
    <div class="d-flex justify-end px-0">
      <v-btn icon large absolute @click="$emit('close')">
        <v-icon>close</v-icon>
      </v-btn>
    </div>
    <v-card-title class="d-flex justify-center text-h5">Adresi Düzenle</v-card-title>

    <v-card-subtitle class="d-flex justify-center mt-1">
      Lütfen teslimat adres bilgilerinizi belirtin. Sepetinizdeki ürünler bu adresinize gönderilecektir.
    </v-card-subtitle>

    <v-row class="d-flex justify-center mx-1">
      <v-col class="py-0" cols="12">
        <v-text-field label="Address Name *" outlined required v-model="address.name"></v-text-field>
      </v-col>
      <v-col class="py-0" md="6" cols="12">
        <v-text-field label="First Name *" outlined required v-model="address.toName"></v-text-field>
      </v-col>
      <v-col class="py-0" md="6" cols="12">
        <v-text-field label="Second Name *" outlined required v-model="address.toSurname"></v-text-field>
      </v-col>
      <v-col class="py-0" md="6" cols="12">
        <v-text-field label="Country *" outlined required v-model="address.country"></v-text-field>
      </v-col>
      <v-col class="py-0" md="6" cols="12">
        <v-text-field label="City *" outlined required v-model="address.city"></v-text-field>
      </v-col>
      <v-col class="py-0" md="6" cols="12">
        <v-text-field label="District" outlined v-model="address.district"></v-text-field>
      </v-col>
      <v-col class="py-0" md="6" cols="12">
        <v-text-field label="Neighbourhood / ZIP" outlined v-model="address.ZIPorNeighbourhood"></v-text-field>
      </v-col>
      <v-col class="py-0" md="6" cols="12">
        <v-text-field label="Street" outlined v-model="address.street"></v-text-field>
      </v-col>
      <v-col class="py-0" md="6" cols="12">
        <v-text-field label="Building and Flat No" outlined v-model="address.buildingAndFlatNo"></v-text-field>
      </v-col>
      <v-col class="py-0" cols="12">
        <v-text-field label="Phone Number" outlined v-model="address.phoneNumber"></v-text-field>
      </v-col>
      <v-col class="py-0" cols="12">
        <v-textarea outlined name="input-7-4" label="Description" v-model="address.description"></v-textarea>
      </v-col>
    </v-row>
    <div class="mx-3">
      <v-btn block elevation="0" color="primary" @click="updateMode?updateAddress():newAddress()">Kaydet</v-btn>
    </div>
  </v-card>
  
</template>

<script>
export default {
  data: () => ({
  }),
  props: {address:{}, updateMode:false},
  mounted() {
  },
  methods: {
    updateAddress() {
      this.$api("updateAddress", this.address).then((res)=>{
        this.$toast.success("Address updated successfully!");
        this.$emit("close");
      })
    },
    newAddress() {
      console.log("hi")
      this.$api("newAddress", this.address).then((res)=>{
        this.$toast.success("Address created successfully!");
        this.$emit("close");
      })
    }
  }
};
</script>

<style>
</style>