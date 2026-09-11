import type { Gender } from "#fa8gbb35wvs1";
import { toLowerString } from "@trebired/utils";
import { AMBIGUOUS_NAMES, FEMININE_NAMES, MASCULINE_NAMES } from "./cs/given.js";
import { registeredGender } from "./registry.js";

function givenGender(word: string): Gender {
  const lower = toLowerString(word);
  const registered = lower ? registeredGender(lower) : null;
  if (registered) return registered;
  if (!lower || AMBIGUOUS_NAMES.has(lower)) return "unknown";
  if (MASCULINE_NAMES.has(lower)) return "m";
  if (FEMININE_NAMES.has(lower)) return "f";
  if (/[aáeě]$/u.test(lower)) return "f";
  if (/[íýo]$/u.test(lower)) return "m";
  if (/[iyuüéó]$/u.test(lower)) return "unknown";
  return "m";
}

function surnameGender(word: string): Gender {
  const lower = toLowerString(word);
  if (!lower) return "unknown";
  if (/á$/u.test(lower)) return "f";
  if (/í$/u.test(lower)) return "unknown";
  return "m";
}

function genderFromParts(given: string, surname: string): Gender {
  const byGiven = givenGender(given);
  const bySurname = surnameGender(surname);
  if (bySurname === "f") return MASCULINE_NAMES.has(String(given).toLowerCase()) ? "m" : "f";
  if (byGiven !== "unknown") return byGiven;
  return bySurname;
}

export { genderFromParts, givenGender, surnameGender };
