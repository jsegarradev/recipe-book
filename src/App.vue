<template>
  <div id="app">
    <div class="header">
      <img src="./assets/uoc-logo.png" class="logo">
      <span class="app-name">Recipe book</span>
    </div>
    <div class="content">
<!--      <TestElement :primary="true"></TestElement>-->
      <SearchBar></SearchBar>
      <RecipeList :recipeList="recipes"></RecipeList>
      <RecipeForm :hidden="!showModal"></RecipeForm>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {Difficulty} from "@/model/Difficulty";
import SearchBar from "@/components/SearchBar.vue";
import RecipeList from "@/components/RecipeList.vue";
import RecipeForm from "@/components/RecipeForm.vue";
import {Recipe} from "@/model/Recipe";

// import TestElement from "@/exercices-1-to-4/TestElement.vue";

interface ComponentData {
  showModal: boolean,
  recipes: Recipe[]
}

export default defineComponent({
  name: 'App',
  components: {
    SearchBar,
    RecipeList,
    RecipeForm,
    // TestElement
  },
  data(): ComponentData {
    return {
      showModal: true,
      recipes: [
        {
          id: 1,
          title: "Flan de huevo",
          imageUrl: "https://www.simplyrecipes.com/thmb/mbN8mXZ0srgAT1YrDU61183t0uM=/648x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Simply-Recipes-Homemade-Pizza-Dough-Lead-Shot-1b-ea13798d224048b3a28afb0936c9b645.jpg",
          servings: 4,
          time: '30min',
          difficulty: Difficulty.HARD,
          ingredients: ['Harina', 'Huevo'],
          directions: ['Clean your kitchen', 'Eat'],
          featured: true
        },
        {
          id: 2,
          title: "Flan de huevo",
          imageUrl: "https://www.simplyrecipes.com/thmb/7d0sunRXGIZmlgLft1k4MWJcBRw=/648x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/SimplyRecipes_Dakgangjeong_LEAD-5-b056c1dddb494f57892f65951915fdd8.jpg",
          servings: 4,
          time: '30min',
          difficulty: Difficulty.HARD,
          ingredients: ['Harina', 'Huevo'],
          directions: ['Clean your kitchen', 'Eat']
        },
        {
          id: 3,
          title: "Flan de huevo",
          imageUrl: "https://www.simplyrecipes.com/thmb/di-K0ibW-zy7M-IizHB5pXGvkPk=/648x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Simply-Recipes-Philly-Cheesesteak-Casserole-LEAD-2-48c7b81c69dc4130afa58795f6f6646f.jpg",
          servings: 4,
          time: '30min',
          difficulty: Difficulty.HARD,
          ingredients: ['Harina', 'Huevo'],
          directions: ['Clean your kitchen', 'Eat']
        },
        {
          id: 4,
          title: "Flan de huevo",
          imageUrl: "https://www.simplyrecipes.com/thmb/oFDeEmLMjdUr1wJrLFHFnNxHOmE=/648x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Temp-filename_-13-3bcd9c723b3444529950b8f2718130fb.jpg",
          servings: 4,
          time: '30min',
          difficulty: Difficulty.HARD,
          ingredients: ['Harina', 'Huevo'],
          directions: ['Clean your kitchen', 'Eat']
        },
        {
          id: 5,
          title: "Flan de huevo",
          imageUrl: "https://www.simplyrecipes.com/thmb/QE9_crwCVlAuHFrL8RHPcEYBOyM=/648x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Simply-Recipes-Vegetarian-Moussaka-LEAD-02-343afbc655ff48deb921bc27752b3b84.jpg",
          servings: 4,
          time: '30min',
          difficulty: Difficulty.HARD,
          ingredients: ['Harina', 'Huevo'],
          directions: ['Clean your kitchen', 'Eat'],
          featured: true
        }
      ],
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
