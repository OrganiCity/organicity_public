<template>
  <v-card height="auto" width="256" class="mx-auto" elevation="0" outlined>
    <v-list dense>
      <v-menu @input="test($event, index)" v-for="(category, index) in categories" :key="index" open-on-hover offset-x>
        <template v-slot:activator="{ on, attrs }">
          <v-hover v-slot="{ hover }">
            <v-list-item
              :class="{ secondary: hover || ifCategoryMenuOpen[index] }"
              @click="$emit('choose-category', { categoryName: category.name, categoryID: category.categoryID })"
              v-on="on"
              v-bind="attrs"
            >
              <v-icon left>{{ category.iconTag }}</v-icon>
              <v-list-item-content class="font-weight-regular">
                {{ category.name }}
              </v-list-item-content>
              <v-icon v-if="category.children.length" right>navigate_next</v-icon>
            </v-list-item>
          </v-hover>
        </template>
        <v-card v-if="category.children.length">
          <v-list>
            <template v-for="subCategory in category.children">
              <v-list-item
                class="primary--text font-weight-medium"
                @click="$emit('choose-category', { categoryName: subCategory.name, categoryID: subCategory.categoryID })"
                :key="subCategory.categoryID"
              >
                <v-list-item-content>
                  <v-list-item-title>
                    {{ subCategory.name }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-hover
                v-slot="{ hover }"
                v-for="subSubCategory in subCategory.children"
                :key="`${subSubCategory.name}+${subCategory.name}`"
              >
                <v-list-item
                  :class="{ secondary: hover }"
                  @click="$emit('choose-category', { categoryName: subSubCategory.name, categoryID: subSubCategory.categoryID })"
                >
                  <v-list-item-content>
                    <v-list-item-subtitle>
                      {{ subSubCategory.name }}
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
      categories: [],
    };
  },
  methods: {
    test(e, index) {
      this.ifCategoryMenuOpen[index] = e;
    },
    getCategories() {
      this.$api("getCategories").then(({ data }) => {
        this.categories = data;
      });
    },
  },
  mounted() {
    this.getCategories();
  },
};
</script>

<style scoped>
.onHover {
  background-color: #2dbd9c30;
}
</style>