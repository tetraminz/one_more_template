'use client';

import { backButton } from '@telegram-apps/sdk-react';
import { PropsWithChildren, useEffect } from 'react';
import { useRouter } from 'next/navigation';

/**
 * Компонент-обертка для страниц приложения
 * Управляет кнопкой "Назад" и навигацией
 * 
 * @param children - содержимое страницы
 * @param back - флаг, показывающий нужно ли отображать кнопку "Назад"
 */
export function Page({ children, back = true }: PropsWithChildren<{
  back?: boolean
}>) {
  const router = useRouter();

  // Управляем видимостью кнопки "Назад"
  useEffect(() => {
    if (back) {
      backButton.show();
    } else {
      backButton.hide();
    }
  }, [back]);

  // Обрабатываем нажатие на кнопку "Назад"
  useEffect(() => {
    return backButton.onClick(() => {
      router.back();
    });
  }, [router]);

  return <>{children}</>;
}