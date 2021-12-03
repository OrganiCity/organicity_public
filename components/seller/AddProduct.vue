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
        <v-text-field label="Name*" outlined></v-text-field>
      </v-col>
      <v-col class="py-0" cols="12">
        <v-text-field label="Additional Information" outlined></v-text-field>
      </v-col>
      <v-col class="py-0" cols="12">
        <v-text-field label="Nutrional Values" outlined></v-text-field>
      </v-col>
      <v-col class="py-0" cols="12">
        <v-text-field label="Ingredients" outlined></v-text-field>
      </v-col>
      <v-col class="py-0" cols="12">
        <v-text-field label="How to preserve?" outlined></v-text-field>
      </v-col>
      <v-col class="py-0 mt-1" cols="12">
        <v-textarea outlined name="input-7-4" label="Description"></v-textarea>
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
        <p>Choose a category *</p>
        <p>{{ choosenCategoryName }}</p>
      </v-col>
      <v-col class="mt-3" cols="12">
        <v-divider></v-divider>
      </v-col>

      <!-- Add Images -->

      <p class="primary--text text-h5 mb-8">Add Image(s) *</p>
      <v-col class="py-0" cols="12">
        <v-row class="pa-0" >
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
        <v-chip-group multiple active-class="primary--text">
          <v-chip large v-for="tag in availableCertificates" :key="tag">
            {{ tag }}
          </v-chip>
        </v-chip-group>
      </v-col>
    </v-row>
    <div class="mx-3 mt-12">
      <v-btn block elevation="0" color="primary">Kaydet</v-btn>
    </div>
  </v-card>
</template>

<script>
import ChooseCategory from "./ChooseCategory.vue";
export default {
  data() {
    return {
      imageURLs: [],
      newURL: "",
      choosenCategoryID: 0,
      choosenCategoryName: "Tüm Ürünler",
      availableCertificates: ["Organik Ürün", "Pestisit Analizli","Yerli Üretim", "Vegan"],
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
  },
  mounted(){

  },
  components: { ChooseCategory },
};
</script>

