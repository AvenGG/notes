<template>
  <div
    class="relative rounded-lg border-r-2 border-teal-500 bg-teal-500 p-5 pt-2 shadow transition duration-200 hover:border-yellow-500 hover:bg-teal-400"
  >
    <NuxtLink :to="{ name: 'note-id', params: { id } }" class="block transition hover:text-slate-800">
      <span class="text-sm text-zinc-200">Type: {{ type }}</span>
      <h2 class="text-3xl font-semibold">{{ fields.title }}</h2>
      <p class="text-xl">{{ fields.description }}</p>
      <ImageTypeView v-if="type === 'image'" v-model="fields.image" class="mt-2" />
    </NuxtLink>
    <CheckboxTypeView v-if="type === 'checkbox'" v-model="fields.checklist" class="mt-2" />
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
  import ImageTypeView from '@/components/common/notes/typeViews/Image.vue';
  import CheckboxTypeView from '@/components/common/notes/typeViews/Checkbox.vue';

  const props = defineProps({
    id: { type: Number, required: true },
    type: { type: String, required: true },
    fields: { type: Object, required: true },
  });

  const emit = defineEmits(['remove']);

  const remove = () => {
    emit('remove', props.id);
  };
</script>
