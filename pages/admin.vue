<template>
  <v-container>
    <div>
      <draggable class="d-flex" v-model="slides" group="slides" @start="drag=true" @end="drag=false">
       <v-card v-for="(element, i) in slides" :key="element.name"
            class="ma-4"
          >
          <v-img width="350" :src="element.src"></v-img>
          <v-btn @click="removeSlide(i)" absolute top right icon small class="contrast"><v-icon color="primary" >close</v-icon></v-btn>
    
    
        </v-card>
        <v-btn slot="footer">Add</v-btn>
      </draggable>
    </div>
  </v-container>
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