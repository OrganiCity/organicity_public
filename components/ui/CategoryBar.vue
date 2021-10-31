<template>
  <v-card height="400" width="256" class="mx-auto" elevation="0" outlined>
    <v-list dense>
      <v-menu
        @input="test($event, index)"
        v-for="(category, index) in categories"
        :key="index"
        open-on-hover
        offset-x
      >
        <template v-slot:activator="{ on, attrs }">
          <v-hover v-slot="{ hover }">
            <v-list-item :class="{ secondary: hover || ifCategoryMenuOpen[index]}" v-on="on" v-bind="attrs">
              <v-icon left>mdi-food-steak</v-icon>
              <v-list-item-content class="font-weight-regular">
                {{ category.title }}
              </v-list-item-content>
              <v-icon right>navigate_next</v-icon>
            </v-list-item>
          </v-hover>
        </template>
        <v-card>
          <v-list>
            <template v-for="subCategory in category.subCategories">
              <v-list-item
                class="primary--text font-weight-medium"
                to="featured/egri15"
                :key="subCategory.title"
              >
                <v-list-item-content>
                  <v-list-item-title>
                    {{ subCategory.title }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-hover
                v-slot="{ hover }"
                v-for="subSubCategory in subCategory.subSubCategories"
                :key="`${subSubCategory}+${subCategory.title}`"
              >
                <v-list-item :class="{ secondary: hover }" to="featured/egri15">
                  <v-list-item-content>
                    <v-list-item-subtitle>
                      {{ subSubCategory }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-hover>
            </template>
          </v-list>
        </v-card>
      </v-menu>
    </v-list>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      ifCategoryMenuOpen: [],
      categories: [
        {
          title: "Et Ürünleri",
          subCategories: [
            {
              title: "Kırmızı Etler",
              subSubCategories: ["Dana Eti", "Kuzu Eti"],
            },
            {
              title: "Piliç/Hindi Eti",
              subSubCategories: ["Piliç Eti", "Hindi Eti"],
            },
            { title: "Et Şarküteri/Sakatat", subSubCategories: [] },
          ],
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