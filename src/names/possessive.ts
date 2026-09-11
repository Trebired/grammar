import { normalizeGrammarLanguage } from "#ml0qtbq1umai";
import type { NameInput, PossessiveOptions } from "#fa8gbb35wvs1";
import { mobileStem } from "./cs/masculine.js";
import { declineName } from "./decline.js";
import { parseName } from "./parse.js";
import { nameText } from "./split.js";
import { withCase } from "./word.js";

const MASCULINE_ENDINGS = { f: "ova", m: "ův", n: "ovo", plural: "ovy" };
const FEMININE_ENDINGS = { f: "ina", m: "in", n: "ino", plural: "iny" };
const FEMININE_STEM_CHANGES: [RegExp, string][] = [[/ch$/u, "š"], [/k$/u, "č"], [/[gh]$/u, "ž"], [/r$/u, "ř"]];

function englishPossessive(text: string, options: PossessiveOptions) {
  if (/s$/iu.test(text) && options.style === "apostrophe") return `${text}'`;
  return `${text}'s`;
}

function ending(table: typeof MASCULINE_ENDINGS, options: PossessiveOptions) {
  if (options.plural) return options.possessed === "n" ? table.f : table.plural;
  return table[options.possessed || "m"];
}

function feminineStem(word: string) {
  const stem = word.replace(/i?[ae]$/iu, (match) => (match.toLowerCase().startsWith("i") ? "i" : ""));
  const change = FEMININE_STEM_CHANGES.find(([pattern]) => pattern.test(stem.toLowerCase()));
  if (!change) return stem;
  return stem.replace(change[0], change[1]);
}

function czechPossessiveWord(word: string, gender: string, options: PossessiveOptions) {
  const lower = word.toLowerCase();
  if (gender === "f" && /(?:i?e|a)$/u.test(lower) && !/á$/u.test(lower)) {
    return withCase(word, `${feminineStem(word)}${ending(FEMININE_ENDINGS, options)}`);
  }
  if (gender === "m" && !/[ýíáéiyu]$/u.test(lower)) {
    const stem = /[aoe]$/u.test(lower) ? word.slice(0, -1) : mobileStem(word);
    return withCase(word, `${stem}${ending(MASCULINE_ENDINGS, options)}`);
  }
  return null;
}

function possessive(input: NameInput, language?: unknown, options: PossessiveOptions = {}): string {
  const text = nameText(input).trim();
  if (!text) return text;
  if (normalizeGrammarLanguage(language) !== "cs") return englishPossessive(text, options);
  const parsed = parseName(input, "cs");
  const gender = options.gender === "m" || options.gender === "f" ? options.gender : parsed.gender;
  const words = [...parsed.given, ...(parsed.surname ? parsed.surname.split(/\s+/u) : [])];
  const single = words.length === 1 && !parsed.titlesBefore.length && !parsed.titlesAfter.length;
  const adjective = single ? czechPossessiveWord(words[0], gender, options) : null;
  return adjective ?? declineName(input, "genitive", "cs", { gender });
}

export { possessive };
