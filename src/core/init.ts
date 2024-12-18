import {
  backButton,
  viewport,
  themeParams,
  miniApp,
  initData,
  $debug,
  init as initSDK,
} from '@telegram-apps/sdk-react';

/**
 * Инициализация приложения и настройка всех зависимостей
 * @param debug - флаг режима отладки
 */
export function init(debug: boolean): void {
  // Включаем режим отладки SDK если необходимо
  $debug.set(debug);

  // Инициализируем SDK для работы с Telegram
  initSDK();

  // Подключаем все необходимые компоненты Telegram
  // - Кнопка "Назад"
  // - Мини-приложение
  // - Параметры темы
  // - Данные инициализации
  // - Область просмотра
  backButton.isSupported() && backButton.mount();
  miniApp.mount();
  themeParams.mount();
  initData.restore();
  void viewport.mount().catch(e => {
    console.error('Ошибка при монтировании viewport', e);
  });

  // Привязываем CSS переменные для компонентов
  viewport.bindCssVars();
  miniApp.bindCssVars();
  themeParams.bindCssVars();

  // Подключаем отладчик Eruda в режиме разработки
  debug && import('eruda')
    .then((lib) => lib.default.init())
    .catch(console.error);
}