const TRIGGERS: Record<string, string> = {
  k: "kg",
  s: "szšž",
  v: "vfw",
  z: "szšž",
};
const PRONOUNS = new Set(["mne", "mně", "mnou", "mě"]);

function vocalizePreposition(preposition: string, nextWord: string): string {
  const prep = String(preposition ?? "").trim();
  const lower = prep.toLowerCase();
  const triggers = TRIGGERS[lower];
  const next = String(nextWord ?? "").trim().toLowerCase();
  if (!triggers || !next) return prep;
  const vocalize = triggers.includes(next[0]) || PRONOUNS.has(next);
  if (!vocalize) return prep;
  return prep === prep.toUpperCase() && prep !== lower ? `${prep}E` : `${prep}e`;
}

export { vocalizePreposition };
