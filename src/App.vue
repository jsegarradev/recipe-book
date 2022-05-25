<template>
  <div id="app">
    <div class="header">
      <img src="./assets/uoc-logo.png" class="logo" alt="UOC logo"/>
      <span class="app-name">Recipe book</span>
    </div>

    <SearchBar v-on:showForm="toggleForm"
               v-on:search="setSearchTerm"/>

    <RecipeList :recipeList="filterRecipeList"
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

const searchTerm: Ref<string> = ref('');
const recipes: Ref<Recipe[]> = ref([]);

onMounted(async () => {
  console.log("aaaa");
  await getRecipes();
});

const getRecipes = async (): Promise<void> => {
  await axios.get('http://localhost:3000/recipes')
      .then((response) => {
        recipes.value = response.data.recipes;
        console.log(recipes.value)
      })
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

const setSearchTerm = (value: string): void => {
  searchTerm.value = value
};

const filterRecipeList = (): Recipe[] => {
  if (searchTerm.value) {
    let foundBy = (recipe: Recipe): [boolean, boolean] => ([
      recipe.title.toLowerCase().includes(searchTerm.value.toLowerCase()),
      recipe.ingredients.map((i) => i.toLowerCase()).includes(searchTerm.value.toLowerCase())
    ]);
    return recipes.value.filter((recipe: Recipe) => foundBy(recipe)[0] || foundBy(recipe)[1]);
  } else {
    return [];
  }
}

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
