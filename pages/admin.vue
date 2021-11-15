<template>
  <div>
    <draggable class="d-flex" v-model="slides" group="slides" @start="drag=true" @end="drag=false">
     <v-card v-for="(element, i) in slides" :key="element.name"
          class="ma-4"
          height="150"
          width="300"
        >

        <v-card-title class="align-start" primary-title>
          <v-btn @click="removeSlide(i)" icon><v-icon color="primary">close</v-icon></v-btn>
        </v-card-title>
        
        <v-img height="100%" :src="element.src" contain></v-img>

        
      </v-card>
      <v-btn slot="footer">Add</v-btn>
    </draggable>
  </div>
</template>

<script>
import draggable from "vuedraggable";

export default {
  components: { draggable },
  data() {
    return {
      slides: [],
      drag: false,
    };
  },
  methods: {
    removeSlide (idx) {
      this.slides.splice(idx,1);
    }
  },
  mounted() {
    this.$api("getFeaturedImages").then(({ data }) => {
      this.slides = data;
      console.log(data);
    });
  },
};
</script>