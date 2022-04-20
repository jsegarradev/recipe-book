<template>
  <div class="modal-container">
    <div class="recipe-form">
      <div class="recipe-form-header">
        <h2>Add a new recipe</h2>
        <button class="delete-recipe">
          <img src="../assets/close-button.svg">
        </button>
      </div>
      <form id="form">
        <div class="recipe-form-item">
          <label for="title">Title:</label><br>
          <input type="text" id="title" name="title">
        </div>
        <div class="recipe-form-item">
          <label for="imageUrl">Image URL:</label>
          <input type="text" id="imageUrl" name="imageUrl">
        </div>
        <div class="recipe-form-item">
          <label for="servings">Portions:</label>
          <input type="text" id="servings" name="servings">
        </div>
        <div class="recipe-form-item">
          <label for="time">Time:</label><br>
          <input type="text" id="time" name="time">
        </div>
        <div class="recipe-form-item">
          <label for="difficulty">Difficulty:</label><br>
          <select id="difficulty" name="difficulty">
            <option v-for="item in difficultyOptions" :key="item">{{ item.value }}</option>
          </select>
        </div>
        <div class="recipe-form-item">
          <label for="ingredients">Ingredients:</label><br>
          <textarea type="text" id="ingredients" name="ingredients"></textarea>
        </div>
        <div class="recipe-form-item">
          <label for="directions">Directions:</label><br>
          <textarea type="text" id="directions" name="directions"></textarea>
        </div>
        <div class="recipe-form-item">
          <label for="featured">Featured recipe</label><br>
          <input type="checkbox" id="featured" name="featured">
        </div>
        <div class="recipe-form-item">
          <button @click.prevent="createRecipe" type="submit" form="form" value="Submit">Submit</button>
        </div>
        <div class="recipe-form-item">
          <span :hidden="!error" style="color: red">Error: Form could not be submitted!</span>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {Difficulty} from "@/model/Difficulty";
import {Recipe} from "@/model/Recipe";
import {NewRecipeDto} from "@/model/NewRecipeDto";

interface ComponentData {
  difficultyOptions: { value: string }[],
  error: boolean,
  recipe: Recipe
}

export default defineComponent({
  name: "RecipeForm",
  data(): ComponentData {
    return {
      difficultyOptions: [],
      error: false,
      recipe: {
        id: 0, title: '', imageUrl: '', servings: 0, time: '',
        difficulty: Difficulty.EASY, ingredients: [], directions: [], featured: false
      }
    }
  },
  created() {
    this.buildDifficultyOptions();
  },
  methods: {
    buildDifficultyOptions() {
      this.difficultyOptions = [
        {value: Difficulty.HARD},
        {value: Difficulty.MEDIUM},
        {value: Difficulty.EASY}
      ]
    },
    createRecipe() {
      Object.keys(this.recipe).forEach(k => this.recipe[k] = this.mapFormElementValue(k));
      if(this.validInputs(this.recipe)){
        return
      }else {
        this.error = true;
      }
    },
    mapFormElementValue(key: string) {
      if (key === 'id') return 0;
      if (key === 'featured') {
        return (document.getElementById(key) as HTMLInputElement).checked;
      }
      if (key === 'ingredients' || key === 'directions'){
        return (document.getElementById(key) as HTMLInputElement).value.split('.');
      } else {
        return (document.getElementById(key) as HTMLInputElement).value
      }
    },
    validInputs(recipe: Recipe): boolean {
      return !(recipe.title || recipe.ingredients || recipe.directions).length < 0;
    }
  }
})
</script>

<style lang="scss">
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
</style>