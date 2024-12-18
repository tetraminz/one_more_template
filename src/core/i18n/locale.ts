"use server";

import { cookies } from "next/headers";

import { defaultLocale } from "./config";
import type { Locale } from "./types";

// Имя куки для хранения текущей локали
const COOKIE_NAME = "NEXT_LOCALE";

/**
 * Получает текущую локаль из куки
 * Если локаль не установлена - возвращает локаль по умолчанию
 */
const getLocale = async () => {
  return cookies().get(COOKIE_NAME)?.value || defaultLocale;
};

/**
 * Устанавливает новую локаль в куки
 * @param locale - новая локаль
 */
const setLocale = async (locale?: string) => {
  cookies().set(COOKIE_NAME, locale as Locale || defaultLocale);
};

export { getLocale, setLocale };