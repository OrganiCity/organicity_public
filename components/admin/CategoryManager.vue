<template>
  <v-row class="mt-1">
    <v-col cols="12"><h1 class="primary--text">Category Management</h1></v-col>
    <v-col cols="3"><CategoryBar /></v-col>
    <v-col cols="9">
      <v-row>
        <!-- Add Top -->
        <v-col cols="6">
          <v-dialog overlay-color="secondary" max-width="500px" v-model="addCategoryTopShown">
            <v-card>
              <v-form ref="form" class="pa-7">
                <h2 class="primary--text mb-3">Add New Category to Top</h2>
                <v-text-field v-model="categoryName" autocomplete="off" label="Category Name" required outlined></v-text-field>
                <v-text-field v-model="iconTag" autocomplete="off" label="Icon Tag" required outlined></v-text-field>
                <v-btn @click="addCategoryToTop" color="primary" class="mr-4">Add Category</v-btn>
              </v-form>
            </v-card>
          </v-dialog>
          <v-btn block color="primary" @click.stop="addCategoryTopShown = true" large>Add Category to Top</v-btn>
        </v-col>

        <!-- Add Between -->
        <v-col cols="6">
          <v-dialog overlay-color="secondary" max-width="500px" v-model="addBelow">
            <v-card>
              <v-form ref="form" class="pa-7">
                <h2 class="primary--text mb-3">Add a Category below a category</h2>
                <v-text-field
                  v-model="upperCategoryName"
                  autocomplete="off"
                  label="Upper Category Name"
                  required
                  outlined
                ></v-text-field>

                <v-text-field v-model="categoryName" autocomplete="off" label="Category Name" required outlined></v-text-field>
                <v-text-field v-model="iconTag" autocomplete="off" label="Icon Tag" required outlined></v-text-field>
                <v-btn @click="addCategoryBelow" color="primary" class="mr-4">Add Category</v-btn>
              </v-form>
            </v-card>
          </v-dialog>
          <v-btn block color="primary" @click.stop="addBelow = true" large>Add a Category below a category</v-btn>
        </v-col>

        <!-- Sub Category -->
        <v-col cols="6">
          <v-dialog overlay-color="secondary" max-width="500px" v-model="addSubCategoryShown">
            <v-card>
              <v-form ref="form" class="pa-7">
                <h2 class="primary--text mb-3">Add a Sub Category</h2>
                <v-text-field
                  v-model="parentCategoryName"
                  autocomplete="off"
                  label="Parent Category Name"
                  required
                  outlined
                ></v-text-field>
                <v-text-field v-model="categoryName" autocomplete="off" label="Category Name" required outlined></v-text-field>
                <v-text-field v-model="iconTag" autocomplete="off" label="Icon Tag" required outlined></v-text-field>
                <v-btn @click="addSubCategory" color="primary" class="mr-4">Add Category</v-btn>
              </v-form>
            </v-card>
          </v-dialog>
          <v-btn block color="primary" @click.stop="addSubCategoryShown = true" large>Add a Sub Category</v-btn>
        </v-col>
        <!-- Update -->
        <v-col cols="6">
          <v-dialog overlay-color="#ADD8E6" max-width="500px" v-model="updateCategoryShown">
            <v-card>
              <v-form ref="form" class="pa-7">
                <h2 class="info--text mb-3">Update a Category Name</h2>
                <v-text-field
                  v-model="categoryName"
                  color="info"
                  autocomplete="off"
                  label="Old Category Name"
                  required
                  outlined
                ></v-text-field>
                <v-text-field
                  v-model="newCategoryName"
                  color="info"
                  autocomplete="off"
                  label="New Category Name"
                  required
                  outlined
                ></v-text-field>
                <v-btn @click="updateCategory" color="info" class="mr-4">Update the Category</v-btn>
              </v-form>
            </v-card>
          </v-dialog>
          <v-btn block color="info" @click.stop="updateCategoryShown = true" large>Update a Category Name</v-btn>
        </v-col>
        <!-- Delete -->
        <v-col cols="6">
          <v-dialog overlay-color="#ffcccb70" max-width="500px" v-model="deleteCategoryShown">
            <v-card>
              <v-form ref="form" class="pa-7">
                <h2 class="error--text mb-3">Delete a Category</h2>
                <v-text-field
                  v-model="categoryName"
                  color="error"
                  autocomplete="off"
                  label="Category Name"
                  required
                  outlined
                ></v-text-field>
                <v-btn @click="deleteCategory" color="error" class="mr-4">Delete the Category</v-btn>
              </v-form>
            </v-card>
          </v-dialog>
          <v-btn block color="error" @click.stop="deleteCategoryShown = true" large>Delete a Category</v-btn>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import CategoryBar from "~/components/ui/CategoryBar.vue";
export default {
  components: {
    CategoryBar,
  },
  data() {
    return {
      categoryName: "",
      newCategoryName: "",
      iconTag: "",
      parentCategoryName: "",
      upperCategoryName: "",
      addCategoryTopShown: false,
      addBelow: false,
      addSubCategoryShown: false,
      updateCategoryShown: false,
      deleteCategoryShown: false,
    };
  },
  methods: {
    addCategoryToTop() {
      this.$api("addCategoryToTop", { categoryName: this.categoryName, iconTag: this.iconTag }).then((res) => {
        location.reload();
      });
    },
    addCategoryBelow() {
      this.$api("addCategoryBelow", {
        upperCategoryName: this.upperCategoryName,
        categoryName: this.categoryName,
        iconTag: this.iconTag,
      }).then((res) => {
        location.reload();
      });
    },
    addSubCategory() {
      this.$api("addSubCategory", {
        parentCategoryName: this.parentCategoryName,
        categoryName: this.categoryName,
        iconTag: this.iconTag,
      }).then((res) => {
        location.reload();
      });
    },
     updateCategory() {
      this.$api("updateCategory", {
        newCategoryName: this.newCategoryName,
        oldCategoryName: this.categoryName,
      }).then((res) => {
        location.reload();
      });
    },
     deleteCategory() {
      this.$api("deleteCategory", {
        categoryName: this.categoryName,
      }).then((res) => {
        location.reload();
      });
    },
  },
};
</script>

<style>
</style>