<template>
  <div>
    <p>{{name}}</p>
    <p>{{lastName}}</p>
    <p>{{fullName()}}</p>
    <button v-on:click="name = 'Andrew'">Update name</button>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "ExerciseThree",
  data: () => ({
    name: "John",
    lastName: "Doe"
  }),
  methods: {
    fullName() {
      return `${this.name} ${this.lastName}`;
    }
  }
})
</script>
