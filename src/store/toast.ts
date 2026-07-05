import { create } from 'zustand';

interface ToastState {
  message: string;
  visible: boolean;
  show: (msg?: string) => void;
  hide: () => void;
}

export const useToastStore = create<ToastState>((set) => ({
  message: '已复制',
  visible: false,
  show: (msg) => {
    set({ message: msg ?? '已复制', visible: true });
  },
  hide: () => set({ visible: false }),
}));

let hideTimer: ReturnType<typeof setTimeout> | null = null;

export function showToast(msg?: string) {
  const { show, visible } = useToastStore.getState();
  if (hideTimer) clearTimeout(hideTimer);
  show(msg);
  hideTimer = setTimeout(() => {
    useToastStore.getState().hide();
    hideTimer = null;
  }, 1500);
  // Suppress unused warning for `visible`
  void visible;
}
