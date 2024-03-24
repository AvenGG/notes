<template>
  <div class="flex flex-col">
    <h2 v-if="allowEditView" class="mb-3 text-xl">{{ title }}</h2>
    <div class="justify-between md:flex">
      <div>
        <img
          v-if="editValue || modelValue"
          class="h-auto w-full min-w-0 max-w-fit rounded-lg"
          :src="editValue || modelValue"
          alt="Uploaded image"
        />
        <div v-show="isEdit" class="bg-red relative mt-10 rounded-lg border p-6">
          <input
            class="absolute inset-0 cursor-pointer opacity-0"
            type="file"
            :accept="acceptedExtensions"
            @change="onImageInputChange"
          />
          <div class="flex w-full">
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
                d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
              />
            </svg>

            <span class="ml-2 text-lg">Upload image</span>
          </div>
        </div>
        <p v-if="extensionError" class="mt-4 text-orange-600">{{ extensionsErrorText }}</p>
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
    modelValue: { type: String, default: '' },
    title: { type: String, default: 'Title' },
    allowEditView: { type: Boolean, default: false },
  });

  const modelRef = toRef(props, 'modelValue');

  const { isEdit, editValue, onEdit, onUpdateSaveStatus } = useNoteView(modelRef, String);

  const acceptedExtensions = ['image/png', 'image/jpeg', 'image/svg+xml', 'image/webp'];
  const extensionsErrorText = `Upload file from one of the allowed extensions: ${acceptedExtensions.map((text) => text.split('/').pop()).join(', ')}`;

  let fileReader = null;

  if (process.client) {
    fileReader = new FileReader();
    fileReader.onloadend = () => {
      editValue.value = fileReader.result;
    };
  }

  const extensionError = ref(false);

  const onImageInputChange = async (e) => {
    extensionError.value = false;
    const file = e.target.files[0];
    if (!file) return;
    if (!acceptedExtensions.includes(file.type)) {
      extensionError.value = true;
    } else {
      fileReader.readAsDataURL(file);
    }
  };
</script>
