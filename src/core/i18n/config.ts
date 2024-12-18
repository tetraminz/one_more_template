// Локаль по умолчанию
export const defaultLocale = 'en';

// Временная зона по умолчанию
export const timeZone = 'Europe/Amsterdam';

// Список поддерживаемых локалей
export const locales = [defaultLocale, 'ru'] as const;

// Карта локалей с их человекочитаемыми названиями
export const localesMap = [
  { key: 'en', title: 'English' },
  { key: 'ru', title: 'Русский' },
];