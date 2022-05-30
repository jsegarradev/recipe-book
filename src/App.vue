<script setup lang="ts">
import {RouterView} from 'vue-router'
import TopBar from "@/components/TopBar.vue";</script>

<template>
  <div class="p-2">
    <TopBar />
    <RouterView />
  </div>
</template>

<style>
@import '@/assets/base.css';

</style>
