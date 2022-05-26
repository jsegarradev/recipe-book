<template>
  <div class="modal-container">
    <div class="recipe-form">
      <div class="recipe-form-header">
        <h2>Add a new recipe</h2>
        <button v-on:click="closeForm">
          <img src="../assets/close-button.svg" alt="Close modal"/>
        </button>
      </div>
      <div class="error" v-if="error">
        The fields name, ingredients and directions are required.
      </div>
      <form v-on:submit.prevent="submitForm" id="form">
        <div class="recipe-form-item">
          <label for="title">Title:</label><br>
          <input type="text" id="title" name="title" v-model="recipe.title">
        </div>
        <div class="recipe-form-item">
          <label for="imageUrl">Image URL:</label>
          <input type="text" id="imageUrl" name="imageUrl" v-model="recipe.imageUrl">
        </div>
        <div class="recipe-form-item">
          <label for="servings">Portions:</label>
          <input type="text" id="servings" name="servings" v-model="recipe.servings">
        </div>
        <div class="recipe-form-item">
          <label for="time">Time:</label><br>
          <input type="text" id="time" name="time" v-model="recipe.time">
        </div>
        <div class="recipe-form-item">
          <label for="difficulty">Difficulty:</label><br>
          <select id="difficulty" name="difficulty" v-model="recipe.difficulty">
            <option v-for="item in difficultyOptions" :key="item">{{ item }}</option>
          </select>
        </div>
        <div class="recipe-form-item">
          <label for="ingredients">Ingredients:</label><br>
          <textarea type="text" id="ingredients" name="ingredients" v-model="rawIngredients"></textarea>
        </div>
        <div class="recipe-form-item">
          <label for="directions">Directions:</label><br>
          <textarea type="text" id="directions" name="directions" v-model="rawDirections"></textarea>
        </div>
        <div class="recipe-form-item">
          <label for="featured">Featured recipe</label><br>
          <input type="checkbox" id="featured" name="featured" v-model="recipe.featured">
        </div>
        <div class="recipe-form-item">
          <button type="submit">Add Recipe</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import {Ref, ref} from "vue";
import {Difficulty} from "@/model/Difficulty";
import {Recipe} from "@/model/Recipe";
import {v4 as uuid} from 'uuid';

const recipe: Ref<Recipe> = ref(
    {
      id: '',
      title: '',
      imageUrl: '',
      servings: 0,
      time: '',
      difficulty: Difficulty.EASY,
      ingredients: [],
      directions: []
    });

const rawIngredients: Ref<string> = ref('');
const rawDirections: Ref<string> = ref('');
const difficultyOptions: { value: string }[] = [
  {value: Difficulty.HARD},
  {value: Difficulty.MEDIUM},
  {value: Difficulty.EASY}
];

const error: Ref<boolean> = ref(false);

const emit = defineEmits(['add-recipe', 'close-modal']);

const submitForm = (): void => {
  validateForm();
  if(!error.value){
    saveRecipe();
    resetRecipe();
  }
}

const validateForm = (): void => {
  error.value = (
      recipe.value.title.length === 0 ||
      recipe.value.ingredients.length === 0 ||
      recipe.value.directions.length === 0);
}

const saveRecipe = (): void => {
  recipe.value.id = uuid();
  recipe.value.ingredients = rawIngredients.value.split(',');
  recipe.value.directions = rawDirections.value.split(',');
  emit('add-recipe', recipe.value);
}

const resetRecipe = (): void => {
  recipe.value = {
    id: '',
    title: '',
    imageUrl: '',
    servings: 0,
    time: '',
    difficulty: Difficulty.EASY,
    ingredients: [],
    directions: []
  };
}

const closeForm = (): void => emit('close-modal');

</script>

<style scoped lang="scss">
.modal-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 10;
}

.recipe-form {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  max-width: 500px;
  background: #fff;
  padding: 20px;
  border-radius: 5px;
}

.recipe-form-header {
}

.recipe-form-header button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: 0;
  padding: 0;
  cursor: pointer;
}

.recipe-form-header button img {
  width: 20px;
}

.recipe-form-item {
  margin-bottom: 20px;
}

.recipe-form-item label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

.recipe-form-item input,
.recipe-form-item select,
.recipe-form-item textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  max-width: 300px;
}

.recipe-form-item button {
  background: #4caf50;
  color: #fff;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.error {
  color: red;
  margin-bottom: 20px;
}
</style>