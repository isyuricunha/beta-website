import { de } from "@/i18n/locales/de";
import { en } from "@/i18n/locales/en";
import { fr } from "@/i18n/locales/fr";
import { ja } from "@/i18n/locales/ja";
import { ptBr } from "@/i18n/locales/pt-br";
import { zhCn } from "@/i18n/locales/zh-cn";
import type { Dictionary } from "@/i18n/types";
import type { Locale } from "@/i18n/config";

const dictionaries: Record<Locale, Dictionary> = {
  en,
  "pt-br": ptBr,
  ja,
  "zh-cn": zhCn,
  de,
  fr,
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
