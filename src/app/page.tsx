'use client';

import { Section, Cell, Image, List } from '@telegram-apps/telegram-ui';
import { useTranslations } from 'next-intl';

import { Link } from '@/components/Link/Link';
import { LocaleSwitcher } from '@/components/LocaleSwitcher/LocaleSwitcher';
import { Page } from '@/components/Page';

import tonSvg from './_assets/ton.svg';

/**
 * Главная страница приложения
 * Показывает основные возможности и демонстрационные страницы
 */
export default function Home() {
  // Получаем функцию для работы с переводами
  const t = useTranslations('i18n');

  return (
      <Page back={false}>
        <List>
          {/* Секция с основными функциями */}
          <Section
              header="Features"
              footer="You can use these pages to learn more about features, provided by Telegram Mini Apps and other useful projects"
          >
            {/* Демонстрация интеграции с TON Connect */}
            <Link href="/ton-connect">
              <Cell
                  before={
                    <Image
                        src={tonSvg.src}
                        style={{ backgroundColor: '#007AFF' }}
                        alt="TON Connect Logo"
                    />
                  }
                  subtitle="Connect your TON wallet"
              >
                TON Connect
              </Cell>
            </Link>

            {/* Ссылка на профиль пользователя */}
            <Link href="/profile">
              <Cell subtitle="Демонстрация возможностей Telegram SDK">
                Профиль пользователя
              </Cell>
            </Link>
          </Section>

          {/* Секция с данными запуска приложения */}
          <Section
              header="Application Launch Data"
              footer="These pages help developer to learn more about current launch information"
          >
            <Link href="/init-data">
              <Cell subtitle="User data, chat information, technical data">
                Init Data
              </Cell>
            </Link>
            <Link href="/launch-params">
              <Cell subtitle="Platform identifier, Mini Apps version, etc.">
                Launch Parameters
              </Cell>
            </Link>
            <Link href="/theme-params">
              <Cell subtitle="Telegram application palette information">
                Theme Parameters
              </Cell>
            </Link>
          </Section>

          {/* Секция с переключателем языка */}
          <Section header={t('header')} footer={t('footer')}>
            <LocaleSwitcher/>
          </Section>
        </List>
      </Page>
  );
}