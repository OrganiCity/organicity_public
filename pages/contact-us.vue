<template>
  <v-container >
    <v-row class="d-flex justify-center">
      <h1 class="primary--text">Contact Us</h1>
    </v-row>
    <v-row class="d-flex justify-center">
      <v-col md="3">
        <v-form>
          <h3 class="primary--text pr-8">Contact Form</h3>
          <v-text-field
          v-model="firstname"
          label="First Name"
          required outlined
          ></v-text-field>

          <v-text-field
          v-model="lastname"
          label="Last Name"
          required outlined
          ></v-text-field>

          <v-text-field
          v-model="email"
          label="E-mail"
          required outlined
          ></v-text-field>

          <v-text-field
          v-model="phone"
          label="Phone Number"
          required outlined
          ></v-text-field>

          <v-select
          v-model="topic"
          :items="topics"
          label="Topic"
          required outlined
          ></v-select>

          <v-textarea
          v-model="message"
          label="Message"
          required outlined
          ></v-textarea>
          <v-btn block color="primary">Send</v-btn>
        </v-form>
      </v-col>
      <v-col md="3" class="text-center">
        <h3 class="primary--text">Customer Hotline</h3>
        <h1 class="font-weight-regular">444 4 444</h1>
        <v-divider class="ma-6"/>

        <h3 class="primary--text mb-3">Organicity Inc.</h3>
        <p>Address here...</p>
        <v-divider class="ma-6"/>
        <h3 class="primary--text mb-3">Working Hours</h3>
        <p>Weekdays: 08:00 - 18:00</p>
        <p>Weekends: 09:00 - 16:00</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
    data() {
        return {
            firstname:"",
            lastname:"",
            email:"",
            phone:"",
            topic:"",
            message:"",
            topics:["Product request", "Product Complaint", "Order Complaint", "Payment Problem", "Other"],
        };
    },
}
</script>

<style>

</style>