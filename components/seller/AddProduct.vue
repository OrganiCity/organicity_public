<template>
  <v-card :class="$vuetify.breakpoint.smAndDown ? 'px-0 py-4' : 'px-8 py-4'">
    <div class="d-flex justify-end px-0">
      <v-btn icon large absolute @click="dialog = false">
        <v-icon>close</v-icon>
      </v-btn>
    </div>
    <v-card-title class="d-flex justify-center text-h5">Add New Product</v-card-title>

    <v-row class="d-flex justify-center mx-1 mt-2">
      <!-- Text Info -->
      <v-col class="py-0" cols="12">
        <v-text-field v-model="productName" label="Name*" outlined></v-text-field>
      </v-col>
      <v-col class="py-0" cols="12">
        <v-text-field v-model="extraInfo" label="Additional Information" outlined></v-text-field>
      </v-col>
      <v-col class="py-0" cols="12">
        <v-text-field v-model="nutritionalValues" label="Nutrional Values" outlined></v-text-field>
      </v-col>
      <v-col class="py-0" cols="12">
        <v-text-field v-model="ingredients" label="Ingredients" outlined></v-text-field>
      </v-col>
      <v-col class="py-0" cols="12">
        <v-text-field v-model="howToPreserve" label="How to preserve?" outlined></v-text-field>
      </v-col>
      <v-col class="py-0 mt-1" cols="12">
        <v-textarea v-model="desc" outlined name="input-7-4" label="Description"></v-textarea>
      </v-col>
      <v-col class="py-0 mb-8" cols="12">
        <v-divider></v-divider>
      </v-col>

      <!-- Choose Category -->

      <v-col class="py-0" cols="6">
        <ChooseCategory
          @choose-category="
            choosenCategoryID = $event.categoryID;
            choosenCategoryName = $event.categoryName;
          "
        />
      </v-col>
      <v-col class="py-0" cols="6">
        <p class="primary--text text-h5">Choose a category *</p>
        <p class="primary--text">Current Category:</p>
        <p>{{ choosenCategoryName }}</p>
      </v-col>
      <v-col class="mt-3" cols="12">
        <v-divider></v-divider>
      </v-col>

      <!-- Add Images -->

      <p class="primary--text text-h5 mb-8">Add Image(s) *</p>
      <v-col class="py-0" cols="12">
        <v-row class="pa-0">
          <v-col class="py-0" cols="8">
            <v-text-field dense v-model="newURL" label="Image URL*" outlined></v-text-field>
          </v-col>
          <v-col class="py-0" cols="4">
            <v-btn @click="addImage" height="38px" block color="primary">ADD</v-btn>
          </v-col>
          <v-card min-width="95" min-height="70" v-for="(url, i) in imageURLs" :key="i" class="ma-2 pa-1">
            <div class="d-flex justify-end">
              <v-btn style="z-index: 1" @click="removeImage(i)" absolute icon x-small class="contrast">
                <v-icon color="primary">close</v-icon>
              </v-btn>
            </div>
            <v-img max-width="95" aspect-ratio="1.1" :src="url"></v-img>
          </v-card>
        </v-row>
      </v-col>
      <v-col class="mt-3" cols="12">
        <v-divider></v-divider>
      </v-col>

      <!-- Certificates -->
      <p class="primary--text text-h5">Choose Certificate(s)</p>
      <v-col cols="12">
        <v-chip-group v-model="selectedCertificates" column multiple active-class="primary--text">
          <v-chip large filter v-for="certificate in availableCertificates" :key="certificate.cID">
            {{ certificate.cName }}
          </v-chip>
        </v-chip-group>
      </v-col>
      <v-col class="mt-3" cols="12">
        <v-divider></v-divider>
      </v-col>
      <!-- Number of items -->
      <p class="primary--text text-h5">Enter units in stock</p>
      <v-col cols="12">
        <v-text-field outlined type="number" v-model.number="unitsInStock" />
      </v-col>
      <v-col class="mt-3" cols="12">
        <v-divider></v-divider>
      </v-col>
      <p class="primary--text text-h5">Set Price</p>
      <v-col cols="12">
        <v-text-field outlined type="number" v-model.number="price" />
      </v-col>
    </v-row>
    <div class="mx-3 mt-12">
      <v-btn block elevation="0" color="primary" @click="saveProduct">Kaydet</v-btn>
    </div>
  </v-card>
</template>

<script>
import ChooseCategory from "./ChooseCategory.vue";
export default {
  props: ["type", "product"],
  data() {
    return {
      imageURLs: [],
      newURL: "",
      choosenCategoryID: 0,
      choosenCategoryName: "Tüm Ürünler",
      availableCertificates: [],
      selectedCertificates: [],
      productName: null,
      extraInfo: null,
      nutritionalValues: null,
      ingredients: null,
      howToPreserve: null,
      desc: null,
      unitsInStock: 0,
      price: 0,
    };
  },
  methods: {
    addImage() {
      this.imageURLs.push(this.newURL);
      this.newURL = "";
    },
    removeImage(idx) {
      this.imageURLs.splice(idx, 1);
    },
    saveProduct() {
      if (this.type == "edit")
        this.$api("editProductOfStore",
          {
            name: this.productName,
            extraInfo: this.extraInfo,
            nutrValues: this.nutritionalValues,
            ingredients: this.ingredients,
            howToPreserve: this.howToPreserve,
            desc: this.desc,
            price: this.price,
            unitsInStock: this.unitsInStock,
            categoryID: this.choosenCategoryID,
            images: this.imageURLs,
            certificates: this.selectedCertificates,
            productID: this.product
          }
        )
          .then(() => { this.$toast.success("Ürün güncellendi") })
          .catch((e) => {
            this.$toast.error("Bir hata oluştu")
            console.log(e.response.data)
          })

      else
        this.$api("addProductToStore",
          {
            name: this.productName,
            extraInfo: this.extraInfo,
            nutrValues: this.nutritionalValues,
            ingredients: this.ingredients,
            howToPreserve: this.howToPreserve,
            desc: this.desc,
            price: this.price,
            unitsInStock: this.unitsInStock,
            categoryID: this.choosenCategoryID,
            images: this.imageURLs,
            certificates: this.selectedCertificates
          }
        )
          .then(() => { this.$toast.success("Ürün mağazaya eklendi") })
          .catch((e) => {
            this.$toast.error("Bir hata oluştu")
            console.log(e.response.data)
          })
    }
  },
  mounted() {
    this.$api("getCertificates").then(({ data }) => {
      this.availableCertificates = data;
    });
    if (this.type == "edit")
      this.$api("getProductByID", this.product).then(({ data }) => {
        this.productName = data.productName
        this.extraInfo = data.extraInfo
        this.nutritionalValues = data.nutritionalValues
        this.ingredients = data.ingredients
        this.howToPreserve = data.howToPreserve
        this.desc = data.description
        this.choosenCategoryID = data.categoryID
        this.imageURLs = data.images
        this.selectedCertificates = data.certificates.map(e => e.cID)
        this.unitsInStock = data.unitsInStock
        this.price = data.pricePerUnit
      })
  },
  components: { ChooseCategory },
};
</script>

