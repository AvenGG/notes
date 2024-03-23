<template>
  <Transition>
    <div v-show="isOpen" class="fixed inset-0 z-10 flex items-center justify-center">
      <div class="absolute inset-[-100px] bg-slate-600 bg-opacity-50" @click="close"></div>
      <div
        class="relative z-10 m-5 flex w-full max-w-screen-sm flex-col rounded-lg bg-slate-800 p-6 transition"
      >
        <button class="absolute right-0 top-0 z-10 p-2 text-slate-200 hover:text-slate-400" @click="close">
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
        <h2 class="text-center text-3xl font-medium text-slate-200">{{ title }}</h2>
        <div class="mt-10 flex gap-4">
          <button class="button flex-1" @click="confirm">Confirm</button>
          <button class="button flex-1" @click="close">Cancel</button>
        </div>
      </div>
    </div>
  </Transition>
</template>
<script setup>
  const isOpen = ref(false);

  const props = defineProps({ title: { type: String, default: 'Confirm action?' } });

  let closePopupWithConfirmationStatus;

  const open = () => {
    isOpen.value = true;
    return new Promise((res) => {
      closePopupWithConfirmationStatus = res;
    });
  };

  const confirm = () => {
    closePopupWithConfirmationStatus(true);
    isOpen.value = false;
  };
  const close = () => {
    closePopupWithConfirmationStatus(false);
    isOpen.value = false;
  };

  defineExpose({ open, close });
</script>
<style scoped>
  .v-enter-active,
  .v-leave-active {
    transition: 0.3s ease;
  }

  .v-enter-from,
  .v-leave-to {
    transform: translateY(32px);
    opacity: 0;
  }
</style>
