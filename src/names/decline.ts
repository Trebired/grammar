import { normalizeGrammarLanguage } from "#ml0qtbq1umai";
import type { DeclineOptions, Gender, GrammarCase, NameInput, ParsedName } from "#fa8gbb35wvs1";
import { isGrammarCase } from "./cases.js";
import { czechWordForms, type NameRole } from "./cs/word.js";
import { parseName } from "./parse.js";
import { registeredOverride } from "./registry.js";
import { nameText } from "./split.js";
import { isDeclinableWord, withCase } from "./word.js";

function declineWord(word: string, gender: Gender, role: NameRole, last: boolean, grammaticalCase: GrammarCase) {
  if (!isDeclinableWord(word)) return word;
  return word.split("-").map((part) => {
      if (!isDeclinableWord(part)) return part;
      const wordForms = czechWordForms(part, gender, role, last);
      return wordForms ? withCase(part, wordForms[grammaticalCase]) : part;
  }).join("-");
}

function declineParts(parsed: ParsedName, gender: Gender, grammaticalCase: GrammarCase) {
  const surnameWords = parsed.surname ? parsed.surname.split(/\s+/u) : [];
  const givenCount = parsed.given.length;
  const given = parsed.given.map((word, index) => {
      const last = surnameWords.length === 0 && index === givenCount - 1;
      return declineWord(word, gender, "given", last, grammaticalCase);
  });
  const surname = surnameWords.map((word, index) => {
      return declineWord(word, gender, "surname", index === surnameWords.length - 1, grammaticalCase);
  });
  return [...given, ...surname];
}

function assembleName(parsed: ParsedName, core: string[]) {
  const main = [...parsed.titlesBefore, ...core].join(" ");
  if (!parsed.titlesAfter.length) return main;
  return `${main}${parsed.titlesAfterSeparator}${parsed.titlesAfter.join(" ")}`;
}

function declineName(
  input: NameInput,
  grammaticalCase: GrammarCase,
  language?: unknown,
  options: DeclineOptions = {},
): string {
  const text = nameText(input).trim();
  if (!text || !isGrammarCase(grammaticalCase)) return text;
  const override = options.overrides?.[text]?.[grammaticalCase] ?? registeredOverride(text, grammaticalCase);
  if (override) return override;
  if (grammaticalCase === "nominative" || normalizeGrammarLanguage(language) !== "cs") return text;
  const parsed = parseName(input, "cs");
  const gender = options.gender === "m" || options.gender === "f" ? options.gender : parsed.gender;
  return assembleName(parsed, declineParts(parsed, gender, grammaticalCase));
}

function shortcut(grammaticalCase: GrammarCase) {
  return (input: NameInput, language?: unknown, options: DeclineOptions = {}) => {
    return declineName(input, grammaticalCase, language, options);
  };
}

const genitive = shortcut("genitive");
const dative = shortcut("dative");
const accusative = shortcut("accusative");
const vocative = shortcut("vocative");
const locative = shortcut("locative");
const instrumental = shortcut("instrumental");

export { accusative, dative, declineName, genitive, instrumental, locative, vocative };
