import { defineStore } from 'pinia';

const defaultNoteFields = { title: 'Title', description: 'Description' };
const imageNoteFields = { image: '' };
const checkboxNoteFields = { checklist: [] };

export const useStore = defineStore('index', {
  persist: true,
  state: () => ({
    notes: [],
    notesLastId: 0,
    noteTypes: {
      default: defaultNoteFields,
      image: { ...defaultNoteFields, ...imageNoteFields },
      checkbox: { ...defaultNoteFields, ...checkboxNoteFields },
    },
  }),
  getters: {
    getNote: (state) => (id) => state.notes.find((note) => note.id == id),
    getNoteList: (state) => state.notes,
    getNoteTypes: (state) => Object.keys(state.noteTypes),
    getNoteTypeObj: (state) => (type) => JSON.parse(JSON.stringify(state.noteTypes[type])),
    getNoteTypeFieldsKeys: (state) => (type) => Object.keys(state.noteTypes[type]),
  },
  actions: {
    addNote(type = 'default') {
      if (!this.getNoteTypes.includes(type)) return;
      this.notes.unshift({ id: ++this.notesLastId, type, fields: this.getNoteTypeObj(type) });
    },
    removeNote(id) {
      this.notes = this.notes.filter((note) => note.id !== id);
    },
    updateNoteFields(id, fields) {
      this.getNote(id).fields = fields;
    },
    changeType(id, type) {
      if (!this.getNoteTypes.includes(type)) return;
      const note = this.getNote(id);
      const fieldKeys = this.getNoteTypeFieldsKeys(type);
      const noteFieldsFiltered = Object.fromEntries(
        Object.entries(note.fields).filter(([key]) => fieldKeys.includes(key)),
      );
      const fieldsToExtend = Object.fromEntries(
        Object.entries(this.getNoteTypeObj(type)).filter(
          ([key]) => !Object.keys(noteFieldsFiltered).includes(key),
        ),
      );
      note.fields = { ...noteFieldsFiltered, ...fieldsToExtend };
      note.type = type;
    },
  },
});
