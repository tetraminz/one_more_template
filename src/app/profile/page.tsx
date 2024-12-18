'use client';

import { Page } from '@/components/Page';
import { UserProfile } from '@/components/UserProfile/UserProfile';

/**
 * Страница профиля пользователя
 */
export default function ProfilePage() {
    return (
        <Page>
            <UserProfile />
        </Page>
    );
}