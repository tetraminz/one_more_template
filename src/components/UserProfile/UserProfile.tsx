'use client';

import {
  useSignal,
  initData,
  miniApp,
  mainButton,
} from '@telegram-apps/sdk-react';
import { List } from '@telegram-apps/telegram-ui';
import { useState } from 'react';

import { UserInfo } from './components/UserInfo';
import { UserSettings } from './components/UserSettings';
import { UserActions } from './components/UserActions';

/**
 * Основной компонент профиля пользователя
 * Объединяет все подкомпоненты и управляет состоянием
 */
export function UserProfile() {
  // Получаем данные пользователя из Telegram SDK
  const user = useSignal(initData.user);

  // Получаем текущую тему
  const isDark = useSignal(miniApp.isDark);

  // Локальное состояние для демонстрации
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  // Обработчик нажатия на аватар
  const handleAvatarClick = () => {
    // Используем методы из mainButton
    mainButton.setParams({
      text: `@${user?.username || 'Нет username'}`,
      isVisible: true, // Исправлено с is_visible на isVisible
    });
    setTimeout(() => {
      mainButton.setParams({ isVisible: false }); // Исправлено с is_visible на isVisible
    }, 2000);
  };

  // Обработчик включения уведомлений
  const handleNotificationsToggle = () => {
    setNotificationsEnabled(!notificationsEnabled);
    mainButton.setParams({
      text: notificationsEnabled ? 'Уведомления выключены' : 'Уведомления включены',
      isVisible: true, // Исправлено с is_visible на isVisible
    });
    setTimeout(() => {
      mainButton.setParams({ isVisible: false }); // Исправлено с is_visible на isVisible
    }, 2000);
  };

  // Обработчик проверки премиум статуса
  const handleCheckPremium = () => {
    mainButton.setParams({
      text: user?.isPremium ? 'У вас есть Telegram Premium!' : 'У вас нет Telegram Premium',
      isVisible: true, // Исправлено с is_visible на isVisible
    });
    setTimeout(() => {
      mainButton.setParams({ isVisible: false }); // Исправлено с is_visible на isVisible
    }, 2000);
  };

  if (!user) {
    return <div>Загрузка...</div>;
  }

  return (
      <List>
        <UserInfo
            user={user}
            onAvatarClick={handleAvatarClick}
        />

        <UserSettings
            isDark={isDark}
            notificationsEnabled={notificationsEnabled}
            onNotificationsToggle={handleNotificationsToggle}
        />

        <UserActions
            user={user}
            onCheckPremium={handleCheckPremium}
        />
      </List>
  );
}