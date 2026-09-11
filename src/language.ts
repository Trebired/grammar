import { toLowerString } from "@trebired/utils";
import type { GrammarLanguage } from "./types.js";

const GRAMMAR_LANGUAGES: readonly GrammarLanguage[] = ["cs", "en"];

function normalizeGrammarLanguage(language: unknown): GrammarLanguage {
  const base = toLowerString(language).split(/[-_]/u)[0];
  return base === "cs" ? "cs" : "en";
}

export { GRAMMAR_LANGUAGES, normalizeGrammarLanguage };
