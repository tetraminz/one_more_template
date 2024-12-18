'use client';

import { type PropsWithChildren, useEffect } from 'react';
import {
  initData,
  miniApp,
  useLaunchParams,
  useSignal,
} from '@telegram-apps/sdk-react';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import { AppRoot } from '@telegram-apps/telegram-ui';

import { ErrorBoundary } from '@/components/ErrorBoundary';
import { ErrorPage } from '@/components/ErrorPage';
import { useTelegramMock } from '@/hooks/useTelegramMock';
import { useDidMount } from '@/hooks/useDidMount';
import { useClientOnce } from '@/hooks/useClientOnce';
import { setLocale } from '@/core/i18n/locale';
import { init } from '@/core/init';

import './styles.css';

// Внутренний компонент корневого элемента
// Здесь происходит основная настройка приложения
function RootInner({ children }: PropsWithChildren) {
  const isDev = process.env.NODE_ENV === 'development';

  // Эмулируем окружение Telegram в режиме разработки
  if (isDev) {
    useTelegramMock();
  }

  // Получаем параметры запуска и проверяем режим отладки
  const lp = useLaunchParams();
  const debug = isDev || lp.startParam === 'debug';

  // Инициализируем библиотеку при первом рендере на клиенте
  useClientOnce(() => {
    init(debug);
  });

  // Получаем текущую тему и данные пользователя
  const isDark = useSignal(miniApp.isDark);
  const initDataUser = useSignal(initData.user);

  // Устанавливаем локаль пользователя
  useEffect(() => {
    initDataUser && setLocale(initDataUser.languageCode);
  }, [initDataUser]);

  return (
    <TonConnectUIProvider manifestUrl="/tonconnect-manifest.json">
      <AppRoot
        appearance={isDark ? 'dark' : 'light'}
        platform={['macos', 'ios'].includes(lp.platform) ? 'ios' : 'base'}
      >
        {children}
      </AppRoot>
    </TonConnectUIProvider>
  );
}

// Корневой компонент приложения
// Обрабатывает начальную загрузку и ошибки
export function Root(props: PropsWithChildren) {
  // Показываем загрузку на серверной стороне
  // т.к. Telegram Mini Apps не поддерживает полноценный SSR
  const didMount = useDidMount();

  return didMount ? (
    <ErrorBoundary fallback={ErrorPage}>
      <RootInner {...props}/>
    </ErrorBoundary>
  ) : <div className="root__loading">Loading</div>;
}