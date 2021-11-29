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
                <v-text-field autocomplete="off" label="Category Name" required outlined></v-text-field>
                <v-text-field autocomplete="off" label="Icon Tag" required outlined></v-text-field>
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
                <v-text-field autocomplete="off" label="Upper Category Name" required outlined></v-text-field>

                <v-text-field autocomplete="off" label="Category Name" required outlined></v-text-field>
                <v-text-field autocomplete="off" label="Icon Tag" required outlined></v-text-field>
                <v-btn color="primary" class="mr-4">Add  Category</v-btn>
              </v-form>
            </v-card>
          </v-dialog>
          <v-btn block color="primary" @click.stop="addBelow = true" large>Add a Category below a category</v-btn>
        </v-col>

        <!-- Sub Category -->
        <v-col cols="6">
          <v-dialog overlay-color="secondary" max-width="500px" v-model="addSubCategory">
            <v-card>
              <v-form ref="form" class="pa-7">
                <h2 class="primary--text mb-3">Add a Sub Category</h2>
                <v-text-field autocomplete="off" label="Category Name" required outlined></v-text-field>
                <v-text-field autocomplete="off" label="Icon Tag" required outlined></v-text-field>
                <v-btn color="primary" class="mr-4">Add Category</v-btn>
              </v-form>
            </v-card>
          </v-dialog>
          <v-btn block color="primary" @click.stop="addSubCategory = true" large>Add a Sub Category</v-btn>
        </v-col>
        <!-- Update -->
        <v-col cols="6">
          <v-dialog overlay-color="#ADD8E6" max-width="500px" v-model="updateCategory">
            <v-card>
              <v-form ref="form" class="pa-7">
                <h2 class="info--text mb-3">Update a Category Name</h2>
                <v-text-field color="info" autocomplete="off" label="Category Name" required outlined></v-text-field>
                <v-text-field color="info" autocomplete="off" label="Image URL" required outlined></v-text-field>
                <v-btn color="info" class="mr-4">Update the Category</v-btn>
              </v-form>
            </v-card>
          </v-dialog>
          <v-btn block color="info" @click.stop="updateCategory = true" large>Update a Category Name</v-btn>
        </v-col>
        <!-- Delete -->
        <v-col cols="6">
          <v-dialog overlay-color="#ffcccb70" max-width="500px" v-model="deleteCategory">
            <v-card>
              <v-form ref="form" class="pa-7">
                <h2 class="error--text mb-3">Delete a Category</h2>
                <v-text-field color="error" autocomplete="off" label="Category Name" required outlined></v-text-field>
                <v-text-field color="error" autocomplete="off" label="Image URL" required outlined></v-text-field>
                <v-btn color="error" class="mr-4">Delete the Category</v-btn>
              </v-form>
            </v-card>
          </v-dialog>
          <v-btn block color="error" @click.stop="deleteCategory = true" large>Delete a Category</v-btn>
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
      addCategoryTopShown: false,
      addBelow: false,
      addSubCategory: false,
      updateCategory: false,
      deleteCategory: false,
    };
  },
  methods: {
    addCategoryToTop() {},
    addCategoryBelow () {},

  },
};
</script>

<style>
</style>