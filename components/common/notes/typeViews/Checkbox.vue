<template>
  <div class="flex flex-col">
    <h2 v-if="allowEditView" class="mb-3 text-xl">{{ title }}</h2>
    <div class="justify-between md:flex">
      <div v-show="!isEdit" class="text-md">
        <label
          v-for="(checkbox, idx) of modelValue"
          :key="idx"
          class="group relative mt-3 flex cursor-pointer items-center"
        >
          <input type="checkbox" v-model="checkbox.checked" class="peer z-10 opacity-0" />
          <span
            class="absolute left-0 block h-7 w-7 border-2 border-slate-500 bg-white text-slate-800 transition group-hover:bg-slate-100 peer-checked:*:opacity-100"
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-full opacity-0"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg> </span
          ><span class="ml-7 text-lg transition group-hover:text-orange-400">{{ checkbox.text }}</span>
        </label>
      </div>
      <div v-show="isEdit" class="text-md">
        <button class="button" @click="addItem">Add item</button>
        <div class="mt-5 flex" v-for="(checkbox, idx) of editValue" :key="idx">
          <input v-model="checkbox.text" class="input p-2" />
          <button class="button ml-5 bg-orange-600 p-2 hover:bg-orange-500" @click="removeItem(idx)">
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
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              />
            </svg>
          </button>
        </div>
      </div>
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
    modelValue: { type: Array, default: () => [] },
    title: { type: String, default: 'Title' },
    allowEditView: { type: Boolean, default: false },
  });

  const modelRef = toRef(props, 'modelValue');

  const { isEdit, editValue, onEdit, onUpdateSaveStatus } = useNoteView(modelRef, Array);

  const addItem = () => {
    editValue.value.push({ checked: false, text: 'Item' });
  };
  const removeItem = (idx) => {
    editValue.value.splice(idx, 1);
  };
</script>
