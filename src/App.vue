<template>
  <div id="app">
    <div class="header">
      <img src="./assets/uoc-logo.png" class="logo" alt="UOC logo"/>
      <span class="app-name">Recipe book</span>
    </div>

    <SearchBar v-on:showForm="toggleForm"
               v-on:search="setSearchTerm"/>

    <RecipeList :recipeList="recipeListFiltered"
                @delete-recipe="deleteRecipe"/>

    <RecipeForm v-if="showModal"
                v-on:addRecipe="addRecipe"
                v-on:closeModal="toggleForm"/>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import SearchBar from "@/components/SearchBar.vue";
import RecipeList from "@/components/RecipeList.vue";
import RecipeForm from "@/components/RecipeForm.vue";
import {Recipe} from "@/model/Recipe";
import axios from "axios";

interface ComponentData {
  showModal: boolean,
  searchTerm: string,
  recipes: Recipe[]
}

export default defineComponent({
  name: 'App',
  components: {
    SearchBar,
    RecipeList,
    RecipeForm,
  },
  methods: {
    async getRecipes() {
      await axios.get('http://localhost:3000/recipes')
          .then((response) => this.recipes = response.data.recipes)
          .catch((error) => console.log(error));
    },
    async addRecipe(recipe: Recipe) {
      await axios.post('http://localhost:3000/recipe', recipe)
          .then(() => console.log('Recipe created successfully'))
          .catch((error) => console.log(`Error: ${error}`))
          .finally(() => {
            this.toggleForm();
            this.getRecipes();
          });
    },
    async deleteRecipe(id: string) {
      await axios.delete('http://localhost:3000/recipe', {data: {id: id}})
          .then(() => console.log(`Recipe ${id} deleted successfully`))
          .catch((error) => console.log(`Error: ${error}`))
          .finally(() => this.getRecipes());
    },
    toggleForm(): void {
      this.showModal = !this.showModal;
    },
    setSearchTerm(searchTerm: string) {
      this.searchTerm = searchTerm;
    },
  },
  created() {
    this.getRecipes()
  },
  computed: {
    recipeListFiltered(): Recipe[] {
      if (!this.searchTerm) {
        return this.recipes;
      }
      return this.recipes.filter((recipe: Recipe) => {
        return (
            recipe.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
            recipe.ingredients
                .map((ingredient: string) => ingredient.toLowerCase())
                .includes(this.searchTerm.toLowerCase()));
      });
    },
  },
  data(): ComponentData {
    return {
      showModal: false,
      searchTerm: '',
      recipes: [],
    }
  }
})
</script>

<style lang="scss">
body {
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  flex-wrap: wrap;
  height: 100%;
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
}

.header {
  width: 100%;
  padding: 15px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ccc;
}

.header .logo {
  max-height: 50px;
}

.header .app-name {
  margin-left: 25px;
  font-weight: bold;
  font-size: 20px;
}
</style>
