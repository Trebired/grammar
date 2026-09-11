import type { CaseForms } from "#fa8gbb35wvs1";
import { forms, hardenLast } from "#z7v1h0dohnb0";

const SOFT_STEM = /[šžčřcjťďň]$/u;

function hardDative(stem: string) {
  const lower = stem.toLowerCase();
  if (/ch$/u.test(lower)) return `${stem.slice(0, -2)}še`;
  if (/k$/u.test(lower)) return `${stem.slice(0, -1)}ce`;
  if (/[gh]$/u.test(lower)) return `${stem.slice(0, -1)}ze`;
  if (/r$/u.test(lower)) return `${stem.slice(0, -1)}ře`;
  if (/[dtnbpmvf]$/u.test(lower)) return `${stem}ě`;
  return `${stem}e`;
}

function softDative(stem: string) {
  const hardened = hardenLast(stem);
  return hardened !== stem ? `${hardened}ě` : `${stem}e`;
}

function aForms(word: string): CaseForms {
  const stem = word.slice(0, -1);
  const soft = SOFT_STEM.test(stem.toLowerCase());
  const dative = soft ? softDative(stem) : hardDative(stem);
  return forms(word, {
      accusative: `${stem}u`,
      dative,
      genitive: soft ? `${hardenLast(stem)}i` : `${stem}y`,
      instrumental: `${stem}ou`,
      locative: dative,
      vocative: `${stem}o`,
  });
}

function iaForms(word: string): CaseForms {
  const stem = word.slice(0, -1);
  return forms(word, {
      accusative: `${stem}i`,
      dative: `${stem}i`,
      genitive: `${stem}e`,
      instrumental: `${stem}í`,
      locative: `${stem}i`,
      vocative: `${stem}o`,
  });
}

function eForms(word: string): CaseForms {
  const stem = word.slice(0, -1);
  return forms(word, {
      accusative: `${stem}i`,
      dative: `${stem}i`,
      genitive: word,
      instrumental: `${stem}í`,
      locative: `${stem}i`,
      vocative: word,
  });
}

function adjectiveForms(word: string): CaseForms {
  const stem = word.slice(0, -1);
  return forms(word, {
      accusative: `${stem}ou`,
      dative: `${stem}é`,
      genitive: `${stem}é`,
      instrumental: `${stem}ou`,
      locative: `${stem}é`,
      vocative: word,
  });
}

function feminineForms(word: string): CaseForms | null {
  const lower = word.toLowerCase();
  if (/á$/u.test(lower)) return adjectiveForms(word);
  if (/ia$/u.test(lower)) return iaForms(word);
  if (/e$/u.test(lower)) return eForms(word);
  if (/a$/u.test(lower)) return aForms(word);
  return null;
}

export { feminineForms };
