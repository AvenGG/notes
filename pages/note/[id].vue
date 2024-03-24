<template>
  <div>
    <NuxtLink to="/" class="button ml-auto">Go back to home page</NuxtLink>
    <div class="mt-10">
      <SelectTypeView
        v-model="note.type"
        class="mt-10"
        title="Type"
        allow-edit-view
        :items="availibleTypes"
      />
      <TextTypeView v-model="note.fields.title" class="mt-10" title="Title" allow-edit-view />
      <TextTypeView
        v-model="note.fields.description"
        class="mt-10"
        title="Description"
        allow-edit-view
        textarea
      />
      <ImageTypeView
        v-if="note.type === 'image'"
        v-model="note.fields.image"
        class="mt-10"
        title="Image"
        allow-edit-view
      />
      <CheckboxTypeView
        v-if="note.type === 'checkbox'"
        v-model="note.fields.checklist"
        class="mt-10"
        title="Checklist"
        allow-edit-view
      />
    </div>
  </div>
</template>
<script setup>
  import SelectTypeView from '@/components/common/notes/typeViews/Select.vue';
  import TextTypeView from '@/components/common/notes/typeViews/Text.vue';
  import ImageTypeView from '@/components/common/notes/typeViews/Image.vue';
  import CheckboxTypeView from '@/components/common/notes/typeViews/Checkbox.vue';

  import { useStore } from '@/stores/index';

  const store = useStore();
  const route = useRoute();

  const { data } = await useAsyncData(async () => {
    const availibleTypes = store.getNoteTypes;
    const note = store.getNote(route.params.id);
    if (!note) showError({ statusCode: 404, statusMessage: `Note with this ID doesn't exists` });
    return { note, availibleTypes };
  });

  const { note, availibleTypes } = toRefs(data.value);

  watch(
    () => note.value.type,
    (val) => {
      store.changeType(note.value.id, val);
    },
  );
  watch(
    () => note.value.fields,
    (val) => {
      store.updateNoteFields(note.value.id, val);
    },
    { deep: true },
  );
</script>
