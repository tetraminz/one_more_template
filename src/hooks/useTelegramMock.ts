import { useClientOnce } from '@/hooks/useClientOnce';
import {
  isTMA,
  type LaunchParams,
  mockTelegramEnv,
  parseInitData,
  retrieveLaunchParams,
} from '@telegram-apps/sdk-react';

/**
 * Хук для эмуляции окружения Telegram в режиме разработки
 * Создает фейковое окружение с тестовыми данными для локальной разработки
 */
export function useTelegramMock(): void {
  useClientOnce(() => {
    // Проверяем, нужно ли создавать мок
    if (!sessionStorage.getItem('env-mocked') && isTMA('simple')) {
      return;
    }

    // Пытаемся получить параметры запуска
    let lp: LaunchParams | undefined;
    try {
      lp = retrieveLaunchParams();
    } catch (e) {
      // Если не получилось - создаем тестовые данные
      const initDataRaw = new URLSearchParams([
        // Тестовый пользователь
        ['user', JSON.stringify({
          id: 99281932,
          first_name: 'Andrew',
          last_name: 'Rogue',
          username: 'rogue',
          language_code: 'en',
          is_premium: true,
          allows_write_to_pm: true,
        })],
        // Тестовые параметры запуска
        ['hash', '89d6079ad6762351f38c6dbbc41bb53048019256a9443988af7a48bcad16ba31'],
        ['auth_date', '1716922846'],
        ['start_param', 'debug'],
        ['chat_type', 'sender'],
        ['chat_instance', '8428209589180549439'],
      ]).toString();

      // Создаем тестовое окружение с темой и параметрами
      lp = {
        themeParams: {
          accentTextColor: '#6ab2f2',
          bgColor: '#17212b',
          buttonColor: '#5288c1',
          buttonTextColor: '#ffffff',
          destructiveTextColor: '#ec3942',
          headerBgColor: '#17212b',
          hintColor: '#708499',
          linkColor: '#6ab3f3',
          secondaryBgColor: '#232e3c',
          sectionBgColor: '#17212b',
          sectionHeaderTextColor: '#6ab3f3',
          subtitleTextColor: '#708499',
          textColor: '#f5f5f5',
        },
        initData: parseInitData(initDataRaw),
        initDataRaw,
        version: '8',
        platform: 'tdesktop',
      }
    }

    // Применяем мок только один раз
    sessionStorage.setItem('env-mocked', '1');
    mockTelegramEnv(lp);
    console.warn(
      '⚠️ Окружение Telegram было эмулировано для разработки. Не используйте это в продакшене!'
    );
  });
}