<template>
  <div>
    <v-dialog :max-width="modalMaxWidth" v-model="addModalShown">
      <v-card>
        
        <v-form ref="form" class="pa-7">
          <h2 class="primary--text mb-3">Add a New Slide</h2>
          <v-text-field
            autocomplete="off"
            v-model="newSlide.route"
            label="URL"
            required
            outlined
          ></v-text-field>

          <v-text-field
            autocomplete="off"
            v-model="newSlide.src"
            label="Image URL"
            required
            outlined
          ></v-text-field>

          <v-btn color="primary" class="mr-4" @click="addSlide">Add Slide</v-btn>
        </v-form>
      </v-card>
    </v-dialog>

    <v-container>
    <h1 class="primary--text">Main Carousel Management</h1>
      <draggable style="overflow-x:auto;" class="d-flex" v-model="slides" group="slides">
       <v-card v-for="(element, i) in slides" :key="element.name"
            class="ma-4"
          >
          <v-img width="300" :src="element.src"></v-img>
          <v-btn @click="removeSlide(i)" absolute top right icon small class="contrast"><v-icon color="primary" >close</v-icon></v-btn>
    
    
        </v-card>
      </draggable>
        <v-btn class="ma-4" color="primary" @click.stop="addModalShown=true" large>Add New Slide</v-btn>
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
        idx: 0,
        route: "",
        src: ""
      }
    };
  },
  methods: {
    removeSlide (idx) {
      this.$api("removeCarouselSlide", {idx: idx}).then((res) => {
        if(res.status!=200)
          console.log(res.status);
        else {
          this.slides.splice(idx, 1);
          this.$toast.success("Slide removed successfully!");
        }
      });
      console.log(this.slides);
    },
    addSlide () {
      this.$api("addCarouselSlide", {...this.newSlide, idx:this.slides.length}).then((res) => {
        if(res.status!=200)
          console.log(res.status);
        else {
          this.slides.push(this.newSlide);
          this.$toast.success("Slide added successfully!");
        }
        this.newSlide = {};
        this.addModalShown=false;
      });
      console.log(this.slides);
    }
  },
  mounted() {
    this.$api("getCarouselSlides").then(({ data }) => {
      this.slides = data;
      console.log(data);
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