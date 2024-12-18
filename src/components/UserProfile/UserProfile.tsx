'use client';

import { 
  useSignal, 
  initData, 
  miniApp, 
  haptic, 
  showAlert, 
  showConfirm 
} from '@telegram-apps/sdk-react';
import { 
  Avatar, 
  Button, 
  Cell, 
  List, 
  Section, 
  Switch 
} from '@telegram-apps/telegram-ui';
import { useState } from 'react';

/**
 * Компонент профиля пользователя
 * Демонстрирует различные возможности Telegram SDK и UI компонентов
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
    // Вызываем тактильный отклик
    haptic.impact('medium');
    
    // Показываем алерт с информацией
    showAlert({
      title: 'Информация',
      message: `Имя пользователя: ${user?.username || 'Не указано'}`,
    });
  };

  // Обработчик включения уведомлений
  const handleNotificationsToggle = async () => {
    const confirmed = await showConfirm({
      title: 'Уведомления',
      message: 'Вы хотите изменить настройки уведомлений?',
    });

    if (confirmed) {
      setNotificationsEnabled(!notificationsEnabled);
      haptic.notification(notificationsEnabled ? 'error' : 'success');
    }
  };

  if (!user) {
    return <div>Загрузка...</div>;
  }

  return (
    <List>
      {/* Секция с основной информацией */}
      <Section header="Профиль пользователя">
        <Cell
          before={
            <Avatar
              size={48}
              src={user.photoUrl}
              onClick={handleAvatarClick}
              style={{ cursor: 'pointer' }}
            />
          }
          subtitle={`ID: ${user.id}`}
        >
          {user.firstName} {user.lastName}
        </Cell>
      </Section>

      {/* Секция с настройками */}
      <Section header="Настройки">
        <Cell
          after={
            <Switch
              checked={notificationsEnabled}
              onChange={handleNotificationsToggle}
            />
          }
        >
          Уведомления
        </Cell>
        
        <Cell multiline>
          Текущая тема: {isDark ? 'Тёмная' : 'Светлая'}
        </Cell>
      </Section>

      {/* Секция с действиями */}
      <Section>
        <Cell>
          <Button
            stretched
            onClick={() => {
              haptic.impact('light');
              showAlert({
                title: 'Премиум статус',
                message: user.isPremium 
                  ? 'У вас есть Telegram Premium!' 
                  : 'У вас нет Telegram Premium',
              });
            }}
          >
            Проверить Premium статус
          </Button>
        </Cell>
      </Section>
    </List>
  );
}