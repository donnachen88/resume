import { useCallback } from 'react';
import { showToast } from '@/store/toast';

/**
 * Clipboard helper that prefers the async Clipboard API and falls back gracefully.
 * Always shows a toast on success.
 */
export function useClipboard() {
  const copy = useCallback(async (text: string, successMsg = '已复制') => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        showToast(successMsg);
        return;
      }
      // Fallback: legacy execCommand
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand('copy');
        showToast(successMsg);
      } finally {
        document.body.removeChild(textarea);
      }
    } catch {
      showToast(successMsg);
    }
  }, []);

  return { copy };
}
