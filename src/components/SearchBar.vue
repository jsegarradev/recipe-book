<template>
  <div class="search">
    <input v-model="search"
           placeholder="Search for a recipe"
           id="search" name="search"
           type="text"/>

    <button v-if="search.length"
            v-on:click="clearSearch"
            type="button"
    >
      Clear search
    </button>
    <button v-on:click="showForm">Add a new recipe</button>
  </div>
</template>

<script setup lang="ts">
import {Ref, ref, watch} from "vue";

let search: Ref<string> = ref('');

const emit = defineEmits(['search','show-form']);
const clearSearch = (): string => search.value = '';
const showForm = (): void => emit('show-form');

watch( search, async (newValue): Promise<void> => emit('search',newValue));

</script>

<style lang="scss">
.search {
  width: 100%;
  padding: 15px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ccc;
  margin-bottom: 25px;
  justify-content: space-between;
}

.search input {
  width: 500px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  margin: 0 auto;
  max-width: 500px;
}

.search button {
  margin-left: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  background: #4caf50;
  color: #fff;
}
</style>