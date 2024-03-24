<template>
  <div class="flex flex-col">
    <h2 v-if="allowEditView" class="mb-3 text-xl">{{ title }}</h2>
    <div class="justify-between md:flex">
      <p v-show="!isEdit" class="text-md">{{ modelValue }}</p>
      <component
        :is="component.is"
        v-show="isEdit"
        :value="editValue"
        @input="editValue = $event.target.value"
        class="input"
        :class="{ 'min-h-40 cursor-auto resize-none overflow-y-auto': textarea }"
        :placeholder="component.placeholder"
      />
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
    title: { type: String, default: 'Title' },
    allowEditView: { type: Boolean, default: false },
    textarea: { type: Boolean, default: false },
  });

  const modelRef = toRef(props, 'modelValue');

  const { isEdit, editValue, onEdit, onUpdateSaveStatus } = useNoteView(modelRef, String);

  const component = computed(() => ({
    is: props.textarea ? 'textarea' : 'input',
    placeholder: `Enter ${props.title.toLocaleLowerCase()}`,
  }));
</script>
