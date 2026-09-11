import type { CaseForms, Gender } from "#fa8gbb35wvs1";
import { feminineForms } from "./feminine.js";
import { masculineForms } from "./masculine.js";

type NameRole = "given" | "surname";

function czechWordForms(word: string, gender: Gender, role: NameRole, last: boolean): CaseForms | null {
  const lower = word.toLowerCase();
  const adjectivalFeminine = /á$/u.test(lower);
  if (gender === "f" || (gender === "unknown" && adjectivalFeminine)) {
    if (role === "surname" && !adjectivalFeminine) return null;
    return feminineForms(word);
  }
  if (gender === "unknown" && role === "given" && /[ae]$/u.test(lower)) return feminineForms(word);
  return masculineForms(word, last);
}

export { czechWordForms };
export type { NameRole };
