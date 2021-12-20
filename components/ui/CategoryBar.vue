<template>
  <v-card height="400" width="256" class="mx-auto" elevation="0" outlined>
    <v-list dense>
      <v-menu @input="test($event, index)" v-for="(category, index) in categories" :key="index" open-on-hover offset-x>
        <template v-slot:activator="{ on, attrs }">
          <v-hover v-slot="{ hover }">
            <v-list-item
              @click="$router.push(`/search?cat=${category.categoryID}&limitCats=${category.categoryID}`)"
              :class="{ secondary: hover || ifCategoryMenuOpen[index] }"
              v-on="on"
              v-bind="attrs"
            >
              <v-icon left>{{ category.iconTag }}</v-icon>
              <v-list-item-content class="font-weight-regular">
                {{ $i18n(category.name) == "no-translation-error" ? category.name : $i18n(category.name) }}
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
                @click="$router.push(`/search?cat=${subCategory.categoryID}&limitCats=${subCategory.categoryID}`)"
                :key="subCategory.categoryID"
              >
                <v-list-item-content>
                  <v-list-item-title>
                    {{ $i18n(subCategory.name) == "no-translation-error" ? subCategory.name : $i18n(subCategory.name) }}
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
                  @click="$router.push(`/search?cat=${subSubCategory.categoryID}&limitCats=${subSubCategory.categoryID}`)"
                >
                  <v-list-item-content>
                    <v-list-item-subtitle>
                      {{ $i18n(subSubCategory.name) }}
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