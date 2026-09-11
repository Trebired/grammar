import type { GrammarCase } from "#fa8gbb35wvs1";

const GRAMMAR_CASES: readonly GrammarCase[] = [
  "nominative",
  "genitive",
  "dative",
  "accusative",
  "vocative",
  "locative",
  "instrumental",
];

function isGrammarCase(value: unknown): value is GrammarCase {
  return typeof value === "string" && (GRAMMAR_CASES as readonly string[]).includes(value);
}

export { GRAMMAR_CASES, isGrammarCase };
