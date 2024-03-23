<template>
  <div class="layout text-center">
    <div class="layout-container">
      <h1 class="text-8xl">{{ error.statusCode }}</h1>
      <p class="mt-10 text-3xl">{{ error.message }}</p>
      <NuxtLink to="/" class="button mx-auto mt-20">Go to home page</NuxtLink>
    </div>
  </div>
</template>
<script setup>
  defineProps(['error']);
</script>
