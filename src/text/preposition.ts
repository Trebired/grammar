import { toLowerString, toTrimmedString } from "@trebired/utils";

const TRIGGERS: Record<string, string> = {
  k: "kg",
  s: "szšž",
  v: "vfw",
  z: "szšž",
};
const PRONOUNS = new Set(["mne", "mně", "mnou", "mě"]);

function vocalizePreposition(preposition: string, nextWord: string): string {
  const prep = toTrimmedString(preposition);
  const lower = prep.toLowerCase();
  const triggers = TRIGGERS[lower];
  const next = toLowerString(nextWord);
  if (!triggers || !next) return prep;
  const vocalize = triggers.includes(next[0]) || PRONOUNS.has(next);
  if (!vocalize) return prep;
  return `${prep}e`;
}

export { vocalizePreposition };
