import type { CaseForms } from "#fa8gbb35wvs1";
import { forms, hardenLast, hasVowel, softenLast } from "#z7v1h0dohnb0";
import { MOBILE_EL_WORDS, SOFT_MASCULINE_WORDS } from "./exceptions.js";

const SOFT_ENDING = /(?:[šžčřcjťďňsxz]|tz)$/u;
const VOWEL_ENDING = /[aeiouyáéíóúůýěü]$/u;

function hasSyllable(text: string) {
  return hasVowel(text) || /[lr]/iu.test(text);
}

function mobileStem(word: string) {
  const lower = word.toLowerCase();
  if (/ěk$/u.test(lower) && hasSyllable(word.slice(0, -2))) return `${softenLast(word.slice(0, -2))}k`;
  if (/ek$/u.test(lower) && hasSyllable(word.slice(0, -2))) return `${word.slice(0, -2)}k`;
  if (/ec$/u.test(lower) && hasSyllable(word.slice(0, -2))) return `${word.slice(0, -2)}c`;
  if (MOBILE_EL_WORDS.has(lower)) return `${word.slice(0, -2)}l`;
  return word;
}

function hardVocative(word: string, stem: string) {
  const lower = word.toLowerCase();
  if (stem !== word && /k$/u.test(stem.toLowerCase())) return `${stem}u`;
  if (/[kgh]$/u.test(lower)) return `${word}u`;
  if (stem === word && /el$/u.test(lower)) return `${word}i`;
  if (/[^aeiouyáéíóúůýě]r$/u.test(lower)) return `${word.slice(0, -1)}ře`;
  return `${stem}e`;
}

function softVocative(word: string, stem: string) {
  if (stem !== word && /c$/u.test(stem.toLowerCase())) return `${stem.slice(0, -1)}če`;
  return `${stem}i`;
}

function consonantForms(word: string, last: boolean): CaseForms {
  const stem = mobileStem(word);
  const soft = SOFT_ENDING.test(stem.toLowerCase()) || SOFT_MASCULINE_WORDS.has(word.toLowerCase());
  const inner = soft ? `${stem}i` : `${stem}u`;
  const dative = last ? `${stem}ovi` : inner;
  return forms(word, {
      accusative: soft ? `${stem}e` : `${stem}a`,
      dative,
      genitive: soft ? `${stem}e` : `${stem}a`,
      instrumental: `${stem}em`,
      locative: dative,
      vocative: soft ? softVocative(word, stem) : hardVocative(word, stem),
  });
}

function aForms(word: string): CaseForms {
  const stem = word.slice(0, -1);
  const soft = /[šžčřcjťďň]$/u.test(stem.toLowerCase());
  return forms(word, {
      accusative: `${stem}u`,
      dative: `${stem}ovi`,
      genitive: soft ? `${hardenLast(stem)}i` : `${stem}y`,
      instrumental: `${stem}ou`,
      locative: `${stem}ovi`,
      vocative: `${stem}o`,
  });
}

function eForms(word: string, last: boolean): CaseForms {
  const stem = word.slice(0, -1);
  const dative = last ? `${stem}ovi` : `${stem}i`;
  return forms(word, {
      accusative: word,
      dative,
      genitive: word,
      instrumental: `${stem}em`,
      locative: dative,
      vocative: word,
  });
}

function oForms(word: string, last: boolean): CaseForms {
  const stem = word.slice(0, -1);
  const dative = last ? `${stem}ovi` : `${stem}u`;
  return forms(word, {
      accusative: `${stem}a`,
      dative,
      genitive: `${stem}a`,
      instrumental: `${stem}em`,
      locative: dative,
      vocative: word,
  });
}

function hardAdjectiveForms(word: string): CaseForms {
  const stem = word.slice(0, -1);
  return forms(word, {
      accusative: `${stem}ého`,
      dative: `${stem}ému`,
      genitive: `${stem}ého`,
      instrumental: `${stem}ým`,
      locative: `${stem}ém`,
      vocative: word,
  });
}

function softAdjectiveForms(word: string): CaseForms {
  return forms(word, {
      accusative: `${word}ho`,
      dative: `${word}mu`,
      genitive: `${word}ho`,
      instrumental: `${word}m`,
      locative: `${word}m`,
      vocative: word,
  });
}

function masculineForms(word: string, last: boolean): CaseForms | null {
  const lower = word.toLowerCase();
  if (/ý$/u.test(lower)) return hardAdjectiveForms(word);
  if (/í$/u.test(lower)) return softAdjectiveForms(word);
  if (/a$/u.test(lower)) return aForms(word);
  if (/e$/u.test(lower)) return eForms(word, last);
  if (/o$/u.test(lower)) return oForms(word, last);
  if (VOWEL_ENDING.test(lower)) return null;
  return consonantForms(word, last);
}

export { masculineForms, mobileStem };
