<template>
  <div>
    <button class="button" @click="addNewNote">Add new note</button>
    <div class="mt-10 grid grid-cols-1 gap-3 md:grid-cols-2">
      <NoteComponent v-for="note in notes" :key="note.id" v-bind="note" @remove="removeNote" />
    </div>
    <ConfirmationModal ref="confirmationModalRef" title="Remove note?" />
  </div>
</template>
<script setup>
  import NoteComponent from '@/components/common/notes/NoteItemComponent.vue';
  import ConfirmationModal from '@/components/common/ConfirmationModal.vue';

  import { useStore } from '@/stores/index';

  const store = useStore();

  const confirmationModalRef = ref(null);

  const notes = computed(() => store.getNoteList);

  const addNewNote = () => {
    store.addNote();
  };

  const removeNote = async (id) => {
    const removalConfirmed = await confirmationModalRef.value.open();
    if (removalConfirmed) store.removeNote(id);
  };
</script>
