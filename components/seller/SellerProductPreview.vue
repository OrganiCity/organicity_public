<template>
  <div>
    <v-dialog
      v-model="dialog"
      persistent
      max-width="400px"
    >
      <v-card>
        <v-card-title class="text-h5 primary--text font-weight-bold">
          <v-icon class="mx-1" color="primary" size="28">info</v-icon>
          Confirm Deletion
        </v-card-title>
        <v-card-text>Are you sure you want to delete this product? This operation is not reversible.</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            
            @click="dialog = false"
          >
            CANCEL
          </v-btn>
          <v-btn
            color="error"
            
            @click="dialog = false"
          >
            CONFIRM
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-card elevation="0" outlined class="pa-1">
      <v-img aspect-ratio="1.4" height="160px" :src="imgSrc" class="ma-2"></v-img>
      <v-responsive height="46px">
        <p style="text-align: center" class="ma-0 mx-1">{{ productName }}</p>
      </v-responsive>
      <p style="text-align: center" class="text-caption primary--text">
        {{ sellerName }}
      </p>
      <div class="d-flex justify-space-around mb-3">
        <v-tooltip bottom v-for="c in certificates" :key="c.cID">
          <template v-slot:activator="{ on, attrs }">
            <v-hover v-slot="{ hover }">
              <v-icon v-bind="attrs" v-on="on" :color="hover ? 'primary' : ''">{{ c.iconTag }}</v-icon>
            </v-hover>
          </template>
          <span>{{ c.cName }}</span>
        </v-tooltip>
      </div>
      <p class="primary--text font-weight-medium mb-3" style="text-align: center">{{ price }} TL</p>
      <div class="d-flex justify-end">
        <v-btn fab small color="primary" class="ma-2">
          <v-icon size="16">edit</v-icon>
        </v-btn>
        <v-btn fab small color="error" class="ma-2" @click="dialog=true">
          <v-icon size="16">delete</v-icon>
        </v-btn>
      </div>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      productID: "",
      productName: "",
      imgSrc: "",
      sellerName: "",
      price: 0.0,
      certificates: [],
      dialog: false,
    };
  },
  props: { productId: 0 },
  methods: {
    deleteProduct() {

    }
  },
  mounted() {
    this.$api("getProductPreviewDetails", {
      productID: this.productId,
    }).then(({ data }) => {
      this.certificates = data.certificates;
      this.productID = data.productID;
      this.productName = data.productName;
      this.sellerName = data.companyName;
      this.imgSrc = data.imgURL;
      this.price = data.pricePerUnit;
    });
  },
};
</script>

<style>
a {
  text-decoration: none;
}
</style>