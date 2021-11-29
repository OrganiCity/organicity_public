<template>
  <v-card height="400" width="256" class="mx-auto" elevation="0" outlined>
    <v-list dense>
      <v-menu
        @input="test($event, index)"
        v-for="(tab, index) in tabs"
        :key="index"
        offset-x
      >
        <template v-slot:activator="{ on, attrs }">
          <v-hover v-slot="{ hover }">
            <v-list-item :class="{ secondary: hover}" v-on="on" v-bind="attrs" :to="tab.route">
              <v-icon left>settings</v-icon>
              <v-list-item-content class="font-weight-regular">
                {{ tab.title }}
              </v-list-item-content>
            </v-list-item>
          </v-hover>
        </template>
      </v-menu>
    </v-list>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      ifCategoryMenuOpen: [false, false],
      tabs: [
        {
          title: "Categories",
          route: "/admin/categories",
        },
        {
          title: "Special Deals",
          route: "/admin/special-deals",
        },
        {
          title: "Main Carousel",
          route: "/admin/carousel-management",
        },
      ],
    };
  },
  methods: {
    test(e, index) {
      this.ifCategoryMenuOpen[index]=e;
    },
  },
};
</script>

<style scoped>
.onHover {
  background-color: #2dbd9c30;
}
</style>