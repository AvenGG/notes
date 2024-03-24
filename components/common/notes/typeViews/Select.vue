<template>
  <div class="flex flex-col">
    <h2 v-if="allowEditView" class="mb-3 text-xl">{{ title }}</h2>
    <div class="justify-between md:flex">
      <p v-show="!isEdit" class="text-md">{{ modelValue }}</p>
      <select v-show="isEdit" v-model="editValue" class="input w-fit bg-slate-100">
        <option v-for="(item, idx) of items" :key="`${item}-${idx}`" :value="item" class="text-lg">
          {{ item }}
        </option>
      </select>
      <EditOrSaveButtons
        v-if="allowEditView"
        :is-edit="isEdit"
        class="mt-5 md:ml-10 md:mt-0"
        @edit="onEdit"
        @updateSaveStatus="onUpdateSaveStatus"
      />
    </div>
  </div>
</template>
<script setup>
  import EditOrSaveButtons from './EditOrSaveButtons.vue';

  import { useNoteView } from '@/composables/useNoteView';

  const props = defineProps({
    modelValue: { type: String, default: '' },
    items: { type: Array, required: true },
    title: { type: String, default: 'Title' },
    allowEditView: { type: Boolean, default: false },
  });

  const modelRef = toRef(props, 'modelValue');

  const { isEdit, editValue, onEdit, onUpdateSaveStatus } = useNoteView(modelRef, String);
</script>
