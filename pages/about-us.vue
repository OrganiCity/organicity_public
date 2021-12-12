<template>
  <v-container>
    <v-row class="d-flex justify-center">
      <h1 class="primary--text">About Us</h1>
    </v-row>

    <v-row class="d-flex justify-center">
      <v-col cols="12" sm="10" lg="9">
        <p>OrganiCity is a platform where the local producers and organic farms can sell their certificated products. Products are carefully packed and sent with freshness guarantee.</p>
        <p>In this marketplace you can find all kinds of fruits and vegetables with pesticide analysis and organicity certificates. Also, dairy products like eggs, milk, cheese and  meat can be bought.</p>
        <p>OrganiCity accepts the following certificates: ISO 9001 (Kalite Yönetim Sistemi), ISO 22000 (Gıda Güvenliği Yönetim Sistemi), ISO 14001 (Çevre Yönetim Sistemi), TS EN ISO 9001 Kalite Yönetim Sistemi, TS EN ISO 22000 Gıda Güvenliği Yönetim Sistemi, TSE Helal Uygunluk Belgesi, TS ISO 10002 Müşteri Memnuniyeti Yönetim Sistemi, TS ISO 45001 İş Sağlığı ve Güvenliği Yönetim Sistemi, TS EN ISO 14001 Çevre Yönetim  Sistemi, TS EN ISO 14064 Sera Gazı Hesaplama ve Doğrulama Yönetim Sistemi</p>
        <p>You can reach us from the <nuxt-link to="/contact-us">Contact Us</nuxt-link> page by filling the contact form or by calling 444 4 444. We evaluate your comments and suggestions as soon as possible and get back to you.</p>
      </v-col>
    </v-row>
    
  </v-container>
</template>

<script>
export default {
  layout: "product",
}
</script>