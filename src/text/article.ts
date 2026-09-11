import { toTrimmedString } from "@trebired/utils";

const SILENT_H_PREFIXES = ["heir", "herb", "honest", "honor", "honour", "hour"];
const CONSONANT_SOUND_PREFIXES = [
  "eu",
  "ewe",
  "once",
  "one",
  "ouija",
  "ubiq",
  "uku",
  "unani",
  "uni",
  "ura",
  "ure",
  "uri",
  "use",
  "usu",
  "ute",
  "uti",
  "uto",
];
const VOWEL_SOUND_LETTERS = "aefhilmnorsx";

function firstToken(word: string) {
  return toTrimmedString(word).split(/[\s-]+/u)[0] || "";
}

function numberArticle(token: string): "a" | "an" {
  const digits = token.replace(/[,.\s]/gu, "").match(/^\d+/u)?.[0] || "";
  if (digits.startsWith("8")) return "an";
  const elevenOrEighteen = digits.startsWith("11") || digits.startsWith("18");
  return elevenOrEighteen && digits.length % 3 === 2 ? "an" : "a";
}

function isAcronym(token: string) {
  return token.length > 1 && token.length <= 6 && token === token.toUpperCase() && /^[A-Z]+$/u.test(token);
}

function wordArticle(token: string): "a" | "an" {
  const lower = token.toLowerCase();
  if (SILENT_H_PREFIXES.some((prefix) => lower.startsWith(prefix))) return "an";
  if (CONSONANT_SOUND_PREFIXES.some((prefix) => lower.startsWith(prefix))) return "a";
  return /^[aeiou]/u.test(lower) ? "an" : "a";
}

function indefiniteArticle(word: string): "a" | "an" {
  const token = firstToken(word);
  if (!token) return "a";
  if (/^\d/u.test(token)) return numberArticle(token);
  if (isAcronym(token)) return VOWEL_SOUND_LETTERS.includes(token[0].toLowerCase()) ? "an" : "a";
  return wordArticle(token);
}

function withIndefiniteArticle(word: string): string {
  const text = toTrimmedString(word);
  return text ? `${indefiniteArticle(text)} ${text}` : text;
}

export { indefiniteArticle, withIndefiniteArticle };
