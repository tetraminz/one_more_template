'use client';

import { Cell, Section, Switch } from '@telegram-apps/telegram-ui';

interface UserSettingsProps {
  isDark: boolean;
  notificationsEnabled: boolean;
  onNotificationsToggle: () => void;
}

/**
 * Компонент настроек пользователя
 */
export function UserSettings({ 
  isDark, 
  notificationsEnabled, 
  onNotificationsToggle 
}: UserSettingsProps) {
  return (
    <Section header="Настройки">
      <Cell
        after={
          <Switch
            checked={notificationsEnabled}
            onChange={onNotificationsToggle}
          />
        }
      >
        Уведомления
      </Cell>
      
      <Cell multiline>
        Текущая тема: {isDark ? 'Тёмная' : 'Светлая'}
      </Cell>
    </Section>
  );
}