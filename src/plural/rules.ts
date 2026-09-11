import { normalizeGrammarLanguage } from "#ml0qtbq1umai";
import type { PluralCategory, PluralForms } from "#fa8gbb35wvs1";

import { isRecord, toTrimmedString } from "@trebired/utils";

const PLURAL_CATEGORIES: readonly PluralCategory[] = ["zero", "one", "two", "few", "many", "other"];
const rulesCache = new Map<string, Intl.PluralRules>();

function pluralRules(language: string, type: Intl.PluralRuleType, fractionDigits: number) {
  const key = `${language}:${type}:${fractionDigits}`;
  const cached = rulesCache.get(key);
  if (cached) return cached;
  const rules = new Intl.PluralRules(language, { minimumFractionDigits: fractionDigits, type });
  rulesCache.set(key, rules);
  return rules;
}

function fractionDigitsOf(text: string) {
  const match = /\.(\d+)$/u.exec(text);
  return match ? Math.min(match[1].length, 20) : 0;
}

function parseCount(count: unknown) {
  if (typeof count === "number") return { fractionDigits: fractionDigitsOf(String(count)), value: count };
  const text = toTrimmedString(count).replace(",", ".");
  return { fractionDigits: fractionDigitsOf(text), value: text ? Number(text) : Number.NaN };
}

function pluralCategory(
  count: unknown,
  language?: unknown,
  options: { type?: Intl.PluralRuleType } = {},
): PluralCategory {
  const { fractionDigits, value } = parseCount(count);
  if (!Number.isFinite(value)) return "other";
  const rules = pluralRules(normalizeGrammarLanguage(language), options.type ||"cardinal", fractionDigits);
  return rules.select(value) as PluralCategory;
}

function isPluralForms(value: unknown): value is PluralForms {
  if (!isRecord(value)) return false;
  const entries = Object.entries(value);
  if (!entries.some(([key]) => key === "other")) return false;
  return entries.every(([key, form]) => {
      return (PLURAL_CATEGORIES as readonly string[]).includes(key) && typeof form === "string";
  });
}

function selectPlural(count: unknown, forms: PluralForms, language?: unknown): string {
  const category = pluralCategory(count, language);
  return forms[category] ?? forms.other;
}

export { PLURAL_CATEGORIES, isPluralForms, pluralCategory, selectPlural };
