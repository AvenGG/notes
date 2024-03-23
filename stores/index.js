import { defineStore } from 'pinia';

const defaultNoteFields = {
  title: 'Title',
  description: 'Description',
};
export const useStore = defineStore('index', {
  persist: true,
  state: () => ({
    notes: [],
    notesLastId: 0,
    noteTypes: {
      default: defaultNoteFields,
      image: {
        ...defaultNoteFields,
        picture: '',
      },
      checkbox: {
        ...defaultNoteFields,
        checkboxes: [],
      },
    },
  }),
  getters: {
    getNote: (state) => (id) => state.notes.find((note) => note.id == id),
    getNoteList: (state) => state.notes,
    getNoteTypes: (state) => state.noteTypes,
    getNoteTypeObj: (state) => (type) => state.noteTypes[type],
  },
  actions: {
    addNote({ type = 'default' } = {}) {
      this.notes.push({ id: ++this.notesLastId, type, ...this.getNoteTypeObj(type) });
    },
    removeNote(id) {
      this.notes = this.notes.filter((note) => note.id !== id);
    },
    editNote(id, { prop, val }) {
      this.notes.find((note) => note.id === id)[prop] = val;
    },
  },
});
