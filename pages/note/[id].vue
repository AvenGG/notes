<template>
  <div class="">
    <NuxtLink to="/" class="button ml-auto">Go back to main</NuxtLink>
    <div class="mt-10">
      <div class="flex p-4">
        <h1 class="text-xl">{{ note.title }}</h1>
        <button class="button ml-20">Edit</button>
      </div>
      <div class="flex p-4">
        <h1 class="text-xl">{{ note.title }}</h1>
        <button class="button ml-20">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="h-6 w-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
  import { useStore } from '@/stores/index';

  const store = useStore();
  const route = useRoute();

  const { data: note } = await useAsyncData(async () => {
    const note = store.getNote(route.params.id);
    if (!note) showError({ statusCode: 404, statusMessage: 'Page not found' });
    return note;
  });
</script>
