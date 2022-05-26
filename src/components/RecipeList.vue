<template>
  <div class="recipe-list">
    <RecipeCard v-for="recipe in recipeList"
                :recipe="recipe"
                :key="recipe.id"
                v-on:delete-recipe="deleteRecipe"></RecipeCard>
  </div>
</template>

<script setup lang="ts">
import RecipeCard from "./RecipeCard.vue"
import {Recipe} from "@/model/Recipe";

interface Props {
  recipeList: Recipe[]
}

const props: Props = defineProps<Props>();

const emit = defineEmits(['delete-recipe']);

const deleteRecipe = (recipeId: string): void => emit('delete-recipe', recipeId);

</script>

<style scoped lang="scss">
.recipe-list {
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr 1fr;
}
</style>