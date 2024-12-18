import { useRef } from 'react';

/**
 * Хук для выполнения кода только один раз на клиенте
 * Гарантирует, что колбэк будет вызван только один раз
 * и только в браузере
 * 
 * @param fn - функция для выполнения
 */
export function useClientOnce(fn: () => void): void {
  const canCall = useRef(true);
  if (typeof window !== 'undefined' && canCall.current) {
    canCall.current = false;
    fn();
  }
}