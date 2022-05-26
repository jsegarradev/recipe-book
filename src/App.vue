<template>
  <div id="app">
    <div class="header">
      <img src="./assets/uoc-logo.png" class="logo" alt="UOC logo"/>
      <span class="app-name">Recipe book</span>
    </div>

    <SearchBar v-on:showForm="toggleForm"
               v-on:search="filterRecipeList"/>

    <RecipeList :recipeList="filteredRecipes"
                @delete-recipe="deleteRecipe"/>

    <RecipeForm v-if="showModal"
                v-on:addRecipe="addRecipe"
                v-on:closeModal="toggleForm"/>
  </div>
</template>

<script setup lang="ts">
import RecipeForm from "./components/RecipeForm.vue";
import RecipeList from "./components/RecipeList.vue";
import SearchBar from "./components/SearchBar.vue";
import {onMounted, Ref, ref} from "vue";
import {Recipe} from "@/model/Recipe";
import axios from "axios";

const showModal: Ref<boolean> = ref(false);

const recipes: Ref<Recipe[]> = ref([]);
const filteredRecipes: Ref<Recipe[]> = ref([]);

onMounted(async () => {
  await getRecipes();
  filterRecipeList('');
});

const getRecipes = async (): Promise<void> => {
  await axios.get('http://localhost:3000/recipes')
      .then((response) => recipes.value = response.data.recipes)
      .catch((error) => console.log(error));
}

const addRecipe = async (recipe: Recipe): Promise<void> => {
  await axios.post('http://localhost:3000/recipe', recipe)
      .then(() => console.log('Recipe created successfully'))
      .catch((error) => console.log(`Error: ${error}`))
      .finally(() => {
        toggleForm();
        getRecipes();
      });
}

const deleteRecipe = async (recipeId: string): Promise<void> => {
  await axios.delete('http://localhost:3000/recipe', {data: {id: recipeId}})
      .then(() => console.log(`Recipe ${recipeId} deleted successfully`))
      .catch((error) => console.log(`Error: ${error}`))
      .finally(() => getRecipes());
}

const toggleForm = (): void => {
  showModal.value = !showModal.value
};

const filterRecipeList = (search: string): void => {
  if(search){
    filteredRecipes.value = recipes.value;
    filteredRecipes.value = filteredRecipes.value
        .filter((recipe: Recipe) => searchBy(recipe,search)[0] || searchBy(recipe,search)[1]);
  } else {
    filteredRecipes.value = recipes.value;
  }
}

const searchBy = (recipe: Recipe, search:string): [boolean, boolean] => ([
  recipe.title.toLowerCase().includes(search.toLowerCase()),
  recipe.ingredients.map((i) => i.toLowerCase()).includes(search.toLowerCase())
]);

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
