<template>
  <v-container>
    <v-row class="d-flex justify-center">
      <h1 class="primary--text">Contact Us</h1>
    </v-row>
    <v-row class="d-flex justify-center">
      <v-col cols="12" sm="10" md="6">
        <v-form>
          <h3 class="primary--text pr-8">Contact Form</h3>
          <v-text-field v-model="firstname" label="First Name" required outlined></v-text-field>

          <v-text-field v-model="lastname" label="Last Name" required outlined></v-text-field>

          <v-text-field v-model="email" label="E-mail" required outlined></v-text-field>

          <v-text-field v-model="phone" label="Phone Number" required outlined></v-text-field>

          <v-select v-model="topic" :items="topics" label="Topic" required outlined></v-select>

          <v-textarea v-model="message" label="Message" required outlined></v-textarea>

          <v-btn block large color="primary">Send</v-btn>
        </v-form>
      </v-col>
      <v-col cols="12" sm="10" md="6" class="text-center">
        <h3 class="primary--text">Customer Hotline</h3>
        <h1 class="font-weight-regular">444 4 444</h1>
        <v-divider class="my-6" />

        <h3 class="primary--text my-3">Organicity Inc.</h3>
        <p>Silicon Valley, San Francisco, CA</p>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d202844.3766965533!2d-122.18118130154869!3d37.40299366475079!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fb68ad0cfc739%3A0x7eb356b66bd4b50e!2sSilikon%20Vadisi%2C%20Kaliforniya%2C%20Amerika%20Birle%C5%9Fik%20Devletleri!5e0!3m2!1str!2str!4v1636031113522!5m2!1str!2str"
          :width="$vuetify.breakpoint.smAndDown ? '100%' : '80%'"
          height="300"
          style="border: 0"
          allowfullscreen=""
          loading="lazy"
        ></iframe>
        <v-divider class="my-6" />

        <h3 class="primary--text my-3">Working Hours</h3>
        <p>Weekdays: 00:00 - 24:00</p>
        <p>Weekends: 00:00 - 24:00</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  layout: "product",
  data() {
    return {
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      topic: "",
      message: "",
      topics: ["Product request", "Product Complaint", "Order Complaint", "Payment Problem", "Other"],
    };
  },
}
</script>

<style>
</style>