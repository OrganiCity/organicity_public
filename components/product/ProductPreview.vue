<template>
  <v-card elevation="0" outlined class="pa-1">
    <div class="d-flex justify-end">
      <v-btn v-model="favorited" style="z-index: 1" class="contrast" icon small absolute @click="addToFavorites">
        <v-icon v-model="favorited" :color="favorited ? 'error' : ''" size="20px">
          {{ favorited ? "favorite" : "favorite_border" }}
        </v-icon>
      </v-btn>
    </div>

    <nuxt-link class="d-flex justify-center ma-2" :to="'/product/' + productID">
      <v-img aspect-ratio="1.4" height="140px" :src="imgSrc"></v-img>
    </nuxt-link>

    <v-responsive height="46px">
      <p style="text-align: center" class="ma-0 mx-1">{{ productName }}</p>
    </v-responsive>
    <p style="text-align: center" class="text-caption">
      <a class="" href="">{{ sellerName }}</a>
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

    <v-fab-transition leave-absolute>
      <div v-if="itemsInBasket == 0" class="d-flex justify-end">
        <v-btn @click="itemsInBasket++" fab x-small color="primary">
          <v-icon size="20">add</v-icon>
        </v-btn>
      </div>
    </v-fab-transition>

    <v-scale-transition mode="in-out" leave-absolute>
      <div
        style="border: 1px solid #2dbd9c; border-radius: 5px"
        v-if="itemsInBasket"
        class="d-flex justify-space-between align-center"
      >
        <div>
          <v-btn class="rounded-r-0 secondary" elevation="0" height="30" @click="itemsInBasket--" x-small>
            <v-icon color="primary" size="20">{{ itemsInBasket == 1 ? "delete_outline" : "remove" }}</v-icon>
          </v-btn>
        </div>
        <span>{{ itemsInBasket }}</span>
        <div>
          <v-btn class="rounded-l-0 secondary" elevation="0" height="30" @click="itemsInBasket++" x-small>
            <v-icon color="primary" size="20">add</v-icon>
          </v-btn>
        </div>
      </div>
    </v-scale-transition>
  </v-card>
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
      favorited: 0,
      certificates: [],
    };
  },
  props: { productId: 0 },
  computed: {
    itemsInBasket: {
      get: function () {
        return this.$store.getters["cart/items"][this.productId] || 0;
      },
      set: function (value) {
        this.$store.commit("cart/setCount", { id: this.productId, count: value });
      },
    },
  },
  methods: {
    addToFavorites() {
      if (!this.$store.getters["auth/userInfo"]) this.$toast.info("Lütfen Giriş Yapınız");
      else if (!this.favorited) {
        this.$api("addToFavorites", {
          productID: this.productId,
          userID: this.$store.getters["auth/userInfo"]?.userID,
        }).then((this.favorited = 1));
      } else
        this.$api("deleteFromFavorites", {
          productID: this.productId,
          userID: this.$store.getters["auth/userInfo"]?.userID,
        }).then((this.favorited = 0));
    },
  },
  mounted() {
    this.$api("getProductPreviewDetails", {
      productID: this.productId,
      userID: this.$store.getters["auth/userInfo"]?.userID || -1,
    }).then(({ data }) => {
      this.certificates = data.certificates;
      this.productID = data.productID;
      this.productName = data.productName;
      this.sellerName = data.companyName;
      this.imgSrc = data.imgURL;
      this.price = data.pricePerUnit;
      if (this.$store.getters["auth/userInfo"]?.userID)
        this.$api("isFavorited", {
          productID: this.productID,
          userID: this.$store.getters["auth/userInfo"].userID,
        }).then(({ data }) => {
          this.favorited = data.favorited;
        });
    });
  },
};
</script>

<style>
a {
  text-decoration: none;
}
</style>