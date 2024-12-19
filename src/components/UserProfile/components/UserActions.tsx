'use client';

import { Button, Cell, Section } from '@telegram-apps/telegram-ui';
import { type User } from '@telegram-apps/sdk-react';

interface UserActionsProps {
  user: User;
  onCheckPremium: () => void;
}

/**
 * Компонент с действиями пользователя
 */
export function UserActions({ user, onCheckPremium }: UserActionsProps) {
  return (
    <Section>
      <Cell>
        <Button stretched onClick={onCheckPremium}>
          Проверить Premium статус
        </Button>
      </Cell>
    </Section>
  );
}