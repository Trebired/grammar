export { configureGrammar } from "./configure.js";
export { GRAMMAR_LANGUAGES, normalizeGrammarLanguage } from "./language.js";
export { GRAMMAR_CASES, isGrammarCase } from "./names/cases.js";
export {
  accusative,
  dative,
  declineName,
  genitive,
  instrumental,
  locative,
  vocative,
} from "./names/decline.js";
export { detectGender, parseName } from "./names/parse.js";
export { possessive } from "./names/possessive.js";
export { nameText } from "./names/split.js";
export { GRAMMAR_PIPES, applyGrammarPipe, isGrammarPipe } from "./pipes.js";
export { formatCount, formatNumber, ordinal } from "./plural/count.js";
export { PLURAL_CATEGORIES, isPluralForms, pluralCategory, selectPlural } from "./plural/rules.js";
export { indefiniteArticle, withIndefiniteArticle } from "./text/article.js";
export { capitalize, lower, upper } from "./text/casing.js";
export { formatList } from "./text/list.js";
export { vocalizePreposition } from "./text/preposition.js";
export type {
  CaseForms,
  CountOptions,
  DeclineOptions,
  Gender,
  GrammarCase,
  GrammarConfig,
  GrammarLanguage,
  GrammarNames,
  ListOptions,
  NameInput,
  NameOverrides,
  NameParts,
  ParsedName,
  PluralCategory,
  PluralForms,
  PossessedGender,
  PossessiveOptions,
} from "./types.js";
