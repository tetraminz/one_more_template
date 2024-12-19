'use client';

import { Avatar, Cell, Section } from '@telegram-apps/telegram-ui';
import { type User } from '@telegram-apps/sdk-react';

interface UserInfoProps {
  user: User;
  onAvatarClick: () => void;
}

/**
 * Компонент отображения основной информации о пользователе
 */
export function UserInfo({ user, onAvatarClick }: UserInfoProps) {
  return (
    <Section header="Профиль пользователя">
      <Cell
        before={
          <Avatar
            size={48}
            src={user.photoUrl}
            onClick={onAvatarClick}
            style={{ cursor: 'pointer' }}
          />
        }
        subtitle={`ID: ${user.id}`}
      >
        {user.firstName} {user.lastName}
      </Cell>
    </Section>
  );
}