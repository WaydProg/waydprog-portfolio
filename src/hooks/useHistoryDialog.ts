import { useCallback, useEffect, useRef, useState } from 'react';

interface HistoryDialog<T> {
  readonly value: T | null;
  readonly open: (value: T) => void;
  readonly close: () => void;
}

/**
 * Состояние модального окна, связанное с историей браузера:
 * кнопка «Назад» на телефоне закрывает окно, а не уводит со страницы.
 */
export function useHistoryDialog<T>(): HistoryDialog<T> {
  const [value, setValue] = useState<T | null>(null);
  const hasHistoryEntry = useRef(false);

  useEffect(() => {
    const handlePopState = () => {
      if (!hasHistoryEntry.current) return;
      hasHistoryEntry.current = false;
      setValue(null);
    };
    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const open = useCallback((next: T) => {
    if (!hasHistoryEntry.current) {
      window.history.pushState(window.history.state, '');
      hasHistoryEntry.current = true;
    }
    setValue(next);
  }, []);

  const close = useCallback(() => {
    if (hasHistoryEntry.current) {
      window.history.back();
    } else {
      setValue(null);
    }
  }, []);

  return { value, open, close };
}
