import { normalizeGrammarLanguage } from "./language.js";
import { GRAMMAR_CASES, isGrammarCase } from "./names/cases.js";
import { declineName } from "./names/decline.js";
import { possessive } from "./names/possessive.js";
import { nameText } from "./names/split.js";
import { formatNumber, ordinal } from "./plural/count.js";
import { withIndefiniteArticle } from "./text/article.js";
import { capitalize, lower, upper } from "./text/casing.js";
import { formatList } from "./text/list.js";
import type { Gender, ListOptions, NameInput, PossessedGender } from "./types.js";

const GRAMMAR_PIPES: readonly string[] = [
  ...GRAMMAR_CASES,
  "article",
  "capitalize",
  "list",
  "lower",
  "number",
  "ordinal",
  "possessive",
  "upper",
];

function stringify(value: unknown) {
  if (Array.isArray(value)) return value.map((item) => String(item ?? "")).join(", ");
  return nameText(value);
}

function genderArg(value: string | undefined): Gender | undefined {
  return value === "m" || value === "f" ? value : undefined;
}

function possessedArg(value: string | undefined): PossessedGender | undefined {
  return value === "m" || value === "f" || value === "n" ? value : undefined;
}

function formatPipe(value: unknown, pipe: string, args: string[], language: unknown) {
  if (pipe === "number") return formatNumber(value, language);
  if (pipe === "ordinal") return ordinal(value, language);
  if (pipe === "list") return formatList(value, language, { type: args[0] as ListOptions["type"] });
  if (pipe === "article") {
    return normalizeGrammarLanguage(language) === "en" ? withIndefiniteArticle(stringify(value)) : stringify(value);
  }
  if (pipe === "upper") return upper(stringify(value), language);
  if (pipe === "lower") return lower(stringify(value), language);
  if (pipe === "capitalize") return capitalize(stringify(value), language);
  return stringify(value);
}

function applyGrammarPipe(value: unknown, pipe: string, args: string[] = [], language?: unknown): string {
  const name = String(pipe || "").trim();
  if (isGrammarCase(name)) {
    return declineName(value as NameInput, name, language, { gender: genderArg(args[0]) });
  }
  if (name === "possessive") {
    return possessive(value as NameInput, language, { gender: genderArg(args[1]), possessed: possessedArg(args[0]) });
  }
  return formatPipe(value, name, args, language);
}

function isGrammarPipe(name: unknown): boolean {
  return typeof name === "string" && GRAMMAR_PIPES.includes(name.trim());
}

export { GRAMMAR_PIPES, applyGrammarPipe, isGrammarPipe };
