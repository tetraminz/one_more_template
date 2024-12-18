import type { PropsWithChildren } from 'react';
import type { Metadata } from 'next';
import { getLocale } from 'next-intl/server';

import { Root } from '@/components/Root/Root';
import { I18nProvider } from '@/core/i18n/provider';

import '@telegram-apps/telegram-ui/dist/styles.css';
import 'normalize.css/normalize.css';
import './_assets/globals.css';

// Метаданные приложения - здесь можно настроить заголовок и описание вашего приложения
export const metadata: Metadata = {
  title: 'Your Application Title Goes Here',
  description: 'Your application description goes here',
};

// Корневой layout приложения
// Оборачивает все страницы в необходимые провайдеры (i18n для мультиязычности)
// children - содержимое текущей страницы
export default async function RootLayout({ children }: PropsWithChildren) {
  // Получаем текущую локаль пользователя
  const locale = await getLocale();

  return (
    <html lang={locale}>
    <body>
      <I18nProvider>
        <Root>
          {children}
        </Root>
      </I18nProvider>
    </body>
    </html>
  );
}