import { getCurrentInstance } from 'vue';

export const useNoteView = (modelValue, typeClass) => {
  const { emit } = getCurrentInstance();

  const isEdit = ref(false);

  const editValue = ref(typeClass());

  const onEdit = () => {
    editValue.value = JSON.parse(JSON.stringify(modelValue.value));
    isEdit.value = true;
  };
  const onUpdateSaveStatus = (isSuccess) => {
    isEdit.value = false;
    if (isSuccess) {
      emit('update:modelValue', editValue.value);
      editValue.value = '';
    }
  };
  return { isEdit, editValue, onEdit, onUpdateSaveStatus };
};
