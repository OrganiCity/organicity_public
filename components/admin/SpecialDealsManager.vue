<template>
  <div>
    <v-dialog :max-width="modalMaxWidth" :value="addModalShown">
      <v-card>
        
        <v-form ref="form" class="pa-7">
          <h2 class="primary--text mb-3">Add a New Slide</h2>
          <v-text-field
            autocomplete="off"
            v-model="newSlide.productID"
            label="Product ID"
            required
            outlined
          ></v-text-field>

          <v-text-field
            autocomplete="off"
            v-model="newSlide.src"
            label="Product Image URL"
            required
            outlined
          ></v-text-field>

          <v-btn color="primary" class="mr-4" @click="addSlide">Add Slide</v-btn>
        </v-form>
      </v-card>
    </v-dialog>
    
    <v-container>
    <h1 class="primary--text">Special Deals Management</h1>
      <draggable style="overflow-x:auto;" class="d-flex" v-model="slides" group="slides" @start="drag=true" @end="drag=false">
       <v-card v-for="(element, i) in slides" :key="element.name"
            class="ma-4"
          >
          <v-img width="180" :src="element.src"></v-img>
          <v-btn @click="removeSlide(i)" absolute top right icon small class="contrast"><v-icon color="primary" >close</v-icon></v-btn>
        </v-card>
      </draggable>
        <v-btn class="ma-4" color="primary" @click.stop="addModalShown=true" large>Add New Product</v-btn>
    </v-container>
  </div>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  components: {draggable},
  layout: "admin",
  data() {
    return {
      slides: [],
      drag: false,
      addModalShown: false,
      newSlide: {
        productID: "",
        src: ""
      }
    };
  },
  methods: {
    removeSlide (idx) {
      this.$api("removeSpecialDeal", {idx: idx}).then((res) => {
        if(res.status!=200)
          this.$toast.success("Couldn't remove deal!");
        else {
          this.slides.splice(idx, 1);
          this.$toast.success("Deal removed successfully!");
        }
      });
    },
    addSlide () {
      this.$api("addSpecialDeal", {...this.newSlide, idx:this.slides.length}).then((res) => {
        if(res.status!=200)
          this.$toast.success("Couldn't add deal!");
        else {
          this.slides.push(this.newSlide);
          this.$toast.success("New deal added successfully!");
        }
        this.newSlide = {};
        this.addModalShown=false;
      });
    }
  },
  mounted() {
    this.$api("getSpecialDeals").then(({ data }) => {
      console.log(data);
      this.slides = data;
    });
  },
  computed: {
    modalMaxWidth() {
      let screen = this.$vuetify.breakpoint.name;
      switch (screen) {
        case "xs":
          return "100%";
        case "sm":
          return "50%";
        default:
          return "500px";
      }
    }
  },
}
</script>

<style>

</style>