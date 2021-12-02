<template>
  <v-container>
    <v-row class="mt-3">
      <v-col lg="3" md="4">
        <!-- List -->
        <v-card elevation="0" outlined>
          <div class="d-flex justify-center mt-2">
            <v-icon size="60">account_circle</v-icon>
          </div>
          <p class="text-h6" style="text-align: center">
            AhmetBerk AŞ
          </p>
          <v-divider></v-divider>
          <v-list flat>
            <v-list-item-group color="primary">
              <v-hover v-slot="{ hover }">
                <v-list-item :class="hover ? 'primary--text' : ''" @click="tab=0">
                  <v-icon :color="hover ? 'primary' : ''" left>mdi-shopping-outline</v-icon>
                  <v-list-item-title class="ml-2">New Orders</v-list-item-title>
                </v-list-item>
              </v-hover>
              <v-hover v-slot="{ hover }">
                <v-list-item :class="hover ? 'primary--text' : ''" @click="tab=1">
                  <v-icon :color="hover ? 'primary' : ''" left>favorite</v-icon>
                  <v-list-item-title class="ml-2">Orders In Progress</v-list-item-title>
                </v-list-item>
              </v-hover>
              <v-hover v-slot="{ hover }">
                <v-list-item :class="hover ? 'primary--text' : ''" @click="tab=2">
                  <v-icon :color="hover ? 'primary' : ''" left>rate_review</v-icon>
                  <v-list-item-title class="ml-2">Completed Orders</v-list-item-title>
                </v-list-item>
              </v-hover>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-col>
      <v-col lg="9" md="8">
        <v-tabs-items v-model="tab">
          <v-tab-item>
            tab1
          </v-tab-item>

          <v-tab-item>
            tab2
          </v-tab-item>
          <v-tab-item>
            tab3 
          </v-tab-item>
        </v-tabs-items>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data () {
     return {
       tab: 0,
     } 
  }
}
</script>

<style>

</style>