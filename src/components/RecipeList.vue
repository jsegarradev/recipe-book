<template>
  <div class="recipe-list">
    <RecipeCard v-for="recipe in props.recipeList"
                :recipe="recipe"
                :key="recipe.id"
                @delete-recipe="(id) => $emit('delete-recipe',id)"></RecipeCard>
  </div>
</template>

<script setup lang="ts">
import {Recipe} from "@/model/Recipe";

interface Props {
  recipeList: {
    type: Recipe[],
    require: true
  }
}

const props = defineProps<Props>();
</script>

<script lang="ts">
import {defineComponent} from "vue";
import RecipeCard from "@/components/RecipeCard.vue";

export default defineComponent({
  name: "RecipeList",
  components: {
    RecipeCard
  }
})
</script>

<style scoped lang="scss">
.recipe-list {
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr 1fr;
}
</style>