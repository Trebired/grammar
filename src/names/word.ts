import type { CaseForms } from "#fa8gbb35wvs1";

const VOWELS = /[aeiouyáéíóúůýě]/iu;
const PARTICLES = new Set(["da", "de", "del", "della", "der", "di", "du", "la", "le", "ten", "ter", "van", "von", "zu"]);
const HARDENED: Record<string, string> = { ď: "d", ň: "n", ť: "t" };
const SOFTENED: Record<string, string> = { d: "ď", n: "ň", t: "ť" };

function isUpperWord(word: string) {
  return word.length > 1 && word === word.toUpperCase() && word !== word.toLowerCase();
}

function withCase(original: string, result: string) {
  return isUpperWord(original) ? result.toUpperCase() : result;
}

function isDeclinableWord(word: string) {
  if (!/\p{L}/u.test(word) || /\d/u.test(word)) return false;
  if (/^\p{L}\.$/u.test(word)) return false;
  return !PARTICLES.has(word.toLowerCase());
}

function hasVowel(text: string) {
  return VOWELS.test(text);
}

function hardenLast(stem: string) {
  const last = stem.slice(-1);
  return HARDENED[last] ? `${stem.slice(0, -1)}${HARDENED[last]}` : stem;
}

function softenLast(stem: string) {
  const last = stem.slice(-1);
  return SOFTENED[last] ? `${stem.slice(0, -1)}${SOFTENED[last]}` : stem;
}

function forms(nominative: string, values: Omit<CaseForms, "nominative">): CaseForms {
  return { nominative, ...values };
}

export { PARTICLES, forms, hardenLast, hasVowel, isDeclinableWord, softenLast, withCase };
