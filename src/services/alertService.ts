import { ref, readonly } from 'vue';
import type { AlertOptions } from './types';

// Estado reativo inicial
const isOpen = ref(false);
const options = ref<AlertOptions>({
  title: '',
  message: '',
  type: 'info',
  isConfirm: false
});

let resolvePromise: (value: boolean) => void;

export function useAlert() {
  const showAlert = (config: AlertOptions): Promise<boolean> => {
    options.value = {
      ...config,
      type: config.type || 'info',
      isConfirm: config.isConfirm || false
    };
    
    isOpen.value = true;

    return new Promise((resolve) => {
      resolvePromise = resolve;
    });
  };

  const close = (response: boolean) => {
    isOpen.value = false;
    if (resolvePromise) resolvePromise(response);
  };

  return {
    isOpen: readonly(isOpen),
    options: readonly(options),
    showAlert,
    close
  };
}