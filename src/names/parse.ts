import { normalizeGrammarLanguage } from "#ml0qtbq1umai";
import type { Gender, NameInput, ParsedName } from "#fa8gbb35wvs1";
import { genderFromParts } from "./gender.js";
import { lastSurnameWord, splitName } from "./split.js";

function genderHint(input: NameInput): Gender | null {
  if (!input || typeof input !== "object") return null;
  return input.gender === "m" || input.gender === "f" ? input.gender : null;
}

function parseName(input: NameInput, language?: unknown): ParsedName {
  const parts = splitName(input);
  const hint = genderHint(input);
  if (hint) return { ...parts, gender: hint };
  if (normalizeGrammarLanguage(language) !== "cs") return { ...parts, gender: "unknown" };
  return { ...parts, gender: genderFromParts(parts.given[0] || "", lastSurnameWord(parts.surname)) };
}

function detectGender(input: NameInput, language?: unknown): Gender {
  return parseName(input, language).gender;
}

export { detectGender, parseName };
