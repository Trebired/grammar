import type { GrammarLanguage } from "./types.js";

const GRAMMAR_LANGUAGES: readonly GrammarLanguage[] = ["cs", "en"];

function normalizeGrammarLanguage(language: unknown): GrammarLanguage {
  const base = String(language ?? "").trim().toLowerCase().split(/[-_]/u)[0];
  return base === "cs" ? "cs" : "en";
}

export { GRAMMAR_LANGUAGES, normalizeGrammarLanguage };
