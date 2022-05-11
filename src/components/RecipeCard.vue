<template>
  <div class="recipe" :class="{featured: props.recipe.featured}">
    <button v-on:click="deleteRecipe(props.recipe.id)" class="delete-recipe">
      <img src="../assets/delete-button.svg">
    </button>
    <h2 class="recipe-title">{{ props.recipe.title }}</h2>
    <div class="recipe-image">
      <img :src="props.recipe.imageUrl"/>
    </div>
    <div class="recipe-info">
      <div class="recipe-info-item">
        <span class="recipe-info-label">Portions</span>
        <span class="recipe-info-value">{{props.recipe.servings}}</span>
      </div>
      <div class="recipe-info-item">
        <span class="recipe-info-label">Preparation time</span>
        <span class="recipe-info-value">{{props.recipe.time}}</span>
      </div>
      <div class="recipe-info-item">
        <span class="recipe-info-label">Difficulty</span>
        <span class="recipe-info-value">{{props.recipe.difficulty}}</span>
      </div>
    </div>
    <div class="recipe-ingredients">
      <h3 class="recipe-ingredients-title">Ingredients</h3>
      <ul class="recipe-ingredients-list">
        <li v-for="item in props.recipe.ingredients" :key="item">
          {{item}}
        </li>
      </ul>
    </div>
    <div class="recipe-directions">
      <h3 class="recipe-directions-title">Directions</h3>
      <ul class="recipe-directions-list">
        <li v-for="item in props.recipe.directions" :key="item">
          {{item}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import {Recipe} from "@/model/Recipe";

interface Props {
  recipe: Recipe
}

const props = defineProps<Props>();
</script>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "RecipeCard",
  methods: {
    deleteRecipe(recipeId: string) {
      this.$emit("delete-recipe", recipeId);
    },
  },
})
</script>

<style scoped lang="scss">
.recipe {
  padding: 20px;
  border: 1px solid #ccc;
  margin: 20px;
  border-radius: 4px;
  display: block;
  position: relative;
}

.recipe.featured {
  background-color: #f5f5f5;
}

.recipe-title {
  font-weight: bold;
  font-size: 28px;
}

.recipe-image {
  margin-bottom: 20px;
  max-height: 160px;
  overflow: hidden;
}

.recipe-image img {
  width: 100%;
}

.recipe-info {
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
}

.recipe-info-label {
  font-weight: bold;
  margin-right: 5px;
}

.recipe-ingredients,
.recipe-directions {
  margin-bottom: 20px;
  text-align: left;
}

.recipe-ingredients-title,
.recipe-directions-title {
  font-weight: bold;
  margin-bottom: 10px;
}

.recipe-ingredients-list,
.recipe-directions-list {
  padding: 0;
  margin: 0;
  margin-left: 18px;
}

.delete-recipe {
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: 0;
  padding: 0;
  cursor: pointer;
}

.delete-recipe img {
  width: 20px;
}
</style>

