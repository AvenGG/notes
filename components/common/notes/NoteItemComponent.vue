<template>
  <div class="relative">
    <NuxtLink
      :to="{ name: 'note-id', params: { id } }"
      class="hover: block rounded-lg border-r-2 border-teal-500 bg-teal-500 p-5 pt-2 shadow transition duration-200 hover:border-yellow-500 hover:bg-teal-400 hover:text-slate-800"
    >
      <span class="text-sm text-zinc-200">Type: {{ type }}</span>
      <h2 class="text-3xl font-semibold">{{ title }}</h2>
      <p class="text-xl">{{ description }}</p>
    </NuxtLink>
    <button class="absolute right-0 top-0 z-10 p-2 text-black hover:text-slate-600" @click="remove">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="h-6 w-6"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
      </svg>
    </button>
  </div>
</template>
<script setup>
  const props = defineProps({
    id: { type: Number, required: true },
    type: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
  });

  const emit = defineEmits(['remove']);

  const remove = () => {
    emit('remove', props.id);
  };
</script>
