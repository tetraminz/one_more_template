import { getRequestConfig } from "next-intl/server";

import { defaultLocale, locales } from "./config";
import { getLocale } from "./locale";
import type { Locale } from "./types";

/**
 * Конфигурация интернационализации для Next.js
 * Загружает сообщения для текущей локали
 * Если локаль не поддерживается - использует локаль по умолчанию
 */
const i18nRequestConfig = getRequestConfig(async () => {
  // Получаем текущую локаль пользователя
  const locale = await getLocale() as Locale;

  return {
    locale,
    // Загружаем сообщения для локали
    // Если локаль не поддерживается - используем сообщения по умолчанию
    messages:
      locale === defaultLocale || !locales.includes(locale)
        ? (await import(`@public/locales/${defaultLocale}.json`)).default
        : (await import(`@public/locales/${locale}.json`)).default,
  };
});

export default i18nRequestConfig;