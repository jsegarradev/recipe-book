<template>
  <h1 v-if="count % 2 !== 0">I'm odd</h1>
  <h1 v-else>I'm not odd</h1>

  <button class="btn" :class="{'btn--primary':props.primary}"></button>
</template>

<script setup lang="ts">

interface Props {
  elements: number,
  color: string,
  primary: boolean
}

const props = defineProps<Props>();
</script>

<script lang="ts">
import {defineComponent} from "vue";

interface ComponentData {
  count: number,
  values: { id: number, name: string }[]
}

export default defineComponent({
  name: "TestElement",
  data(): ComponentData {
    return {
      count: 6,
      values: [
        {id: 1, name: 'AAA'},
        {id: 2, name: 'BBB'},
      ]
    }
  },
  methods: {
    increaseCount(size: number){
      if(size % 3 === 0){
        this.count ++;
      }
    }
  }
})
</script>