import { normalizeGrammarLanguage } from "#ml0qtbq1umai";
import type { CountOptions, PluralForms } from "#fa8gbb35wvs1";
import { pluralCategory, selectPlural } from "./rules.js";

const EN_ORDINAL_SUFFIXES: Record<string, string> = {
  few: "rd",
  one: "st",
  other: "th",
  two: "nd",
};

function toNumber(value: unknown) {
  if (typeof value === "number") return value;
  const text = String(value ?? "").trim().replace(",", ".");
  return text ? Number(text) : Number.NaN;
}

function formatNumber(value: unknown, language?: unknown, options: Intl.NumberFormatOptions = {}): string {
  const number = toNumber(value);
  if (!Number.isFinite(number)) return String(value ?? "");
  return new Intl.NumberFormat(normalizeGrammarLanguage(language), options).format(number);
}

function formatCount(
  count: unknown,
  forms: PluralForms,
  language?: unknown,
  options: CountOptions = {},
): string {
  const separator = options.separator ?? " ";
  return `${formatNumber(count, language, options.number)}${separator}${selectPlural(count, forms, language)}`;
}

function ordinal(value: unknown, language?: unknown): string {
  const lang = normalizeGrammarLanguage(language);
  const number = Math.trunc(toNumber(value));
  if (!Number.isFinite(number)) return String(value ?? "");
  const text = formatNumber(number, lang, { maximumFractionDigits: 0 });
  if (lang === "cs") return `${text}.`;
  return `${text}${EN_ORDINAL_SUFFIXES[pluralCategory(number, lang, { type: "ordinal" })] || "th"}`;
}

export { formatCount, formatNumber, ordinal };
