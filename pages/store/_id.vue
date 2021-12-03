<template>
  <v-row>
    <v-col cols="12">
      <v-sheet height="52" outlined color="primary" rounded>
          <v-card elevation="0" height="50" class="d-flex justify-center align-center">
              <p class="primary--text text-h4  ma-0">{{ companyName }}</p>
          </v-card>
      </v-sheet>
    </v-col>
    <v-col v-for="product in products" :key="product" cols="6" sm="4">
      <ProductPreview :product-id="product" />
    </v-col>
  </v-row>
</template>

<script>
import ProductPreview from "~/components/product/ProductPreview.vue";
export default {
  components: {
    ProductPreview,
  },
  data() {
    return {
      products: [],
      companyName: "",
    };
  },
  methods: {
    getStoreProducts() {
      this.$api("getStoreProductsByID", this.$route.params.id)
        .then(({ data }) => {
          this.products = data.products;
          this.companyName = data.companyName
        })
        .catch(() => {
          this.$router.push("/store");
        });
    },
  },
  mounted() {
    this.getStoreProducts();
  },
};
</script>

<style>
</style>