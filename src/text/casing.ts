import { normalizeGrammarLanguage } from "#ml0qtbq1umai";

function upper(value: unknown, language?: unknown): string {
  return String(value ?? "").toLocaleUpperCase(normalizeGrammarLanguage(language));
}

function lower(value: unknown, language?: unknown): string {
  return String(value ?? "").toLocaleLowerCase(normalizeGrammarLanguage(language));
}

function capitalize(value: unknown, language?: unknown): string {
  const text = String(value ?? "");
  if (!text) return text;
  return `${upper(text.charAt(0), language)}${text.slice(1)}`;
}

export { capitalize, lower, upper };
