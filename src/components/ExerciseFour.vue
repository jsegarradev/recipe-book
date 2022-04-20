<template>
  <div>
    <a v-bind:href="url">Click here!</a>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "ExerciseFour",
  data: () => ({
    url:"https://www.uoc.edu"
  })
})
</script>
